// app/department/[deptSlug]/complaints/pending/page.jsx
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getDepartmentBySlug,
  getDepartmentSlugs,
} from "@/config/departments.config";
import { connectDB } from "@/utils/connectDB";
import complaintModel from "@/models/complaint.model";
import PendingComplaintCard from "@/app/department/_components/PendingComplaintCard";

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
    title: `Pending Complaints - ${department.name} - Civic Buddy`,
    description: `View pending complaints for ${department.name}`,
  };
}

// Fetch pending complaints directly from database
async function getPendingComplaints(deptSlug) {
  try {
    await connectDB();

    const pendingComplaints = await complaintModel
      .find({ assignedDepartment: deptSlug, status: "pending" })
      .sort({ createdAt: -1 })
      .select("_id issueType description location status createdAt")
      .lean();

    return pendingComplaints;
  } catch (error) {
    console.error("Error fetching pending complaints:", error);
    return [];
  }
}

export default async function PendingComplaintsPage({ params }) {
  const { deptSlug } = await params;
  const department = getDepartmentBySlug(deptSlug);

  if (!department) {
    notFound();
  }

  const pendingComplaints = await getPendingComplaints(deptSlug);

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
                  <span className="text-3xl">⏳</span>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Pending Complaints
                    </h1>
                    <p className="text-sm text-gray-600">
                      {department.name} • {pendingComplaints.length} pending
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
                href={`/department/${deptSlug}/complaints/resolved`}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Resolved
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {pendingComplaints.length} Complaints Awaiting Action
              </h2>
              <p className="text-sm text-gray-600">
                These complaints require your attention and response
              </p>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="divide-y">
            {pendingComplaints.length > 0 ? (
              pendingComplaints.map((complaint) => (
                <Link
                  key={complaint._id.toString()}
                  href={`/department/${deptSlug}/complaints/${complaint._id}`}
                  className="block p-6 hover:bg-gray-50 transition-colors"
                >
                  <PendingComplaintCard
                    key={complaint._id.toString()}
                    complaint={complaint}
                    deptSlug={deptSlug}
                  />
                </Link>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
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
                  All Caught Up!
                </h3>
                <p className="text-gray-600">
                  No pending complaints for {department.name} at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
