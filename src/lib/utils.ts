// utils/auth.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateHeader = (req: Request) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: Missing or invalid token");
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.error("JWT verification failed:", error);
  }
};
