"use client";
import HomeLayout from "@/layouts/home-layout";
import NavLayout from "@/layouts/nav-layout";
import { checkAuth } from "@/controllers/authentication";
import Achievements from "@/sections/Achievements";
import Contact from "@/sections/Contact";
import Education from "@/sections/Education";
import Experience from "@/sections/Experience";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import { useLoaderStore } from "@/store/loader-store";
import { useSidebarStore } from "@/store/sidebar-store";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Home = () => {
  const router = useRouter();
  const { setLoading } = useLoaderStore();
  const { activeTab } = useSidebarStore() as {
    activeTab?: { value: keyof typeof sections };
  };
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // This effect is used to check authentication status when the component mounts
  const sections = {
    hero: <Hero />,
    education: <Education />,
    experience: <Experience />,
    skills: <Skills />,
    projects: <Projects />,
    achievements: <Achievements />,
    contact: <Contact />,
  };

  React.useEffect(() => {
    const authenticate = async () => {
      setLoading(true);
      try {
        const data = await checkAuth();
        if (data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.replace("/");
          toast.error("Login Required");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
      } finally {
        setLoading(false);
      }
    };
    authenticate();
  }, []);

  if (!isAuthenticated) {
    return null; // Do not render anything if not authenticated
  }

  return (
    <NavLayout>
      <HomeLayout>
        {activeTab?.value ? sections[activeTab.value] : null}
      </HomeLayout>
    </NavLayout>
  );
};

export default Home;
