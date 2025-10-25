import { notFound } from "next/navigation";
import Link from "next/link";
import { getDepartmentBySlug, getDepartmentSlugs } from "@/config/departments.config";
import complaintModel from "@/models/complaint.model";
import QuickActionCard from "../_components/QuickActionCard";
import StatCard from "../_components/StatCard";
import { connectDB } from "@/utils/connectDB";

// For static generation
export function generateStaticParams() {
  return getDepartmentSlugs().map((slug) => ({
    deptSlug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const { deptSlug } = await params;
  const department = getDepartmentBySlug(deptSlug);
  
  if (!department) {
    return {
      title: "Department Not Found",
    };
  }

  return {
    title: `${department.name} Dashboard - Civic Buddy`,
    description: `Manage complaints for ${department.name}`,
  };
}

//TODO:
async function getDepartmentStas(deptSlug){
  try{
    await connectDB();


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

    return formattedStats;


  }catch(error){
    console.log('Error fetching department stats: ',error);
    return {
      total: 0,
      pending: 0,
      inProgress: 0,
      resolved: 0,
      rejected: 0
    }
  }
}

export default async function DepartmentDashboard({ params }) {
  const { deptSlug } = await params;
  const department = getDepartmentBySlug(deptSlug);

  if (!department) {
    notFound();
  }


  const stats = await getDepartmentStas(deptSlug);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/department"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{department.icon}</span>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {department.shortName}
                    </h1>
                    <p className="text-sm text-gray-600">{department.name}</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Complaints"
            value={stats.total}
            color={department.color}
            icon="📊"
          />
          <StatCard
            title="Pending"
            value={stats.pending}
            color="#F59E0B"
            icon="⏳"
          />
          <StatCard
            title="In Progress"
            value={stats.inProgress}
            color="#3B82F6"
            icon="🔄"
          />
          <StatCard
            title="Resolved"
            value={stats.resolved}
            color="#10B981"
            icon="✅"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <QuickActionCard
            title="All Complaints"
            description="View and manage all complaints"
            href={`/department/${deptSlug}/complaints`}
            icon="📋"
            color={department.color}
          />
          <QuickActionCard
            title="Pending Review"
            description="Complaints waiting for action"
            href={`/department/${deptSlug}/complaints/pending`}
            icon="⏳"
            color="#F59E0B"
            badge={stats.pending}
          />
          <QuickActionCard
            title="Resolved"
            description="View Resolved Complaints"
            href={`/department/${deptSlug}/complaints/resolved`}
            icon='✅'
            color='#88e788'
          />
        </div>

        {/* Recent Complaints */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Complaints
            </h2>
            <Link
              href={`/department/${deptSlug}/complaints`}
              className="text-sm font-medium hover:underline"
              style={{ color: department.color }}
            >
              View All →
            </Link>
          </div>
          <div className="p-6">
            <p className="text-gray-500 text-center py-8">
              Recent complaints will appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



