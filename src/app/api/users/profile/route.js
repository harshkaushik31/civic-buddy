import { connectDB } from "@/utils/connectDB";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";

connectDB();

export async function POST(request){
    // extract data from token
    const userId = getDataFromToken(request);
    const user = await User.findOne({_id: userId}).select("-password");

    if(!user){
        return NextResponse.json({message: "No User exists with the given token"});
    }

    return NextResponse.json({message: "user found", data: user})
}