// app/api/complaints/[complaintId]/department/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDB";
import complaintModel from "@/models/complaint.model";
import { getDepartmentBySlug } from "@/config/departments.config";

export async function PATCH(req, { params }) {
  try {
    const { complaintId } = await params;
    const body = await req.json();
    const { department } = body;

    // Validate department
    const deptConfig = getDepartmentBySlug(department);
    if (!department || !deptConfig) {
      return NextResponse.json(
        { success: false, error: "Invalid department" },
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
          error: "Cannot change department of a resolved complaint",
          message: "This complaint has already been resolved and cannot be reassigned"
        },
        { status: 403 }
      );
    }

    // Update the complaint department
    const complaint = await complaintModel.findByIdAndUpdate(
      complaintId,
      {
        assignedDepartment: department,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: `Complaint reassigned to ${deptConfig.name}`,
        complaint: complaint,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error changing complaint department:", error);
    return NextResponse.json(
      { success: false, error: "Failed to change department" },
      { status: 500 }
    );
  }
}