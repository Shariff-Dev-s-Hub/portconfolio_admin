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

export default function LoginForm() {
  const router = useRouter();
  const [inputValues, setInputValues] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    const data = await login({
      email: inputValues.email,
      password: inputValues.password,
    });
    if (data) {
      router.push("/home");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="mx-auto w-full max-w-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
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
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                value={inputValues?.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setInputValues({ ...inputValues, password: e.target.value });
                }}
                id="password"
                type="password"
                required
              />
            </div>
            <Button onClick={onLogin} type="submit" className="w-full">
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
