"use client";
import React from "react";
import { LoaderPinwheelIcon, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLoaderStore } from "@/store/loader-store";
import { onLogout } from "@/lib/authentication-utils";

const NavLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const { isLoading } = useLoaderStore();

  return (
    <div className="h-screen w-full bg-amber-50 overflow-y-auto">
      <div className="bg-white z-50 fixed w-full py-4 px-4 md:px-10 lg:px-20 flex justify-between items-center shadow-md">
        <img
          src="/app_brand/logo.jpg"
          alt="Brand Logo"
          className="w-42 h-8 lg:ml-auto object-cover rounded-br-full rounded-tl-full"
        />
        <div className="bg-[#f2b523] p-2 text-white rounded-full lg:hidden cursor-pointer active:bg-gray-700 active:text-primary transition-colors">
          {isLoading ? (
            <LoaderPinwheelIcon />
          ) : (
            <LogOut onClick={() => onLogout(router)} size={20} />
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default NavLayout;
