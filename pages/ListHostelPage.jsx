import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../src/config";

const ROOM_TYPES = ["Self-contained", "Single room", "Shared"];
const FACILITIES = ["Water", "Electricity", "Security", "Wi-Fi", "Parking"];

// 08012345678 or +234 801 234 5678 -> 2348012345678
const normalizePhone = (input) => {
  const digits = input.replace(/\D/g, "");
  if (digits.startsWith("234")) return digits;
  if (digits.startsWith("0")) return "234" + digits.slice(1);
  return "234" + digits;
};

const inputClass =
  "w-full font-poppins text-sm rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[rgb(69,60,141)]";

const Field = ({ label, children }) => (
  <label className="block">
    <span className="mb-1 block text-sm font-semibold text-gray-700">
      {label}
    </span>
    {children}
  </label>
);

const ListHostelPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    roomType: ROOM_TYPES[0],
    facilities: [],
    distance: "",
    description: "",
    agentName: "",
    agentPhone: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState("");

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const toggleFacility = (facility) => {
    setForm((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  // Frees the temporary preview URL when it changes or the page closes
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      setError("Image is too big. Max size is 25MB.");
      return;
    }

    setError("");
    setImage(file);
    setPreview(URL.createObjectURL(file)); // temporary link to show the file in the browser
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const phone = normalizePhone(form.agentPhone);
    if (phone.length !== 13) {
      setError("Enter a valid Nigerian phone number, e.g. 08012345678");
      return;
    }
    if (!image) {
      setError("Please choose a photo of the place.");
      return;
    }

    // FormData is how you send text fields and a file together
    const data = new FormData();
    data.append("name", form.name.trim());
    data.append("location", form.location.trim());
    data.append("price", form.price);
    data.append("roomType", form.roomType);
    data.append("distance", form.distance.trim());
    data.append("description", form.description.trim());
    data.append("agentName", form.agentName.trim());
    data.append("agentPhone", phone);
    form.facilities.forEach((f) => data.append("facilities", f));
    data.append("image", image); // must match upload.single("image") on the server

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/hostels`, {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Something went wrong");
      navigate("/hostels");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 font-jakarta">List a hostel</h1>
      <p className="mt-1 text-gray-500 font-poppins text-sm">
        Found a vacant place? Add it so students can find it.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5 rounded-2xl bg-white p-6 shadow-md"
      >
        <Field label="Hostel / house name">
          <input
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Green Valley Lodge"
            className={inputClass}
          />
        </Field>

        <Field label="Location">
          <input
            required
            value={form.location}
            onChange={update("location")}
            placeholder="Owerre, Nsukka"
            className={inputClass}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Rent per year (₦)">
            <input
              required
              type="number"
              min="0"
              value={form.price}
              onChange={update("price")}
              placeholder="350000"
              className={inputClass}
            />
          </Field>

          <Field label="Room type">
            <select
              value={form.roomType}
              onChange={update("roomType")}
              className={inputClass}
            >
              {ROOM_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div>
          <span className="mb-2 block text-sm font-semibold text-gray-700">
            Facilities
          </span>
          <div className="flex flex-wrap gap-4">
            {FACILITIES.map((facility) => (
              <label
                key={facility}
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={form.facilities.includes(facility)}
                  onChange={() => toggleFacility(facility)}
                  className="accent-[rgb(69,60,141)]"
                />
                {facility}
              </label>
            ))}
          </div>
        </div>

        <Field label="Distance from campus (optional)">
          <input
            value={form.distance}
            onChange={update("distance")}
            placeholder="10 mins walk to campus"
            className={inputClass}
          />
        </Field>

        <Field label="Description">
          <textarea
            required
            rows="4"
            value={form.description}
            onChange={update("description")}
            placeholder="Tell students about the place..."
            className={inputClass}
          />
        </Field>

        <div>
          <span className="mb-1 block text-sm font-semibold text-gray-700">
            Photo of the place
          </span>

          {preview ? (
            <div className="relative overflow-hidden rounded-xl border border-gray-200">
              <img
                src={preview}
                alt="Selected hostel preview"
                className="h-56 w-full object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-red-600 shadow hover:bg-white"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-500 transition hover:border-[rgb(69,60,141)] hover:text-[rgb(69,60,141)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
                className="mb-2"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z"
                    stroke="#453c8d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                  <path
                    d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z"
                    stroke="#453c8d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </g>
              </svg>
              <span className="mt-1 text-sm font-semibold font-poppins">
                Click to upload a photo
              </span>
              <span className="text-xs font-jakarta">JPG or PNG, up to 25MB</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="grid gap-5 border-t border-gray-100 pt-5 sm:grid-cols-2">
          <Field label="Your name">
            <input
              required
              value={form.agentName}
              onChange={update("agentName")}
              placeholder="Mr. Chidi"
              className={inputClass}
            />
          </Field>

          <Field label="WhatsApp / phone number">
            <input
              required
              type="tel"
              value={form.agentPhone}
              onChange={update("agentPhone")}
              placeholder="08012345678"
              className={inputClass}
            />
          </Field>
        </div>

        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="font-poppins text-sm w-full rounded-xl bg-[rgb(69,60,141)] px-4 py-3 font-semibold text-white transition hover:bg-[rgb(55,48,115)] disabled:opacity-60"
        >
          {submitting ? "Publishing..." : "Publish listing"}
        </button>
      </form>
    </div>
  );
};

export default ListHostelPage;
