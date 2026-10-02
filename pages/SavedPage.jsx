import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HostelListings from "../src/components/HostelListings";
import { API_URL } from "../src/config";
import { getSavedIds } from "../src/utils/saved";
import Loading from "../src/components/Loading";

const SavedPage = () => {
  const [savedHostels, setSavedHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSaved = async () => {
      try {
        const res = await fetch(`${API_URL}/api/hostels`);
        const json = await res.json();
        const savedIds = getSavedIds();
        setSavedHostels(json.data.filter((h) => savedIds.includes(h._id)));
      } catch {
        setSavedHostels([]);
      } finally {
        setLoading(false);
      }
    };
    loadSaved();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 font-poppins">
        Saved hostels
      </h1>
      <p className="mt-1 text-gray-500 font-poppins text-sm">
        Places you're interested in, all in one spot.
      </p>

      {loading ? (
        <Loading />
      ) : savedHostels.length === 0 ? (
        <div className="mt-16 text-center">
          <span className="inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70px"
              height="70px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19 5L18.0864 5.91358M5 19L8.21252 15.7875M18.0864 5.91358C16.3142 4.5616 13.7913 4.69173 12.1544 6.42726L12 6.59097L11.8456 6.42726C9.86801 4.33053 6.59738 4.57698 4.91934 6.94915C3.42999 9.05459 3.78668 12.0335 5.725 13.6776L8.21252 15.7875M18.0864 5.91358L8.21252 15.7875M9.64206 17L12 19L18.275 13.6776C19.9081 12.2924 20.4185 9.95956 19.6479 8"
                stroke="#464455"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="mt-3 text-lg font-semibold text-gray-900 font-jakarta">
            Nothing saved yet
          </p>
          <p className="text-sm text-gray-500 font-jakarta">
            Tap "Save" on a hostel to keep it here.
          </p>
          <Link
            to="/hostels"
            className="mt-6 inline-block rounded-xl bg-[rgb(69,60,141)] px-5 py-2 font-semibold text-white font-poppins text-sm"
          >
            Browse hostels
          </Link>
        </div>
      ) : (
        <div className="mt-6">
          <HostelListings hostels={savedHostels} />
        </div>
      )}
    </div>
  );
};

export default SavedPage;
