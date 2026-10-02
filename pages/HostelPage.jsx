import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../src/config";
import { getSavedIds, toggleSavedId } from "../src/utils/saved";

const HostelPage = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  // starts as true if this hostel's id is already in localStorage
  const [saved, setSaved] = useState(() => getSavedIds().includes(id));

  useEffect(() => {
    const loadHostel = async () => {
      try {
        const res = await fetch(`${API_URL}/api/hostels/${id}`);
        if (!res.ok) throw new Error("Not found");
        const json = await res.json();
        setHostel(json.data);
      } catch {
        setHostel(null);
      } finally {
        setLoading(false);
      }
    };
    loadHostel();
  }, [id]);

  const handleSave = () => {
    const updated = toggleSavedId(id);
    setSaved(updated.includes(id));
  };

  if (loading) {
    return <p className="py-20 text-center text-gray-500">Loading...</p>;
  }

  if (!hostel) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <span className="inline-block mb-3 bg-[rgb(69,60,141)]/15 rounded-full p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 19H12.01M8.21704 7.69689C8.75753 6.12753 10.2471 5 12 5C14.2091 5 16 6.79086 16 9C16 10.6565 14.9931 12.0778 13.558 12.6852C12.8172 12.9988 12.4468 13.1556 12.3172 13.2767C12.1629 13.4209 12.1336 13.4651 12.061 13.6634C12 13.8299 12 14.0866 12 14.6L12 16"
              stroke="rgb(69,60,141)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <h1 className="text-3xl font-bold font-poppins text-gray-900">
          Hostel not found
        </h1>
        <p className="mt-2 font-poppins text-sm text-gray-500">
          This listing may have been removed.
        </p>
        <Link
          to="/hostels"
          className="mt-6 font-poppins text-sm inline-block rounded-xl bg-[rgb(69,60,141)] px-5 py-2 font-semibold text-white"
        >
          Back to listings
        </Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hi, I saw ${hostel.name} (${hostel.location}) on HostelHub. Is it still available?`,
  );
  const whatsappLink = `https://wa.me/${hostel.agentPhone}?text=${whatsappMessage}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        to="/hostels"
        className="text-sm font-semibold flex gap-2 text-[rgb(69,60,141)] hover:underline font-poppins"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 1024 1024"
            fill="rgb(69,60,141)"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path
                fill="rgb(69,60,141)"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              />

              <path
                fill="rgb(69,60,141)"
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              />
            </g>
          </svg>
        </span>{" "}
        Back to listings
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-3">
        {/* Left: image + details */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="lg:col-span-2"
        >
          <div className="overflow-hidden rounded-2xl shadow-md">
            <img
              src={hostel.imgUrl}
              alt={hostel.name}
              className="h-72 w-full object-cover sm:h-96"
            />
          </div>

          <div className="mt-6 flex items-start justify-between gap-4">
            <div>
              <span className="rounded-full bg-[rgb(69,60,141)]/10 px-3 py-1 text-xs font-poppins font-semibold text-[rgb(69,60,141)]">
                {hostel.roomType}
              </span>
              <h1 className="mt-3 text-3xl font-bold text-gray-900 font-poppins">
                {hostel.name}
              </h1>
              <p className="mt-1.5 text-gray-500 flex gap-2 font-poppins text-sm">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                    width="15px"
                    height="20px"
                    viewBox="-4 0 32 32"
                    version="1.1"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <title>location</title>{" "}
                      <desc>Created with Sketch Beta.</desc> <defs> </defs>{" "}
                      <g
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                        sketch:type="MSPage"
                      >
                        {" "}
                        <g
                          id="Icon-Set-Filled"
                          sketch:type="MSLayerGroup"
                          transform="translate(-106.000000, -413.000000)"
                          fill="#ff0030"
                        >
                          {" "}
                          <path
                            d="M118,422 C116.343,422 115,423.343 115,425 C115,426.657 116.343,428 118,428 C119.657,428 121,426.657 121,425 C121,423.343 119.657,422 118,422 L118,422 Z M118,430 C115.239,430 113,427.762 113,425 C113,422.238 115.239,420 118,420 C120.761,420 123,422.238 123,425 C123,427.762 120.761,430 118,430 L118,430 Z M118,413 C111.373,413 106,418.373 106,425 C106,430.018 116.005,445.011 118,445 C119.964,445.011 130,429.95 130,425 C130,418.373 124.627,413 118,413 L118,413 Z"
                            id="location"
                            sketch:type="MSShapeGroup"
                          >
                            {" "}
                          </path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </span>{" "}
                {hostel.location}
              </p>
              {hostel.distance && (
                <p className="mt-1 text-sm text-gray-500 font-poppins flex gap-0.5">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13 6C14.1046 6 15 5.10457 15 4C15 2.89543 14.1046 2 13 2C11.8955 2 11 2.89543 11 4C11 5.10457 11.8955 6 13 6ZM11.0528 6.60557C11.3841 6.43992 11.7799 6.47097 12.0813 6.68627L13.0813 7.40056C13.3994 7.6278 13.5559 8.01959 13.482 8.40348L12.4332 13.847L16.8321 20.4453C17.1384 20.9048 17.0143 21.5257 16.5547 21.8321C16.0952 22.1384 15.4743 22.0142 15.168 21.5547L10.5416 14.6152L9.72611 13.3919C9.58336 13.1778 9.52866 12.9169 9.57338 12.6634L10.1699 9.28309L8.38464 10.1757L7.81282 13.0334C7.70445 13.575 7.17759 13.9261 6.63604 13.8178C6.09449 13.7094 5.74333 13.1825 5.85169 12.641L6.51947 9.30379C6.58001 9.00123 6.77684 8.74356 7.05282 8.60557L11.0528 6.60557ZM16.6838 12.9487L13.8093 11.9905L14.1909 10.0096L17.3163 11.0513C17.8402 11.226 18.1234 11.7923 17.9487 12.3162C17.7741 12.8402 17.2078 13.1234 16.6838 12.9487ZM6.12844 20.5097L9.39637 14.7001L9.70958 15.1699L10.641 16.5669L7.87159 21.4903C7.60083 21.9716 6.99111 22.1423 6.50976 21.8716C6.0284 21.6008 5.85768 20.9911 6.12844 20.5097Z"
                          fill="#4e2f74"
                        />{" "}
                      </g>
                    </svg>
                  </span>{" "}
                  {hostel.distance}
                </p>
              )}
            </div>

            <button
              onClick={handleSave}
              className={`shrink-0 rounded-xl border px-4 py-2 font-poppins text-xs font-semibold transition ${
                saved
                  ? "border-[rgb(69,60,141)] bg-[rgb(69,60,141)] text-white"
                  : "border-gray-200 text-gray-700 hover:border-[rgb(69,60,141)]"
              }`}
            >
              {saved ? "♥ Saved" : "♡ Save"}
            </button>
          </div>

          {hostel.description && (
            <section className="mt-8">
              <h2 className="text-lg font-bold text-gray-900 font-poppins">
                About this place
              </h2>
              <p className="mt-2 leading-relaxed text-gray-600 font-poppins text-xs">
                {hostel.description}
              </p>
            </section>
          )}

          <section className="mt-8">
            <h2 className="text-lg font-bold text-gray-900 font-poppins">
              Facilities
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {hostel.facilities.map((facility) => (
                <div
                  key={facility}
                  className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700 font-poppins"
                >
                  <span className="font-bold text-green-600">✓</span>
                  {facility}
                </div>
              ))}
            </div>
          </section>
        </motion.div>

        {/* Right: price + contact */}
        <motion.aside
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
          className="lg:col-span-1"
        >
          <div className="rounded-2xl bg-white p-6 shadow-md lg:sticky lg:top-24">
            <p className="text-sm text-gray-500 font-poppins">Rent</p>
            <p className="text-3xl font-extrabold text-[rgb(69,60,141)]">
              ₦{hostel.price.toLocaleString()}
              <span className="text-xs font-normal text-gray-500 font-poppins "> / year</span>
            </p>

            {hostel.agentPhone && (
              <>
                <div className="mt-6 border-t border-gray-100 pt-6">
                  <p className="text-sm text-gray-500 font-poppins">
                    Listed by
                  </p>
                  <p className="text-lg font-semibold text-gray-900 font-poppins">
                    {hostel.agentName}
                  </p>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 font-poppins text-sm block rounded-xl bg-green-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-green-600"
                >
                  Message agent on WhatsApp
                </a>

                <a
                  href={`tel:+${hostel.agentPhone}`}
                  className="mt-3 font-poppins text-sm block rounded-xl border border-gray-200 px-4 py-3 text-center font-semibold text-gray-700 transition hover:border-[rgb(69,60,141)]"
                >
                  Call agent
                </a>
              </>
            )}

            <p className="mt-4 text-xs text-gray-400 font-jakarta">
              Always inspect the place before paying any money.
            </p>
          </div>
        </motion.aside>
      </div>
    </div>
  );
};

export default HostelPage;
