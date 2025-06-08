import Subheader from "@/components/resusables/Subheader";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ui/img-uploader";
import { Input } from "@/components/ui/input";
import { FormUtils } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { sectionsClass } from "@/styles-config/styles-base";
import { Label } from "@radix-ui/react-label";
import React from "react";

const ProfileDetails: React.FC<{ formUtils: FormUtils }> = ({ formUtils }) => {
  const { register, setValue, errors } = formUtils;

  const onClear = () => {
    setValue?.("name", "");
    setValue?.("designation", "");
    setValue?.("buttonText", "");
  };

  return (
    <section className={cn(sectionsClass)}>
      <Subheader heading="Profile Details" />
      <div className="flex flex-col xl:flex-row bg-gray-100 ">
        <div className="flex-grow p-4 m-4 grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-7 mt-10 shadow-inner rounded-2xl">
          {/* Name */}
          <div>
            <Label
              htmlFor="name"
              className="text-xs md:text-sm font-semibold text-gray-700"
            >
              Name<span className="text-red-500">*</span>
            </Label>
            <Input
              maxLength={20}
              {...register("name")}
              id="name"
              className="text-xs md:text-sm bg-white py-5"
              placeholder="Enter Your Name"
            />
            {errors?.name && (
              <p className="text-red-500 text-sm">{errors?.name.message}</p>
            )}
          </div>
          {/* Designation */}
          <div>
            <Label
              htmlFor="designation"
              className="text-xs md:text-sm font-semibold text-gray-700"
            >
              Designation<span className="text-red-500">*</span>
            </Label>
            <Input
              maxLength={30}
              {...register("designation")}
              id="designation"
              className="text-xs md:text-sm bg-white py-5"
              placeholder="Enter Your Designation"
            />
            {errors?.designation && (
              <p className="text-red-500 text-sm">
                {errors?.designation.message}
              </p>
            )}
          </div>
          {/* Button Text */}
          <div>
            <Label
              htmlFor="btnText"
              className="text-xs md:text-sm font-semibold text-gray-700"
            >
              Button Text
            </Label>
            <Input
              maxLength={10}
              {...register("buttonText")}
              id="btnText"
              className="text-xs md:text-sm bg-white py-5"
              placeholder="Enter Button Text"
            />
            {errors?.buttonText && (
              <p className="text-red-500 text-sm">
                {errors?.buttonText.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <Button
              onClick={onClear}
              className="lg:w-24 rounded-2xl bg-slate-600 lg:mt-5"
            >
              Clear
            </Button>
          </div>
        </div>
        <div className="p-4 px-20 flex items-center justify-center bg-white">
          <ImageUploader />
        </div>
      </div>
    </section>
  );
};

export default ProfileDetails;
