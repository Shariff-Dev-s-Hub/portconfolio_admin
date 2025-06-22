"use client";
import LayoutAlignment from "@/components/hero-components/LayoutAndAlignment/LayoutAlignment";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { heroSchema } from "@/lib/zod-schemas";
import { HeroFormValues } from "@/lib/interfaces"; // Import HeroFormValues
import { FormUtils } from "@/lib/interfaces"; // Import FormUtils type
import {
  getHeroSettings,
  saveHeroSettings,
} from "@/controllers/hero.controllers";
import toast from "react-hot-toast";
import InteractiveSaveBtn from "@/components/ui/interactive-savebtn";
import { HeroLayoutAlignmentSkeletons } from "@/components/skeleton-templates/hero-skeletons";
import { useLoaderStore } from "@/store/loader-store";
import ProfileDetails from "@/components/hero-components/ProfileDetails/ProfileDetails";
import SubSectionsWrapper from "@/layouts/sub-section-wrapper";
import { BackgroundCustomization } from "@/components/hero-components/BackgroundCustomization/BackgroundCustomization";

const Hero = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema), // Use zod schema for validation
    defaultValues: {
      layout: "imageRight",
      backgroundColor: {
        hex: "#ffffff", // Default background color
        rgb: { r: 255, g: 255, b: 255, a: 1 }, // Default RGB values
      },
    },
  });

  const { setLoading } = useLoaderStore();
  const [isSettingsFetching, setIsSettingsFetching] = React.useState(false);

  const hasFetched = React.useRef(false);
  const [initialValues, setInitialValues] =
    React.useState<HeroFormValues | null>(null);

  React.useEffect(() => {
    // Fetch hero settings only once when the component mounts
    if (!hasFetched.current) {
      getHeroSettings(setValue, setIsSettingsFetching).then(() => {
        const data = watch();
        if (data) {
          setInitialValues(data);
        }
      });
      hasFetched.current = true;
    }
  }, [setValue, watch]);

  const currentValues = watch();

  const isSaveDisabled = React.useMemo(() => {
    if (!initialValues) return true;
    return JSON.stringify(initialValues) === JSON.stringify(currentValues);
  }, [initialValues, currentValues]);

  const onSubmit = async () => {
    setLoading(true);
    const payload = watch();

    await toast
      .promise(saveHeroSettings(payload), {
        loading: "Saving hero settings...",
        success: "Hero settings saved successfully!",
        error: "Failed to save hero settings.",
      })
      .then(() => {
        setInitialValues(payload);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error saving hero settings:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="sticky top-20 left-4 flex justify-end mt-5 z-50">
        <InteractiveSaveBtn
          onClick={() => {
            if (isSaveDisabled) {
              toast.error("No changes to save.");
              return false;
            }
            if (Object.keys(errors).length > 0) {
              const errorMessages = Object.values(errors)
                .map((error) => error.message)
                .join(", ");
              toast.error(errorMessages);
              return false;
            }
            handleSubmit(onSubmit)();
            return true;
          }}
        />
      </div>
      {isSettingsFetching ? (
        <HeroLayoutAlignmentSkeletons />
      ) : (
        <SubSectionsWrapper>
          <LayoutAlignment
            formUtils={{
              register,
              watch,
              handleSubmit,
              errors,
              setValue,
            } as FormUtils<HeroFormValues>}
          />

          <ProfileDetails
            formUtils={{
              register,
              watch,
              handleSubmit,
              setValue,
              errors,
            } as FormUtils<HeroFormValues>}
          />

          <BackgroundCustomization
            formUtils={{
              register,
              watch,
              handleSubmit,
              setValue,
              errors,
            } as FormUtils<HeroFormValues>}
          />
        </SubSectionsWrapper>
      )}
    </div>
  );
};

export default Hero;
