import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(){
    try{
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true
        })

        response.cookies.set('token',"",{
            httpOnly: true,
            expires: new Date(0)
        });

        return response;

    }catch(error){
        return NextResponse.json({message: "Could not logout ",error},{status: 500})
    }
}