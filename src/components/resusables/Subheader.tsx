import React from "react";

const Subheader = ({ heading = "" }) => {
  return (
    <div
      className="absolute bg-white rounded-r-full
       -top-7 left-4 flex items-center justify-center p-3"
    >
      {/* top left corner */}
      <h2 className="text-[#f2b523] font-semibold text-sm md:text-xl ">
        {heading}
      </h2>
    </div>
  );
};

export default Subheader;
