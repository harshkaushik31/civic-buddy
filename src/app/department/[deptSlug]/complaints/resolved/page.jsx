// app/department/[deptSlug]/complaints/resolved/page.jsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDepartmentBySlug, getDepartmentSlugs } from "@/config/departments.config";
import { connectDB } from "@/utils/connectDB";
import complaintModel from "@/models/complaint.model";
import ResolvedComplaintCard from "@/app/department/_components/ResolvedComplaintCard";

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
    title: `Resolved Complaints - ${department.name} - Civic Buddy`,
    description: `View resolved complaints for ${department.name}`,
  };
}

// Fetch resolved complaints directly from database
async function getResolvedComplaints(deptSlug) {
  try {
    await connectDB();

    const resolvedComplaints = await complaintModel
      .find({ assignedDepartment: deptSlug, status: 'resolved' })
      .sort({ updatedAt: -1 }) // Sort by most recently resolved
      .select('_id issueType description location status createdAt updatedAt')
      .lean();

    // Serialize the data to plain objects
    return resolvedComplaints.map(complaint => ({
      _id: complaint._id.toString(),
      issueType: complaint.issueType,
      description: complaint.description || null,
      location: complaint.location || null,
      status: complaint.status,
      createdAt: complaint.createdAt.toISOString(),
      updatedAt: complaint.updatedAt ? complaint.updatedAt.toISOString() : null,
    }));
  } catch (error) {
    console.error("Error fetching resolved complaints:", error);
    return [];
  }
}

export default async function ResolvedComplaintsPage({ params }) {
  const { deptSlug } = await params;
  const department = getDepartmentBySlug(deptSlug);

  if (!department) {
    notFound();
  }

  const resolvedComplaints = await getResolvedComplaints(deptSlug);

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
                  <span className="text-3xl">✅</span>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Resolved Complaints
                    </h1>
                    <p className="text-sm text-gray-600">
                      {department.name} • {resolvedComplaints.length} resolved
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter/Sort Options */}
            <div className="flex gap-3">
              <Link
                href={`/department/${deptSlug}/complaints`}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                All Complaints
              </Link>
              <Link
                href={`/department/${deptSlug}/complaints/pending`}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Pending
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {resolvedComplaints.length} Complaints Successfully Resolved
              </h2>
              <p className="text-sm text-gray-600">
                Great work! These issues have been addressed and closed
              </p>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="divide-y">
            {resolvedComplaints.length > 0 ? (
              resolvedComplaints.map((complaint) => (
                <ResolvedComplaintCard
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Resolved Complaints Yet
                </h3>
                <p className="text-gray-600">
                  Resolved complaints for {department.name} will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}