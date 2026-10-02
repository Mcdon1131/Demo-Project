import { useEffect, useState } from "react";
import HostelListings from "../src/components/HostelListings";
import HostelFilters from "../src/components/HostelFilters";
import { API_URL } from "../src/config";
import Loading from "../src/components/Loading";

const HomePage = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [roomType, setRoomType] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  // Runs once when the page opens: ask the API for all hostels
  useEffect(() => {
    const loadHostels = async () => {
      try {
        const res = await fetch(`${API_URL}/api/hostels`);
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        setHostels(json.data);
      } catch {
        setError("Could not load hostels. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadHostels();
  }, []);

  const toggleFacility = (facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility],
    );
  };

  const clearFilters = () => {
    setSearch("");
    setRoomType("All");
    setMaxPrice("");
    setSelectedFacilities([]);
  };

  const filteredHostels = hostels.filter((hostel) => {
    const query = search.toLowerCase();
    const matchesSearch =
      hostel.name.toLowerCase().includes(query) ||
      hostel.location.toLowerCase().includes(query);
    const matchesRoomType = roomType === "All" || hostel.roomType === roomType;
    const matchesPrice = maxPrice === "" || hostel.price <= Number(maxPrice);
    const matchesFacilities = selectedFacilities.every((f) =>
      hostel.facilities.includes(f),
    );

    return (
      matchesSearch && matchesRoomType && matchesPrice && matchesFacilities
    );
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-poppins font-bold text-gray-900">
        Find a place you can call home
      </h1>
      <p className="mt-1 text-gray-500 font-poppins text-sm">
        Browse student accommodation near you.
      </p>

      <div className="mt-6">
        <HostelFilters
          search={search}
          setSearch={setSearch}
          roomType={roomType}
          setRoomType={setRoomType}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedFacilities={selectedFacilities}
          toggleFacility={toggleFacility}
          clearFilters={clearFilters}
        />
      </div>

      {loading && (
        <p className="mt-10 relative text-center text-gray-500 font-poppins">
          <Loading />
        </p>
      )}
      {error && (
        <p className="mt-10 text-center font-poppins font-semibold text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <p className="mb-4 mt-6 text-sm text-gray-500 font-poppins">
            {filteredHostels.length} hostel{filteredHostels.length !== 1 && "s"}{" "}
            found
          </p>
          <HostelListings hostels={filteredHostels} />
        </>
      )}
    </div>
  );
};

export default HomePage;
