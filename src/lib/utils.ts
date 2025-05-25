// utils/auth.ts
import jwt from "jsonwebtoken";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { redirect } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Only call this in the browser (e.g., after login form submit)
export const generateTokenAndNavigate = (userId: string) => {
  if (typeof window === "undefined") return;

  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign({ userId }, secret, { expiresIn: "7d" });

  // Save token in localStorage
  localStorage.setItem("jwt", token);

  // Redirect to home page
  redirect("/dashboard");

};

export const authenticateUser = (token: string) => {
  if (typeof window === "undefined") return;

  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}
export const logoutUser = () => {
  if (typeof window === "undefined") return;

  // Remove token from localStorage
  localStorage.removeItem("jwt");

  // Redirect to login page
  redirect("/login");
}
export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("jwt");
  if (!token) return false;

  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    jwt.verify(token, secret);
    return true;
  } catch (error) {
    console.error("Invalid token", error);
    return false;
  }
}
