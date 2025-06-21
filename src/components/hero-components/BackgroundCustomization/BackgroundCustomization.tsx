import Subheader from "@/components/resusables/Subheader";
import RadioTabs from "@/components/ui/radio-tabs";
import { FormUtils } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { sectionsClass } from "@/styles-config/styles-base";
import React from "react";
import { PlainBackgroundColor } from "./PlainBackgroundColor";

type BackgroundTab = "plain" | "3d" | "image";

export const BackgroundCustomization: React.FC<{ formUtils: FormUtils }> = ({
  formUtils,
}) => {
  const [activeTab, setActiveTab] = React.useState<BackgroundTab>("plain");
  const sections: Record<BackgroundTab, React.ReactElement> = {
    plain: <PlainBackgroundColor />,
    "3d": <h1>3d</h1>,
    image: <h1>image</h1>,
  };
  return (
    <section className={cn(sectionsClass)}>
      <Subheader heading="Background" />
      {/* Develop your code her */}
      <div className="bg-[#F3F4F6] py-5 md:py-4 p-2 md:p-4">
        <div className="flex flex-row justify-center md:justify-end ">
          <RadioTabs<BackgroundTab >
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={["plain", "3d", "image"]}
          />
        </div>
        {sections[activeTab]}
      </div>
    </section>
  );
};
