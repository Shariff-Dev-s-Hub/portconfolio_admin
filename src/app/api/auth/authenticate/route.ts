import { validateHeader } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const isAuthenticated = validateHeader(req);
  try {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ message: "Token is valid" }, { status: 200 });
  } catch (error) {
    console.error("Invalid token", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
