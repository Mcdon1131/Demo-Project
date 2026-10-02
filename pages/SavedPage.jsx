import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HostelListings from "../src/components/HostelListings";
import { API_URL } from "../src/config";
import { getSavedIds } from "../src/utils/saved";

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
      <h1 className="text-3xl font-bold text-gray-900">Saved hostels</h1>
      <p className="mt-1 text-gray-500">Places you're interested in, all in one spot.</p>

      {loading ? (
        <p className="mt-10 text-center text-gray-500">Loading...</p>
      ) : savedHostels.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-4xl">♡</p>
          <p className="mt-3 text-lg font-semibold text-gray-900">Nothing saved yet</p>
          <p className="text-sm text-gray-500">Tap "Save" on a hostel to keep it here.</p>
          <Link
            to="/hostels"
            className="mt-6 inline-block rounded-xl bg-[rgb(69,60,141)] px-5 py-2 font-semibold text-white"
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