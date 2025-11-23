// app/department/[deptSlug]/complaints/[complaintId]/page.jsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { getDepartmentBySlug, getAllDepartments } from "@/config/departments.config";
import toast from "react-hot-toast";

export default function ComplaintDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { deptSlug } = params;
  const complaintId = params.id;
  
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  
  const department = getDepartmentBySlug(deptSlug);
  const allDepartments = getAllDepartments();

  useEffect(() => {
    fetchComplaint();
  }, [complaintId]);

  const fetchComplaint = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/complaint/${complaintId}`);
      setComplaint(response.data.complaint);
    } catch (error) {
      console.error("Error fetching complaint:", error);
      toast.error("Failed to load complaint details");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      const response = await axios.patch(`/api/complaint/${complaintId}/status`, {
        status: newStatus,
      });
      toast.success(`Complaint status updated to ${newStatus}`);
      setShowStatusModal(false);
      fetchComplaint(); // Refresh data
    } catch (error) {
      console.error("Error updating status:", error);
      if (error.response?.status === 403) {
        toast.error(error.response.data.message || "Cannot change status of a resolved complaint");
      } else {
        toast.error(error.response?.data?.error || "Failed to update status");
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleDepartmentChange = async (newDepartment) => {
    try {
      setUpdating(true);
      const response = await axios.patch(`/api/complaint/${complaintId}/department`, {
        department: newDepartment,
      });
      toast.success(response.data.message || "Department changed successfully");
      setShowDepartmentModal(false);
      // Redirect to the new department's complaint page
      router.push(`/department/${newDepartment}/complaints/${complaintId}`);
    } catch (error) {
      console.error("Error changing department:", error);
      if (error.response?.status === 403) {
        toast.error(error.response.data.message || "Cannot change department of a resolved complaint");
      } else {
        toast.error(error.response?.data?.error || "Failed to change department");
      }
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    if (status === 'in_progress') return 'In Progress';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading complaint details...</p>
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complaint Not Found</h2>
          <p className="text-gray-600 mb-4">The complaint you're looking for doesn't exist.</p>
          <Link
            href={`/department/${deptSlug}/complaints`}
            className="text-blue-600 hover:underline"
          >
            ← Back to All Complaints
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/department/${deptSlug}/complaints`}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Complaint Details</h1>
                <p className="text-sm text-gray-600">{department?.name}</p>
              </div>
            </div>
            <button
              onClick={() => setShowStatusModal(true)}
              disabled={complaint.status === 'resolved'}
              className={`px-4 py-2 rounded-lg transition-colors ${
                complaint.status === 'resolved'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {complaint.status === 'resolved' ? 'Status Locked' : 'Update Status'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Complaint Info Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {complaint.issueType}
                  </h2>
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(complaint.status)}`}>
                    {getStatusLabel(complaint.status)}
                  </span>
                </div>
                {complaint.priority && (
                  <span className={`px-3 py-1 text-sm font-medium rounded-lg ${
                    complaint.priority === 'high' ? 'bg-red-100 text-red-700' :
                    complaint.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)} Priority
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {complaint.description || 'No description provided.'}
                  </p>
                </div>

                {complaint.location?.address && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Location</h3>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="text-gray-600">{complaint.location.address}</p>
                        {complaint.location.latitude && complaint.location.longitude && (
                          <a
                            href={`https://www.google.com/maps?q=${complaint.location.latitude},${complaint.location.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                          >
                            View on Google Maps →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {complaint.images && complaint.images.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Attachments</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {complaint.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Complaint image ${index + 1}`}
                          className="rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                          onClick={() => window.open(image, '_blank')}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metadata Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Complaint ID</p>
                  <p className="text-sm font-mono text-gray-900">{complaint._id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Department</p>
                  <p className="text-sm text-gray-900">{complaint.assignedDepartment}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Filed On</p>
                  <p className="text-sm text-gray-900">
                    {new Date(complaint.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                {complaint.updatedAt && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                    <p className="text-sm text-gray-900">
                      {new Date(complaint.updatedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              
              {complaint.status === 'resolved' && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-green-900">Complaint Resolved</p>
                      <p className="text-xs text-green-700 mt-1">This complaint has been resolved and status cannot be changed</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <button
                  onClick={() => setShowStatusModal(true)}
                  disabled={complaint.status === 'resolved'}
                  className={`w-full px-4 py-2 rounded-lg transition-colors ${
                    complaint.status === 'resolved'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {complaint.status === 'resolved' ? 'Status Locked' : 'Change Status'}
                </button>
                <button
                  onClick={() => setShowDepartmentModal(true)}
                  disabled={complaint.status === 'resolved'}
                  className={`w-full px-4 py-2 rounded-lg transition-colors ${
                    complaint.status === 'resolved'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {complaint.status === 'resolved' ? 'Transfer Locked' : 'Transfer Department'}
                </button>
                <button
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Add Note
                </button>
                <button
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Contact User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Update Status</h3>
            
            {complaint.status === 'resolved' ? (
              <div className="mb-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div>
                      <p className="font-medium text-green-900 mb-1">Status Locked</p>
                      <p className="text-sm text-green-700">This complaint has been marked as resolved and its status cannot be changed.</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-6">
                  Change the status of this complaint
                </p>
                <div className="space-y-3">
                  {['pending', 'in_progress', 'resolved', 'rejected'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(status)}
                      disabled={updating || complaint.status === status}
                      className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-colors ${
                        complaint.status === status
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{getStatusLabel(status)}</span>
                        {complaint.status === status && (
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded">Current</span>
                        )}
                      </div>
                      {status === 'resolved' && (
                        <p className="text-xs text-gray-500 mt-1">⚠️ Once resolved, status cannot be changed</p>
                      )}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowStatusModal(false)}
                  disabled={updating}
                  className="w-full mt-4 px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Department Change Modal */}
      {showDepartmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Transfer to Another Department</h3>
            
            {complaint.status === 'resolved' ? (
              <div className="mb-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div>
                      <p className="font-medium text-green-900 mb-1">Transfer Locked</p>
                      <p className="text-sm text-green-700">This complaint has been resolved and cannot be transferred to another department.</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowDepartmentModal(false)}
                  className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Select the department that should handle this complaint
                </p>
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs text-amber-800">
                    ⚠️ <strong>Warning:</strong> Transferring will reassign this complaint to another department. This action cannot be undone.
                  </p>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {allDepartments.map((dept) => (
                    <button
                      key={dept.slug}
                      onClick={() => handleDepartmentChange(dept.slug)}
                      disabled={updating || complaint.assignedDepartment === dept.slug}
                      className={`w-full px-4 py-3 rounded-lg text-left transition-colors ${
                        complaint.assignedDepartment === dept.slug
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-300'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span 
                          className="text-2xl p-2 rounded-lg"
                          style={{ backgroundColor: dept.bgColor }}
                        >
                          {dept.icon}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{dept.shortName}</p>
                            {complaint.assignedDepartment === dept.slug && (
                              <span className="text-xs bg-gray-200 px-2 py-1 rounded">Current</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{dept.name}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowDepartmentModal(false)}
                  disabled={updating}
                  className="w-full mt-4 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}