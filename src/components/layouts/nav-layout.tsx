"use client";
import React from "react";
import { Button } from "../ui/button";
import { LoaderPinwheelIcon, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLoaderStore } from "@/store/loader-store";

const NavLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const { isLoading, setLoading } = useLoaderStore();
  const onLogout = () => {
    setLoading(true);
    localStorage.removeItem("jwt");
    router.replace("/");
  };
  return (
    <div className="h-screen w-full bg-amber-50 overflow-y-auto">
      <div className="bg-white fixed w-full py-4 px-4 md:px-10 lg:px-20 flex justify-between items-center">
        <img
          src="/app_brand/logo.jpg"
          alt="Brand Logo"
          className="w-42 h-8 object-cover rounded-br-full rounded-tl-full"
        />
        <Button
          onClick={onLogout}
          className="hidden md:block bg-amber-500  hover:text-white rounded-bl-full rounded-tr-full w-42 h-8"
        >
          {isLoading ? <LoaderPinwheelIcon /> : "Logout"}
        </Button>
        <div className="bg-amber-500 p-2 text-white rounded-full md:hidden cursor-pointer active:bg-gray-700 active:text-primary transition-colors">
          {isLoading ? (
            <LoaderPinwheelIcon />
          ) : (
            <LogOut onClick={onLogout} size={20} />
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default NavLayout;
