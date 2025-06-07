"use client";
import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const NavLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const onLogout = () => {
    localStorage.removeItem("jwt");
    router.replace("/");
  };
  return (
    <div className="h-screen w-full bg-gray-200 overflow-y-auto">
      <div className="bg-white fixed w-full py-4 px-4 md:px-10 lg:px-20 flex justify-between items-center">
        <img
          src="/app_brand/logo.jpg"
          alt="Brand Logo"
          className="w-42 h-8 object-cover rounded-br-full rounded-tl-full"
        />
        <Button onClick={onLogout} className="hidden md:block">
          Logout
        </Button>
        <div
          onClick={onLogout}
          className="bg-gray-200 p-2 rounded-full md:hidden cursor-pointer active:bg-gray-700 active:text-white transition-colors"
        >
          <LogOut size={20} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default NavLayout;
