"use client";
import React from "react";
import Subheader from "../../resusables/Subheader";
import MechSelector from "../../ui/mech-selector";
import { AlignCenter, Image, Text } from "lucide-react";
import LayoutPreview from "./LayoutPreview";
import { FormUtils } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { sectionsClass } from "@/styles-config/styles-base";

const LayoutAlignment: React.FC<{ formUtils: FormUtils }> = ({ formUtils }) => {
  const { register, setValue, watch } = formUtils;

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
    {
      id: "textWithCenterImage",
      label: (
        <div className="flex flex-row-reverse items-center gap-2">
          <Text />
          <Image />
          <Text />
        </div>
      ),
    },
  ];

  return (
    <section className={cn(sectionsClass)}>
      {/* Layout and alignment sub-section */}
      <Subheader heading="Layout & Alignment" />
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Layout Preview */}
        <LayoutPreview watch={watch} />
        <MechSelector
          register={register}
          options={options}
          setValue={setValue}
        />
      </div>
    </section>
  );
};

export default LayoutAlignment;
