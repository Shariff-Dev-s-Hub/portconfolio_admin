// Component: CommonTemplates

import Subheader from "@/components/resusables/Subheader";
import { FormUtils } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { sectionsClass } from "@/styles-config/styles-base";

// Component: ComponentSectionTemplate

export const ComponentSectionTemplate: React.FC<{ formUtils: FormUtils }> = ({
  formUtils,
}) => {
  return (
    <section className={cn(sectionsClass)}>
      <Subheader heading="Section Header" />
      {/* Develop your code her */}
    </section>
  );
};
