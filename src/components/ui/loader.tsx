import { LoaderPinwheel } from "lucide-react";

export const LoaderView = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-100">
      <LoaderPinwheel size={50} className="animate-spin" />
    </div>
  );
};
