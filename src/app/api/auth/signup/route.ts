import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { connectDb } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDb();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    return NextResponse.json({ message: "User created", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error in signup route:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
