// app/department/[deptSlug]/complaints/page.jsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDepartmentBySlug, getDepartmentSlugs } from "@/config/departments.config";
import { connectDB } from "@/utils/connectDB";
import complaintModel from "@/models/complaint.model";
import ComplaintCard from "../../_components/ComplaintCard";

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
    title: `All Complaints - ${department.name} - Civic Buddy`,
    description: `View all complaints for ${department.name}`,
  };
}

// Fetch all complaints directly from database
async function getAllComplaints(deptSlug) {
  try {
    await connectDB();

    const complaints = await complaintModel
      .find({ assignedDepartment: deptSlug })
      .sort({ createdAt: -1 })
      .select('_id issueType description location status createdAt priority')
      .lean();

    // Serialize the data to plain objects
    return complaints.map(complaint => ({
      _id: complaint._id.toString(),
      issueType: complaint.issueType,
      description: complaint.description || null,
      location: complaint.location || null,
      status: complaint.status,
      createdAt: complaint.createdAt.toISOString(),
      priority: complaint.priority || null,
    }));
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return [];
  }
}

// Get complaint counts by status
async function getComplaintStats(deptSlug) {
  try {
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

    const formattedStats = {
      total: 0,
      pending: 0,
      inProgress: 0,
      resolved: 0,
    };

    stats.forEach((stat) => {
      formattedStats.total += stat.count;
      if (stat._id === "pending") formattedStats.pending = stat.count;
      if (stat._id === "in_progress") formattedStats.inProgress = stat.count;
      if (stat._id === "resolved") formattedStats.resolved = stat.count;
    });

    return formattedStats;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return { total: 0, pending: 0, inProgress: 0, resolved: 0 };
  }
}

export default async function AllComplaintsPage({ params }) {
  const { deptSlug } = await params;
  const department = getDepartmentBySlug(deptSlug);

  if (!department) {
    notFound();
  }

  const complaints = await getAllComplaints(deptSlug);
  const stats = await getComplaintStats(deptSlug);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/department/${deptSlug}`}
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
                  <span className="text-3xl">📋</span>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      All Complaints
                    </h1>
                    <p className="text-sm text-gray-600">
                      {department.name} • {complaints.length} total complaints
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-2xl">🔄</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              All Complaints
            </h2>
          </div>
          <div className="divide-y">
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <ComplaintCard
                  key={complaint._id}
                  complaint={complaint}
                  deptSlug={deptSlug}
                />
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Complaints Yet
                </h3>
                <p className="text-gray-600">
                  No complaints have been assigned to {department.name} yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}