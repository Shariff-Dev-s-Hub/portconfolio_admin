import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { layoutStyles } from "@/styles-config/styles-base";
import React from "react";

interface LayoutPreviewProps {
  watch: (field: string) => string;
}

const LayoutPreview: React.FC<LayoutPreviewProps> = (props) => {
  const { watch } = props;
  return (
    <div
      className={cn(
        "bg-conic-150 bg-amber-200 shadow-inner  w-full  min-h-52 md:min-h-72 px-10 md:px-20 lg:px-5 xl:px-20 lg:py-0 xl:py-10",
        layoutStyles[watch("layout") as keyof typeof layoutStyles]
      )}
    >
      <div
        className={cn(
          watch("layout") === "textWithCenterImage" ? "block" : "hidden"
        )}
      >
        <h1 className="font-bold text-xl md:text-2xl lg:text-xl ">
          Your Name Here
        </h1>
        <p className="font-semibold text-sm md:text-xl lg:text-sm text-gray-500">
          Designation
        </p>
      </div>
      <div
        className={cn(
          "flex justify-center items-center shadow-xl rounded-full w-1/3 bg-gray-200 mb-4",
          watch("layout") === "textWithBgColor" ? "hidden" : "block"
        )}
      >
        <img src="/assets/dummy-profile.png" />
      </div>
      <div
        className={cn(
          watch("layout") === "textWithBgColor" ? "text-center" : "text-left",
          watch("layout") === "textWithCenterImage" ? "hidden" : "block"
        )}
      >
        <h1 className="font-bold text-xl md:text-2xl lg:text-xl">
          Your Name Here
        </h1>
        <p className="font-semibold text-sm md:text-xl lg:text-sm text-gray-500">
          Designation
        </p>
        <Button className="mt-5 rounded-4xl">Button</Button>
      </div>
      <Button
        className={cn(
          watch("layout") === "textWithCenterImage" ? "block" : "hidden",
          "rounded-4xl"
        )}
      >
        Button
      </Button>
    </div>
  );
};

export default LayoutPreview;
