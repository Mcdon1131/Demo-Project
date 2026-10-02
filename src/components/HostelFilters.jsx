const ROOM_TYPES = ["All", "Self-contained", "Single room", "Shared"];
const FACILITIES = ["Water", "Electricity", "Security", "Wi-Fi", "Parking"];

const inputClass =
  "rounded-xl border border-gray-200 px-4 py-2 font-poppins text-sm outline-none focus:border-[rgb(69,60,141)]";

const HostelFilters = ({
  search,
  setSearch,
  roomType,
  setRoomType,
  maxPrice,
  setMaxPrice,
  selectedFacilities,
  toggleFacility,
  clearFilters,
}) => {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-md">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or location..."
          className={inputClass}
        />

        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className={inputClass}
        >
          {ROOM_TYPES.map((type) => (
            <option key={type} value={type}>
              {type === "All" ? "All room types" : type}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max price per year (₦)"
          className={inputClass}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        {FACILITIES.map((facility) => (
          <label
            key={facility}
            className="flex cursor-pointer items-center gap-2 font-poppins text-sm text-gray-700"
          >
            <input
              type="checkbox"
              checked={selectedFacilities.includes(facility)}
              onChange={() => toggleFacility(facility)}
              className="accent-[rgb(69,60,141)] "
            />
            {facility}
          </label>
        ))}

        <button
          onClick={clearFilters}
          className="ml-auto font-semibold text-[rgb(69,60,141)] hover:underline font-poppins text-xs"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
};

export default HostelFilters;
