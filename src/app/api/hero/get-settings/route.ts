import { NextResponse } from "next/server";
import HeroSettings from "@/models/hero-models/heroSettings";
import { connectDb } from "@/lib/mongodb";
import { authenticateUser } from "@/app/middlewares/middleware";

export async function GET(req: Request) {
  try {
    const user = authenticateUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDb();
    // Fetch the hero settings from the database
    const heroSettings = await HeroSettings.findOne({});
    if (!heroSettings) {
      return NextResponse.json(
        { error: "Hero settings not found" },
        { status: 404 }
      );
    }
    // Return the hero settings as a JSON response
    return NextResponse.json(heroSettings, { status: 200 });
  } catch (error) {
    console.error("Error in hero route:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
