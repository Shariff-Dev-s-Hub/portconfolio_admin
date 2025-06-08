"use client";
import LayoutAlignment from "@/components/hero-components/LayoutAndAlignment/LayoutAlignment";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { heroSchema } from "@/lib/zod-schemas";
import {
  getHeroSettings,
  saveHeroSettings,
} from "@/controllers/hero.controllers";
import toast from "react-hot-toast";
import InteractiveSaveBtn from "@/components/ui/interactive-savebtn";

const Hero = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(heroSchema),
  });

  const hasFetched = React.useRef(false);
  React.useEffect(() => {
    if (!hasFetched.current) {
      getHeroSettings(setValue);
      hasFetched.current = true;
    }
  }, [setValue]);

  const onSubmit = async () => {
    try {
      const payload = watch();
      await saveHeroSettings(payload);
      toast.success("Hero settings saved successfully!");
    } catch (error) {
      console.error("Error saving hero settings:", error);
      toast.error("Failed to save hero settings.");
    }
  };

  return (
    <div>
      <div className="sticky top-20 left-4 flex justify-end mt-2 z-50">
        <InteractiveSaveBtn
          onClick={() => {
            onSubmit();
            return true;
          }}
        />
      </div>
      <LayoutAlignment
        formUtils={{
          register,
          watch,
          handleSubmit,
          errors,
          setValue,
        }}
      />
    </div>
  );
};

export default Hero;
