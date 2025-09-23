import { NextResponse } from "next/server";
import complaintModel from "@/models/complaint.model";
import { getDataFromToken } from "@/utils/getDataFromToken";

export async function GET(req) {
    try {
        const userId = getDataFromToken(req);
    
        if(!userId){
            return NextResponse.json({
            success: false,
            message: "Unauthorized user",
            statusCode: 400,
          });
        }
    
        const complaints = await complaintModel.find({createdBy: userId});

        return NextResponse.json({
        success: true,
        message: "Found the complaints by the user",
        complaints: complaints,
        statusCode: 404,
      });
        


    } catch (error) {
        return NextResponse.json({
        success: false,
        message: "Error fetching Complaints",
        statusCode: 500,
      });
    }
    
}