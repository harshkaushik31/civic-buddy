import { connectDB } from "@/utils/connectDB";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request){
    try{
        const requestBody = await request.json();
        const {token} = requestBody
        console.log(token);
        
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if(!user){
            return NextResponse.json({message: "Invlid Token"},{status: 400})
        }

        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({message: "Email Verified successfully", success: true},{status: 200})

    }catch(error){
        return NextResponse.json({message: "Could Not verify email: ",error},{status: 500})
    }
}