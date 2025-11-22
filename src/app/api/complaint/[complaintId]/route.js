import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDB";
import complaintModel from "@/models/complaint.model";

export async function GET(req, { params }) {
  try {
    const { complaintId } = await params;
    
    console.log(complaintId);

    await connectDB();

    const complaint = await complaintModel
      .findById(complaintId)
      .lean();

    if (!complaint) {
      return NextResponse.json(
        { success: false, error: "Complaint not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        complaint: complaint,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching complaint:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch complaint" },
      { status: 500 }
    );
  }
}
