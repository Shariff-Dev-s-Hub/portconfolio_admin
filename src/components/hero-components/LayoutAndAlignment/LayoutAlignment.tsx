"use client";
import React from "react";
import { useState } from "react";
import Subheader from "../../resusables/Subheader";
import MechSelector from "../../ui/mech-selector";
import { AlignCenter, Image, Text } from "lucide-react";
import LayoutPreview from "./LayoutPreview";
import InteractiveSaveBtn from "@/components/ui/interactive-savebtn";
import SubSectionsWrapper from "@/layouts/sub-section-wrapper";

const LayoutAlignment = () => {
  const [selectedValue, setSelectedValue] = useState("imageRight");

  const options = [
    {
      id: "imageRight",
      label: (
        <div className="flex items-center gap-2">
          <Text />
          <Image />
        </div>
      ),
    },
    {
      id: "imageLeft",
      label: (
        <div className="flex flex-row-reverse items-center gap-2">
          <Text />
          <Image />
        </div>
      ),
    },
    { id: "textWithBgColor", label: <AlignCenter /> },
    { id: "textWithBgImage", label: <Image /> },
  ];

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleSave = () => {
    // Logic to save the selected layout and alignment
    console.log("Selected Layout:", selectedValue);
    // You can add more logic here to handle the save action
    return true; // Ensure the function returns a boolean
  };

  return (
    <div>
      {/* floating button */}
      <div className="sticky top-20 left-4 flex justify-end z-50">
        <InteractiveSaveBtn onClick={handleSave} />
      </div>

      <SubSectionsWrapper>
        {/* Layout and alignment sub-section */}
        <section>
          <Subheader heading="Layout & Alignment" />
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Layout Preview */}
            <LayoutPreview />
            <MechSelector
              options={options}
              selectedValue={selectedValue}
              onChange={handleChange}
            />
          </div>
        </section>
      </SubSectionsWrapper>
    </div>
  );
};

export default LayoutAlignment;
