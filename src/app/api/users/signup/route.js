 import { connectDB } from "@/utils/connectDB";
 import userModel from "@/models/user.model";
 import {NextRequest, NextResponse} from 'next/server';
 
 connectDB();
 
 export async function POST(request){
    try{

        const formData = request.formData();

        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        }

    }catch(error){
        return NextResponse.json({error: error.message},{status: 500});
    }
 }