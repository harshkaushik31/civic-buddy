// app/department/[deptSlug]/layout.jsx
import { getDepartmentBySlug } from "@/config/departments.config";
import { notFound } from "next/navigation";

export default async function DepartmentLayout({ children, params }) {
  const { deptSlug } = await params;
  const department = getDepartmentBySlug(deptSlug);
  
  if (!department) {
    notFound();
  }
  
  return (
    <div>
      {/* Optional: Add department-specific navigation here */}
      {children}
    </div>
  );
}