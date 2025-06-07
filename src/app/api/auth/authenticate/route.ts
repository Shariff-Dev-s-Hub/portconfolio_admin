import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
 const token = req.headers.get("Authorization")?.replace("Bearer ", "");
 if (token) {
   console.log("Token received:", JSON.parse(token));
 }
  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "JWT_SECRET is not defined in environment variables" },
      { status: 500 }
    );
  }

  try {
    const decoded = jwt.verify(JSON.parse(token), secret);
    console.log("Decoded token:", decoded);
    return NextResponse.json(
      { message: "Token is valid" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Invalid token", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
