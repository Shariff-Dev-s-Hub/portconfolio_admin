// utils/auth.ts
import jwt from "jsonwebtoken";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { redirect } from "next/navigation";
import Cookies from 'js-cookie';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Only call this in the browser (e.g., after login form submit)
export const generateToken = (userId: string) => {
  // localStorage.setItem("jwt", "Sample");
// return userId
//   Cookies.set('jwt', 'myToken', { path: '/', sameSite: 'Lax' });

  // if (typeof window === "undefined") {
  //   console.error("generateToken should only be called in the browser.");
  //   return;
  // }

  // const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

  // if (!secret) {
  //   throw new Error("JWT_SECRET is not defined in environment variables");
  // }

  // try {
  //   console.log("JWT_SECRET", secret);
  //   const token = jwt.sign(
  //     { userId },
  //     secret,
  //     {
  //       expiresIn: "1h", // Token expires in 1 hour
  //       algorithm: "HS256", // Use HMAC SHA-256 algorithm
  //     }
  //   );
  //   console.log("Generated JWT token:", token);

  //   // Save token in localStorage
  //   try {
  //     localStorage.setItem("jwt", token);
  //   } catch (error) {
  //     console.error("Failed to save token in localStorage", error);
  //   }
  // } catch (error) {
  //   console.error("Error generating token", error);
  //   throw error;
  // }
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
