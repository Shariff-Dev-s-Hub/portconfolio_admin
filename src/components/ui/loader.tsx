"use client";
import { useLoaderStore } from "@/store/loader-store";
import { LoaderPinwheel } from "lucide-react";

export const LoaderView = () => {
  const { isLoading } = useLoaderStore();
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity bg-white ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <LoaderPinwheel size={50} className="animate-spin" />
    </div>
  );
};
