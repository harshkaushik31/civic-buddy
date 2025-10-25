import { NextResponse } from "next/server";
import { getDepartmentBySlug } from "@/config/departments.config";
import { connectDB } from "@/utils/connectDB";
import complaintModel from "@/models/complaint.model";

export async function GET(req, { params }) {
  try {
    const { deptSlug } = await params;

    const department = getDepartmentBySlug(deptSlug);
    
    if (!department) {
      return NextResponse.json(
        { error: "Invalid department" },
        { status: 404 }
      );
    }

    await connectDB();

    // Get stats for this specific department
    const stats = await complaintModel.aggregate([
      { $match: { assignedDepartment: deptSlug } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    console.log(stats);

    // Format the stats
    const formattedStats = {
      total: 0,
      pending: 0,
      inProgress: 0,
      resolved: 0,
      rejected: 0,
    };

    stats.forEach((stat) => {
      formattedStats.total += stat.count;
      if (stat._id === "pending") formattedStats.pending = stat.count;
      if (stat._id === "in_progress") formattedStats.inProgress = stat.count;
      if (stat._id === "resolved") formattedStats.resolved = stat.count;
      if (stat._id === "rejected") formattedStats.rejected = stat.count;
    });

    return NextResponse.json({
      success: true,
      department: deptSlug,
      stats: formattedStats,
    });
    
  } catch (error) {
    console.log("Error fetching stats for the department: ", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
