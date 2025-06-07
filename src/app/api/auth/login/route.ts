import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { connectDb } from "@/lib/mongodb";
import jwt from "jsonwebtoken";

const generateToken = (userId: string) => {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    try {
      const token = jwt.sign({ userId }, secret, {
        expiresIn: "7d", 
        algorithm: "HS256",
      });

      return token
    } catch (error) {
      console.error("Error generating token", error);
      throw error;
    }
  };

export async function POST(req: Request) {
  try {
    await connectDb();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    console.log("User found:", user);
   
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = generateToken(user._id);
    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
