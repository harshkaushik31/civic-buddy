import { getDepartmentBySlug } from "@/config/departments.config";
import complaintModel from "@/models/complaint.model";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    try{

        const { deptSlug } = await params;
        const department = getDepartmentBySlug(deptSlug);

        if(!department){
            return NextResponse.json(
                {error: "Invalid Department"},
                {status: 404}
            )
        }

        await connectDB();

        const resolvedComplaints = await complaintModel
            .find({ assignedDepartment: deptSlug, status: 'resolved'})
            .sort({createdAt: -1})
            .select('_id issueType description location status')
            .lean();

        console.log("The resolved complaints are: ");
        console.log(resolvedComplaints);

        return NextResponse.json(
            {
            success: true, 
            resolvedComplaints: resolvedComplaints
            },
            {status: 200}
        )

    }catch(error){
        console.log('Could not get the Pending complaints',error);
        return NextResponse.json(
            {success: false, resolvedComplaints: {}},
            {status: 500}
        )
    }
}