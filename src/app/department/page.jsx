import Link from "next/link";
import { getAllDepartments } from "@/config/departments.config";

export const metadata = {
  title: "Select Department - Civic Buddy",
  description: "Choose your department to manage complaints",
};

export default function DepartmentSelectionPage() {
  const departments = getAllDepartments();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Department Portal</h1>
          <p className="mt-1 text-sm text-gray-600">
            Select your department to access the complaint management dashboard
          </p>
        </div>
      </div>

      {/* Department Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <Link
              href={`/department/${dept.slug}`}
              key={dept.slug}
              className="group"
            >
              <div
                className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-opacity-50 h-full"
                style={{ 
                  borderColor: `${dept.color}20`,
                }}
              >
                {/* Color Accent Bar */}
                <div
                  className="h-2 w-full"
                  style={{ backgroundColor: dept.color }}
                />

                {/* Content */}
                <div className="p-6">
                  {/* Icon and Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="text-4xl p-3 rounded-lg"
                      style={{ backgroundColor: dept.bgColor }}
                    >
                      {dept.icon}
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>

                  {/* Department Name */}
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {dept.shortName}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">{dept.name}</p>

                  {/* Description */}
                  <p className="text-xs text-gray-500 mb-4">
                    {dept.description}
                  </p>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2">
                    {dept.categories.slice(0, 3).map((category, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: dept.bgColor,
                          color: dept.color,
                        }}
                      >
                        {category}
                      </span>
                    ))}
                    {dept.categories.length > 3 && (
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: dept.bgColor,
                          color: dept.color,
                        }}
                      >
                        +{dept.categories.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
                  style={{ backgroundColor: dept.color }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-900">
                Department Staff Access Only
              </h3>
              <p className="mt-1 text-sm text-blue-700">
                This portal is for authorized department staff only. All activities
                are logged and monitored for security purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}