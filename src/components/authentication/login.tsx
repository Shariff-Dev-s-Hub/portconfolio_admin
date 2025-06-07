"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { login } from "@/controllers/authentication";
import { useRouter } from "next/navigation";
import { useLoaderStore } from "@/store/loader-store";
import { LoaderPinwheel } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const { isLoading, setLoading } = useLoaderStore();
  const [inputValues, setInputValues] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const data = await login({
        email: inputValues.email,
        password: inputValues.password,
      });
      if (data) {
        router.push("/home");
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error setting loading state:", error);
      setLoading(false);
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50 px-4">
      <Card className="mx-auto w-full max-w-xl border-none duration-500 hover:mb-5 hover:shadow-xl hover:shadow-amber-600">
        <CardHeader className="space-y-1">
          <CardTitle className="text-4xl font-bold text-yellow-500 text-center md:text-left">
            Login
          </CardTitle>
          <CardDescription className="text-primary text-xs text-center md:text-left">
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin();
            }}
            className="space-y-10 mt-4"
          >
            <div className="space-y-4">
              <Label htmlFor="email">Email</Label>
              <Input
                // className="border-yellow-500"
                value={inputValues.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setInputValues({ ...inputValues, email: e.target.value });
                }}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="password">Password</Label>
              <Input
                // className="border-yellow-500"
                value={inputValues?.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setInputValues({ ...inputValues, password: e.target.value });
                }}
                id="password"
                type="password"
                required
              />
            </div>
            <div className="flex justify-center">
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full max-w-52 bg-yellow-600"
              >
                {isLoading ? (
                  <LoaderPinwheel className="animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
