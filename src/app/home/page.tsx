"use client";
import NavLayout from "@/components/layouts/nav-layout";
import { checkAuth } from "@/controllers/authentication";
import { useLoaderStore } from "@/store/loader-store";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Home = () => {
  const router = useRouter();
  const { setLoading } = useLoaderStore();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // This effect is used to check authentication status when the component mounts
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
      <>
        <h1>Hello world</h1>
        {/* Hero configuration section */}
        {/* Education Config Section */}
        {/* Projects config section */}
        {/* Certification section */}
        {/* Skills section */}
        {/* Contact section */}
        {/* Footer section */}
      </>
    </NavLayout>
  );
};

export default Home;
