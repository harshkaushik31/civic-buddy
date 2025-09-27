import { NextResponse } from "next/server";
import complaintModel from "@/models/complaint.model";
import { connectDB } from "@/utils/connectDB";
import { getDataFromToken } from "@/utils/getDataFromToken";

connectDB();

export async function POST(req) {
  try {
    const body = await req.json();
    const { complaintId } = body;

    console.log('Complaint ID:', complaintId);
    
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
    
    console.log('Found complaint:', complaint);

    const userId = getDataFromToken(req);

    if(complaint.createdBy != userId){
      return NextResponse.json({
        success: false,
        message: "Enter correct complaint id",
        statusCode: 404,
      });
    }


    

    return NextResponse.json({
      success: true,
      message: "Complaint found successfully",
      complaint: complaint,
      statusCode: 200,
    });

  } catch (error) {
    console.log("Error while processing ", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
}
