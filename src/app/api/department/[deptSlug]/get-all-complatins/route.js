import { getDepartmentBySlug } from "@/config/departments.config";
import complaintModel from "@/models/complaint.model";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET({params}){
    try{

        const { deptSlug } = await params;
        const department = getDepartmentBySlug(deptSlug);

        if(!department){
            return NextResponse.json(
                {
                    error: "Invalid Department"
                },
                {
                    status: 400
                }
            )
        }

        await connectDB();

        const allComplains = await complaintModel
            .find({ assignedDepartment: deptSlug})
            .sort({createdAt: -1})
            .select('_id issueType description location status')
            .lean();

        console.log(allComplains);

        return NextResponse.json(
            {
                success: true,
                allComplains
            },
            {
                status: 200
            }    
        )

    }catch(error){
        console.log('Could not get all the complaints: ',error);
        return NextResponse.json(
            {
                success: false,
                allComplains: {}
            },
            {
                status: 500
            }
        )
    }
}