import { NextResponse } from "next/server";
import complaintModel from "@/models/complaint.model";
import { connectDB } from "@/utils/connectDB";

export async function GET(req) {
  try {
    await connectDB();

    const potholeLocations = await complaintModel.find(
      { issueType: "pothole" },
      {
        _id: 0,
        "location.latitude": 1,
        "location.longitude": 1,
      }
    );

    return NextResponse.json(
      { success: true, locations: potholeLocations },
      { status: 200 }
    );

  } catch (error) {
    console.log("Could not get all pothole locations", error);

    return NextResponse.json(
      { success: false, locations: [] },
      { status: 500 }
    );
  }
}