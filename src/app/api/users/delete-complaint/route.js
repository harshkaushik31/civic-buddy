import { NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";
import complaintModel from "@/models/complaint.model";

export async function DELETE(req) {
  const body = await req.json();
  const { complaintId } = body;

  if (!complaintId) {
    return NextResponse.json({
      success: false,
      message: "Complaint ID is required",
      statusCode: 400,
    });
  }

  const complaint = await complaintModel.findById(complaintId);
  if (!complaint) {
    return NextResponse.json({
      success: false,
      message: "Enter correct complaint id",
      statusCode: 404,
    });
  }

  console.log("Found complaint:", complaint);

  const userId = getDataFromToken(req);
  if (complaint.createdBy != userId) {
    return NextResponse.json({
      success: false,
      message: "Unauthorized: You can only delete your own complaints",
      statusCode: 403, 
    });
  }

  try {
    
    const deleteComplaint = await complaintModel.findByIdAndDelete(complaintId);
    console.log("Deleted complaint:", deleteComplaint);

    if (!deleteComplaint) {
      return NextResponse.json({
        success: false,
        message: "Failed to delete complaint",
        statusCode: 500,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Complaint deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      statusCode: 500,
    });
  }
}