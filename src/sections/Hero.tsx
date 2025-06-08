"use client";
import LayoutAlignment from "@/components/hero-components/LayoutAndAlignment/LayoutAlignment";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { heroSchema } from "@/lib/zod-schemas";
import { HeroFormValues } from "@/lib/interfaces"; // Import HeroFormValues
import {
  getHeroSettings,
  saveHeroSettings,
} from "@/controllers/hero.controllers";
import toast from "react-hot-toast";
import InteractiveSaveBtn from "@/components/ui/interactive-savebtn";
import { HeroLayoutAlignmentSkeletons } from "@/components/skeleton-templates/hero-skeletons";
import { useLoaderStore } from "@/store/loader-store";
import ProfileDetails from "@/components/hero-components/Profile Details/profileDetails";
import SubSectionsWrapper from "@/layouts/sub-section-wrapper";

const Hero = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema), // Use zod schema for validation
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
            onSubmit();
            return true;
          }}
        />
      </div>
      {isSettingsFetching ? (
        <HeroLayoutAlignmentSkeletons />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <SubSectionsWrapper>
            <LayoutAlignment
              formUtils={{
                register,
                watch,
                handleSubmit,
                errors,
                setValue,
              }}
            />

            <ProfileDetails
              formUtils={{
                register,
                watch,
                handleSubmit,
                errors,
                setValue,
              }}
            />
          </SubSectionsWrapper>
        </form>
      )}
    </div>
  );
};

export default Hero;
