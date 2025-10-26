// app/department/[deptSlug]/complaints/_components/ComplaintCard.jsx
"use client";

import Link from "next/link";

export default function ComplaintCard({ complaint, deptSlug }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'in_progress':
        return 'In Progress';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'low':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Link
      href={`/department/${deptSlug}/complaints/${complaint._id}`}
      className="block p-6 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Complaint Header */}
          <div className="flex items-start gap-4 mb-3">
            <div className={`p-2 rounded-lg flex-shrink-0 ${
              complaint.status === 'pending' ? 'bg-amber-100' :
              complaint.status === 'in_progress' ? 'bg-blue-100' :
              complaint.status === 'resolved' ? 'bg-green-100' :
              'bg-gray-100'
            }`}>
              <svg
                className={`w-5 h-5 ${
                  complaint.status === 'pending' ? 'text-amber-600' :
                  complaint.status === 'in_progress' ? 'text-blue-600' :
                  complaint.status === 'resolved' ? 'text-green-600' :
                  'text-gray-600'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {complaint.status === 'resolved' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ) : complaint.status === 'in_progress' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                )}
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {complaint.issueType}
                </h3>
                {complaint.priority && (
                  <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)} Priority
                  </span>
                )}
              </div>
              {complaint.description && (
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {complaint.description}
                </p>
              )}
            </div>
          </div>

          {/* Complaint Metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(complaint.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
            {complaint.location?.address && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {complaint.location.address}
              </span>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="ml-4">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(complaint.status)}`}>
            {getStatusLabel(complaint.status)}
          </span>
        </div>
      </div>
    </Link>
  );
}