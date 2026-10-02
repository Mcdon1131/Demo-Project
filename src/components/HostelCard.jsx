import { motion } from "motion/react";
import { Link } from "react-router-dom";

const HostelCard = ({ hostel, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: delay || 0 }}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-px transition duration-300 overflow-hidden w-full"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          src={hostel.imgUrl}
          alt={hostel.name}
        />
        <span className="absolute top-3 left-3 bg-white/90 text-[rgb(69,60,141)] text-xs font-semibold font-poppins px-3 py-1 rounded-full">
          {hostel.roomType}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 font-poppins">
          {hostel.name}
        </h3>
        <p className="text-gray-500 text-sm mt-1 font-jakarta flex gap-1.5">
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
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>location</title> <desc>Created with Sketch Beta.</desc>{" "}
                <defs> </defs>{" "}
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
          </span>
          {hostel.location}
        </p>

        <p className="mt-3 text-xl font-bold text-[rgb(69,60,141)] font-jakarta">
          ₦{hostel.price.toLocaleString()}
          <span className="text-xs font-poppins font-normal text-gray-500 "> / year</span>
        </p>

        {/* Facilities */}
        <div className="flex flex-wrap gap-2 mt-3">
          {hostel.facilities.slice(0, 3).map((f) => (
            <span
              key={f}
              className="text-xs font-poppins bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              ✓ {f}
            </span>
          ))}
        </div>

        <Link
          to={`/hostel/${hostel._id}`}
          className="mt-4 block font-poppins text-sm text-center bg-[rgb(69,60,141)] hover:bg-[rgb(55,48,115)] transition py-2.5 rounded-xl font-semibold text-white"
        >
          View Hostel
        </Link>
      </div>
    </motion.div>
  );
};

export default HostelCard;
