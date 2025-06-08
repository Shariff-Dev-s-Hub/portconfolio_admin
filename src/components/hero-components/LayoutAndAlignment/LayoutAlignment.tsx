"use client";
import React from "react";
import Subheader from "../../resusables/Subheader";
import MechSelector from "../../ui/mech-selector";
import { AlignCenter, Image, Text } from "lucide-react";
import LayoutPreview from "./LayoutPreview";
import SubSectionsWrapper from "@/layouts/sub-section-wrapper";

interface FormUtils {
  register: any;
  watch: any;
  handleSubmit: any;
  errors: any;
  setValue: any;
}

const LayoutAlignment = ({ formUtils = {} as FormUtils }) => {
  const { register, setValue } = formUtils;

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

  const handleLayoutChange = (value: string) => {
    //  update on zod
  };

  return (
    <div>
      <SubSectionsWrapper>
        {/* Layout and alignment sub-section */}
        <section>
          <Subheader heading="Layout & Alignment" />
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Layout Preview */}
            <LayoutPreview />
            <MechSelector
              register={register}
              options={options}
              setValue={setValue}
            />
          </div>
        </section>
      </SubSectionsWrapper>
    </div>
  );
};

export default LayoutAlignment;
