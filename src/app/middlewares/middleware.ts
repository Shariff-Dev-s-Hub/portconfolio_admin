import { validateHeader } from "@/lib/utils";
import jwt from "jsonwebtoken";

export const authenticateUser = (req: Request): string | jwt.JwtPayload => {
  try {
    // Verify the token
    const isAuthenticated = validateHeader(req);
    return isAuthenticated || "Authentication failed";
  } catch (error) {
    console.error("JWT verification failed:", error);
    return "Authentication failed";
  }
};
