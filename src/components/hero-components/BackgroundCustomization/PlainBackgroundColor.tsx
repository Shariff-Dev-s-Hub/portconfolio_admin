import { SketchPicker } from "react-color";
import { FormUtils } from "@/lib/interfaces";

export const PlainBackgroundColor: React.FC<{ formUtils: FormUtils }> = ({
  formUtils,
}) => {
  const { register, setValue, watch } = formUtils;
  const { r, g, b, a } = watch("backgroundColor")?.rgb || {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  };

  return (
    <div className="flex flex-col md:flex-row justify-around pt-8 pb-6 gap-3 items-center md:items-stretch">
      <SketchPicker
        {...register("backgroundColor")}
        onChange={(color) => {
          if (setValue) {
            setValue("backgroundColor", {
              hex: color.hex,
              rgb: {
                r: Math.round(color.rgb.r),
                g: Math.round(color.rgb.g),
                b: Math.round(color.rgb.b),
                a: typeof color.rgb.a === "number" ? color.rgb.a : 1,
              },
            });
          }
        }}
        color={
          watch("backgroundColor")?.rgb &&
          typeof watch("backgroundColor")?.rgb?.r === "number" &&
          typeof watch("backgroundColor")?.rgb?.g === "number" &&
          typeof watch("backgroundColor")?.rgb?.b === "number"
            ? {
                r: watch("backgroundColor")?.rgb?.r as number,
                g: watch("backgroundColor")?.rgb?.g as number,
                b: watch("backgroundColor")?.rgb?.b as number,
                a:
                  typeof watch("backgroundColor")?.rgb?.a === "number"
                    ? watch("backgroundColor")?.rgb?.a
                    : 1,
              }
            : watch("backgroundColor")?.hex || "#ffffff"
        }
      />
      <div
        style={{
          backgroundColor: `rgba(${r},${g},${b},${a})`,
        }}
        className="flex-grow h-72 md:h-auto w-full xl:w-1/2 border-2"
      />
    </div>
  );
};
