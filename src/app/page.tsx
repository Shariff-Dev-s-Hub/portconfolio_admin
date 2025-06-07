"use client";
import LoginForm from "@/components/authentication/login";
import { checkAuth } from "@/controllers/authentication";
import { useLoaderStore } from "@/store/loader-store";
import { useRouter } from "next/navigation";
import React from "react";

export default function Login() {
  const router = useRouter();
  const { setLoading } = useLoaderStore();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const authenticate = async () => {
      setLoading(true);
      try {
        const data = await checkAuth();
        if (data) {
          setIsAuthenticated(true);
          router.replace("/home");
        } else {
          setIsAuthenticated(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        setLoading(false);
      }
    };
    authenticate();
  }, []);

  if (isAuthenticated) {
    return null;
  }

  return <LoginForm />;
}
