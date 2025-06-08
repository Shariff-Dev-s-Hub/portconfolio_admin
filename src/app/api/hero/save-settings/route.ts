import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb";
import HeroSettings from "@/models/hero-models/heroSettings";
import { authenticateUser } from "@/app/middlewares/middleware";
/**
 * Route to save hero settings.
 * This route allows authenticated users to update or create hero settings in the database.
 * It expects a JSON body with the hero settings data.
 */

export async function POST(req: Request) {
  try {
    // Authenticate the user
    const user = authenticateUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectDb();

    // Parse the request body
    const settings = await req.json();

    // Update or create hero settings in the database
    const updatedSettings = await HeroSettings.findOneAndUpdate({}, settings, {
      upsert: true,
      new: true,
    });

    // Return the updated settings as a JSON response
    return NextResponse.json(updatedSettings, { status: 200 });
  } catch (error) {
    console.error("Error in save-settings route:", error);

    // Handle unauthorized errors
    if (error instanceof Error && error.message.startsWith("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    // Handle server errors
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
