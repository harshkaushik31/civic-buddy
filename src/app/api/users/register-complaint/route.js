import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";
import complaintModel from "@/models/complaint.model";
import { uploadToCloudinary } from "@/utils/cloudinary-upload";
import { getDataFromToken } from "@/utils/getDataFromToken";
import User from "@/models/user.model";

connectDB();

export async function POST(req) {
  try {
    // deconstructing everything from from
    const formData = await req.formData();
    const file = formData.get("file");
    const issueType = formData.get("issue-type");
    const description = formData.get("description");
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");
    const address = formData.get("address");
    const assignedDepartment = formData.get("assigned-dept");

    const userId = getDataFromToken(req);

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized - Invalid token",
        statusCode: 404,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid user",
        statusCode: 404,
      });
    }

    if (!file) {
      return NextResponse.json({
        success: false,
        message: "File not found",
        statusCode: 404,
      });
    }

    if (!description) {
      return NextResponse.json({
        success: false,
        message: "Description is required",
        stausCode: 404,
      });
    }

    // Upload file to Cloudinary and get the URL
    const imageUrl = await uploadToCloudinary(file, "civic-buddy");

    const locationData = {};
    
    if (latitude && longitude) {
      locationData.latitude = parseFloat(latitude);
      locationData.longitude = parseFloat(longitude);
    }
    
    if (address) {
      locationData.address = address.trim();
    }

    const newComplaint = new complaintModel({
      createdBy: userId,
      imageUrl: imageUrl,
      issueType: issueType || 'other',
      description: description.trim(),
      assignedDepartment: assignedDepartment || '',
      location: locationData
    })

    await newComplaint.save();

    return NextResponse.json({
      success: true,
      message: "Complaint registered successfully",
      complaint: newComplaint,
      statusCode: 201,
    });

  } catch (error) {

    console.log("Error occurred during upload: ", error);
    return NextResponse.json({
      success: false,
      message: error.message || "File upload failed",
      statusCode: 500,
    });

  }
}
