"use client";
import { onLogout } from "@/lib/authentication-utils";
import { useSidebarStore } from "@/store/sidebar-store";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpenText,
  Boxes,
  Contact,
  Cpu,
  LayoutTemplate,
  LogOut,
  Medal,
  Presentation,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

const tabs = [
  {
    displayText: "Hero",
    value: "hero",
    logo: <LayoutTemplate />,
  },
  {
    displayText: "Education",
    value: "education",
    logo: <BookOpenText />,
  },
  {
    displayText: "Experience",
    value: "experience",
    logo: <Boxes />,
  },
  {
    displayText: "Skills",
    value: "skills",
    logo: <Cpu />,
  },
  {
    displayText: "Projects",
    value: "projects",
    logo: <Presentation />,
  },
  {
    displayText: "Achievements",
    value: "achievements",
    logo: <Medal />,
  },
  {
    displayText: "Contact",
    value: "contact",
    logo: <Contact />,
  },
];

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { activeTab, setActiveTab, isDrawerOpen, setIsDrawerOpen } =
    useSidebarStore();
  const router = useRouter();
  const lenisRef = useRef<Lenis | null>(null); // Store Lenis instance

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      wrapper: document.querySelector("#smooth-wrapper") as HTMLElement,
      content: document.querySelector("#smooth-content") as HTMLElement,
    });

    lenisRef.current = lenis; // Store Lenis instance in ref

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integrate Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#smooth-wrapper", {
      scrollTop(value) {
        return value !== undefined
          ? lenis.scrollTo(value)
          : lenis.animatedScroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: (document.querySelector("#smooth-wrapper") as HTMLElement)?.style
        .transform
        ? "transform"
        : "fixed",
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.removeEventListener("refresh", ScrollTrigger.update);
    };
  }, []);

  // Reset scroll position when activeTab changes
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 0.5, easing: (t) => t }); // Smooth scroll to top
    }
  }, [activeTab]);

  return (
    <div>
      <button
        title="Side navigation"
        type="button"
        className="fixed z-50 self-center order-10 visible block w-10 h-10 bg-white rounded opacity-100 lg:hidden left-6 top-20"
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isDrawerOpen}
        aria-controls="nav-menu-1"
        onClick={setIsDrawerOpen}
      >
        <div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <span
            aria-hidden="true"
            className={`absolute  block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-primary transition-all duration-300 ${
              isDrawerOpen ? "rotate-45 translate-y-0" : ""
            }`}
          ></span>
          <span
            aria-hidden="true"
            className={`absolute  block h-0.5 w-6 transform rounded-full bg-primary transition duration-300 ${
              isDrawerOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            aria-hidden="true"
            className={`absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-primary transition-all duration-300 ${
              isDrawerOpen ? "-rotate-45 translate-y-0" : ""
            }`}
          ></span>
        </div>
      </button>

      {/* Drawer */}
      <aside
        id="nav-menu-1"
        style={{
          boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)", // Right-side shadow
        }}
        aria-label="Side navigation"
        className={`fixed top-0 bottom-0 left-0 z-60 flex flex-col transition-transform bg-white w-72 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col gap-4 p-6 pl-10 border-b border-[#f2b523]">
          <div className="shrink-0">
            <a
              href="#"
              className="relative flex items-center justify-center w-12 h-12 text-white rounded-full"
            >
              <img
                src="https://i.pravatar.cc/40?img=7"
                alt="user name"
                title="user name"
                width="48"
                height="48"
                className="max-w-full rounded-full"
              />
              <span className="absolute bottom-0 right-0 inline-flex items-center gap-1 p-1 text-sm text-white border-2 border-white rounded-full bg-emerald-500">
                <span className="sr-only"> online </span>
              </span>
            </a>
          </div>
          <div className="flex flex-col gap-0 min-h-[2rem] items-start w-full min-w-0 ">
            <h4 className="w-full text-base truncate text-primary font-semibold">
              Zunaith Shariff
            </h4>
            <p className="w-full text-xs truncate text-gray-400">
              MERN Stack Developer
            </p>
          </div>
        </div>
        <nav
          aria-label="side navigation"
          className="flex-1 overflow-auto divide-y divide-primary"
        >
          <div>
            <ul className="flex flex-col flex-1 gap-1">
              {tabs.map((tab) => (
                <li key={tab.value}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`flex pl-10 items-center gap-3 p-3 transition-colors w-full ${
                      activeTab?.value === tab?.value
                        ? "text-white bg-[#f2b523]"
                        : "text-primary hover:text-white hover:bg-[#f2b523]"
                    }`}
                  >
                    <div className="flex items-center">{tab.logo}</div>
                    <div className="truncate">{tab.displayText}</div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <footer className="p-3 border-t border-[#f2b523]">
          <button
            onClick={() => onLogout(router)}
            className={`flex duration-500 hover:border-b hover:border-b-[#f2b523] items-center gap-3 p-3 transition-colors rounded cursor-pointer `}
          >
            <div className="flex items-center self-center ">
              <LogOut />
            </div>
            <div className="flex flex-col items-start justify-center flex-1 w-full gap-0 overflow-hidden text-sm font-medium truncate">
              Logout
            </div>
          </button>
        </footer>
      </aside>

      {/* Main Content */}
      <main
        id="smooth-wrapper"
        className="fixed top-0 left-0 right-0 bottom-0 overflow-auto"
      >
        <div
          id="smooth-content"
          className="will-change-transform min-h-[100vh] pt-40 md:px-7 lg:pt-36 lg:pl-80 lg:pr-10 lg:pb-10"
        >
          <h1 className="text-4xl md:text-6xl text-[#f2b523] font-bold text-center mb-8">
            {activeTab.displayText}
          </h1>
          <hr />
          {children}
        </div>
      </main>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 z-30 bg-black/50 lg:hidden"
          onClick={setIsDrawerOpen}
        ></div>
      )}
    </div>
  );
};

export default HomeLayout;
