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

        const pendingComplaints = await complaintModel
            .find({ assignedDepartment: deptSlug, status: 'pending'})
            .sort({createdAt: -1})
            .select('_id issueType description location status')
            .lean();

        console.log("The pending complaints are: ");
        console.log(pendingComplaints);

        return NextResponse.json(
            {
            success: true, 
            pendingComplaints: pendingComplaints
            },
            {status: 200}
        )

    }catch(error){
        console.log('Could not get the Pending complaints',error);
        return NextResponse.json(
            {success: false, pendingComplaints: {}},
            {status: 500}
        )
    }
}