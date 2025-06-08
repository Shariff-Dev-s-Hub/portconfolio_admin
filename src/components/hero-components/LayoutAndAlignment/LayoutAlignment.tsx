"use client";
import React from "react";
import Subheader from "../../resusables/Subheader";
import MechSelector from "../../ui/mech-selector";
import { AlignCenter, Image, Text } from "lucide-react";
import LayoutPreview from "./LayoutPreview";
import SubSectionsWrapper from "@/layouts/sub-section-wrapper";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";

interface FormValues {
  layout: string; // Define the structure of your form values
}

interface FormUtils {
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
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

  return (
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
  );
};

export default LayoutAlignment;
