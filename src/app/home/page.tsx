"use client";
import NavLayout from "@/components/layouts/nav-layout";
import { LoaderView } from "@/components/ui/loader";
import { checkAuth } from "@/controllers/authentication";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // This effect is used to check authentication status when the component mounts
  React.useEffect(() => {
    const authenticate = async () => {
      setIsLoading(true);
      try {
        const data = await checkAuth();
        console.log("Authentication data:", data);
        if (data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.replace("/");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    authenticate();
  }, []);

  if (isLoading) {
    return <LoaderView />;
  }

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
