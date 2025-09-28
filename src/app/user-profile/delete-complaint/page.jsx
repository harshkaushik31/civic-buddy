"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  Trash2, 
  AlertTriangle, 
  Search, 
  FileText, 
  Calendar, 
  MapPin, 
  User,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowLeft,
  Eye,
  Clock,
  Filter
} from "lucide-react";

export default function Page() {
  const router = useRouter();
  
  // State management
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch user's complaints
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await axios.get("/api/users/your-complaints");
      
      if (response.data.success) {
        setComplaints(response.data.complaints || []);
      } else {
        setError("Failed to fetch complaints");
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setError(error.response?.data?.message || "Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  // Delete complaint
  const deleteComplaint = async (complaintId) => {
    try {
      setDeleteLoading(complaintId);
      
      const response = await axios.delete("/api/users/delete-complaint", {
        data: { complaintId }
      });
      
      if (response.data.success) {
        // Remove complaint from local state
        setComplaints(prev => prev.filter(complaint => complaint._id !== complaintId));
        setShowConfirmModal(false);
        setSelectedComplaint(null);
      } else {
        setError("Failed to delete complaint");
      }
    } catch (error) {
      console.error("Error deleting complaint:", error);
      setError(error.response?.data?.message || "Failed to delete complaint");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in progress':
      case 'investigating':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Can delete complaint (only pending complaints)
  const canDeleteComplaint = (complaint) => {
    return complaint.status?.toLowerCase() === 'pending';
  };

  // Filter complaints
  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.issueType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.location?.address?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || complaint.status?.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Handle confirm delete
  const handleConfirmDelete = (complaint) => {
    setSelectedComplaint(complaint);
    setShowConfirmModal(true);
  };

  // Load complaints on component mount
  useEffect(() => {
    fetchComplaints();
  }, []);

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Delete Complaints
            </h1>
            <p className="text-gray-600 text-lg">Loading your complaints...</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border rounded-xl p-4">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trash2 className="text-red-600 mr-3" size={40} />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Delete Complaints
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Manage and remove your pending complaints
          </p>

        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center space-x-3">
              <XCircle className="text-red-500 flex-shrink-0" size={24} />
              <div className="flex-1">
                <h3 className="text-red-800 font-semibold">Error</h3>
                <p className="text-red-600">{error}</p>
              </div>
              <button 
                onClick={() => setError("")}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                <XCircle size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search complaints by description, type, or location..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-12 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* No Complaints */}
        {filteredComplaints.length === 0 && !loading && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <FileText className="mx-auto text-gray-400 mb-6" size={64} />
            <h3 className="text-gray-700 font-semibold text-xl mb-3">
              {searchTerm || filterStatus !== 'all' ? 'No Matching Complaints' : 'No Complaints Found'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'You haven\'t submitted any complaints yet.'
              }
            </p>
            <button
              onClick={() => router.push("/user-profile/register-complaint")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Register New Complaint
            </button>
          </div>
        )}

        {/* Complaints List */}
        <div className="space-y-6">
          {filteredComplaints.map((complaint) => (
            <div key={complaint._id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Status Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText size={20} />
                    <span className="font-semibold capitalize">
                      {complaint.issueType?.replace('-', ' ') || 'Issue'}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(complaint.status)}`}>
                    {complaint.status || 'Unknown'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Complaint Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Complaint Details</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700 leading-relaxed">{complaint.description}</p>
                      
                      {complaint.assignedDepartment && (
                        <div className="flex items-center text-sm text-gray-600">
                          <User size={16} className="mr-2" />
                          <span>Assigned to: {complaint.assignedDepartment}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Timeline & Location</h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={16} className="mr-2 text-blue-500" />
                        <div>
                          <p className="font-medium">Submitted: {formatDate(complaint.createdAt)}</p>
                          <p>Updated: {formatDate(complaint.updatedAt)}</p>
                        </div>
                      </div>

                      {complaint.location?.address && (
                        <div className="flex items-start text-sm text-gray-600">
                          <MapPin size={16} className="mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>{complaint.location.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image Preview */}
                {complaint.imageUrl && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Evidence</h3>
                    <div className="rounded-xl overflow-hidden border h-45 w-100">
                      <img
                        src={complaint.imageUrl}
                        alt="Complaint evidence"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => router.push(`/user-profile/track-complaint?id=${complaint._id}`)}
                    className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>

                  {canDeleteComplaint(complaint) ? (
                    <button
                      onClick={() => handleConfirmDelete(complaint)}
                      disabled={deleteLoading === complaint._id}
                      className="flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {deleteLoading === complaint._id ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-500 px-4 py-2">
                      <AlertTriangle size={16} />
                      <span className="text-sm">Cannot delete - {complaint.status}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Confirm Delete Modal */}
        {showConfirmModal && selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="text-red-600" size={24} />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  Delete Complaint?
                </h3>
                
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete this complaint? This action cannot be undone.
                </p>
                
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Issue: {selectedComplaint.issueType?.replace('-', ' ')}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {selectedComplaint.description}
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteComplaint(selectedComplaint._id)}
                    disabled={deleteLoading === selectedComplaint._id}
                    className="flex-1 bg-red-600 text-white px-4 py-3 rounded-xl hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
                  >
                    {deleteLoading === selectedComplaint._id ? (
                      <Loader2 className="animate-spin mr-2" size={16} />
                    ) : (
                      <Trash2 className="mr-2" size={16} />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}