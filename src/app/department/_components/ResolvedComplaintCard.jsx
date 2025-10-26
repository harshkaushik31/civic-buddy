"use client";

import Link from "next/link";

export default function ResolvedComplaintCard({ complaint, deptSlug }) {
  // Calculate resolution time
  const getResolutionTime = () => {
    if (!complaint.updatedAt) return null;
    
    const created = new Date(complaint.createdAt);
    const resolved = new Date(complaint.updatedAt);
    const diffMs = resolved - created;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else {
      return 'Less than 1 hour';
    }
  };

  const resolutionTime = getResolutionTime();

  return (
    <Link
      href={`/department/${deptSlug}/complaints/${complaint._id}`}
      className="block p-6 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Complaint Header */}
          <div className="flex items-start gap-4 mb-3">
            <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
              <svg
                className="w-5 h-5 text-green-600"
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
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {complaint.issueType}
              </h3>
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
              Filed: {new Date(complaint.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
            {complaint.updatedAt && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 text-green-600 font-medium">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Resolved: {new Date(complaint.updatedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </>
            )}
            {complaint.location?.address && (
              <>
                <span>•</span>
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
              </>
            )}
          </div>
        </div>

        {/* Status Badge & Resolution Time */}
        <div className="ml-4 flex flex-col items-end gap-2">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Resolved
          </span>
          {resolutionTime && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg
                className="w-3 h-3"
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
              <span>{resolutionTime}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}