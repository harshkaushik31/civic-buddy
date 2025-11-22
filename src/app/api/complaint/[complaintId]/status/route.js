// app/api/complaints/[complaintId]/status/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDB";
import complaintModel from "@/models/complaint.model";

export async function PATCH(req, { params }) {
  try {
    const { complaintId } = await params;
    const body = await req.json();
    const { status } = body;

    // Validate status
    const validStatuses = ['pending', 'in_progress', 'resolved', 'rejected'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    await connectDB();

    // First, get the current complaint to check its status
    const currentComplaint = await complaintModel.findById(complaintId);

    if (!currentComplaint) {
      return NextResponse.json(
        { success: false, error: "Complaint not found" },
        { status: 404 }
      );
    }

    // Check if complaint is already resolved
    if (currentComplaint.status === 'resolved') {
      return NextResponse.json(
        { 
          success: false, 
          error: "Cannot change status of a resolved complaint",
          message: "This complaint has already been resolved and cannot be modified"
        },
        { status: 403 }
      );
    }

    // Update the complaint status
    const complaint = await complaintModel.findByIdAndUpdate(
      complaintId,
      {
        status: status,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Status updated successfully",
        complaint: complaint,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating complaint status:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update status" },
      { status: 500 }
    );
  }
}