import HostelCard from "./HostelCard";

const HostelListings = ({ hostels }) => {
  if (hostels.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500 font-poppins">
        <p className="text-lg font-semibold">No hostels match your search</p>
        <p className="text-sm">Try changing or clearing your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {hostels.map((hostel) => (
        <HostelCard key={hostel._id} hostel={hostel} />
      ))}
    </div>
  );
};

export default HostelListings;
