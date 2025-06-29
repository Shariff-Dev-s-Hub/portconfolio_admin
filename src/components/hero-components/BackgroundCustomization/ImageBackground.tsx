import HeroImgUploader from "@/components/ui/hero-image-uploader";
import { FormUtils } from "@/lib/interfaces";
import React from "react";

const ImageBackground: React.FC<{ formUtils: FormUtils }> = ({ formUtils }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40svh] md:min-h-[45svh]">
      <HeroImgUploader formUtils={formUtils} />
    </div>
  );
};

export default ImageBackground;
