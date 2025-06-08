import React from "react";

const Subheader = ({ heading = "" }) => {
  return (
    <div>
      <h2 className="text-[#f2b523] font-semibold text-2xl mb-3 ml-3 md:ml-0 lg:mb-5">
        {heading}
      </h2>
    </div>
  );
};

export default Subheader;
