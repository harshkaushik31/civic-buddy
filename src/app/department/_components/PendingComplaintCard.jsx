"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PendingComplaintCard({ complaint, deptSlug }) {
  const router = useRouter();

  const handleTakeAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/department/${deptSlug}/complaints/${complaint._id}`);
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
            <div className="bg-amber-100 p-2 rounded-lg flex-shrink-0">
              <svg
                className="w-5 h-5 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
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

        {/* Status Badge & Action */}
        <div className="ml-4 flex flex-col items-end gap-2">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            Pending
          </span>
          <button
            onClick={handleTakeAction}
            className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            Take Action →
          </button>
        </div>
      </div>
    </Link>
  );
}