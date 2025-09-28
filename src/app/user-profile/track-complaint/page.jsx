"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Search, AlertCircle, CheckCircle, Clock, FileText, Calendar, MapPin, User } from "lucide-react";

export default function Page() {
  const [trackingId, setTrackingId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const getDataFromBackend = async (complaintId) => {
    if (!complaintId.trim()) {
      setError("Please enter a valid tracking ID");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      
      const res = await axios.post("/api/users/track-complaint", {
        complaintId: complaintId.trim(),
      });
      
      console.log(res.data.complaint);
      setData(res.data.complaint);
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message || 
        "Complaint not found or invalid tracking ID"
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getDataFromBackend(trackingId);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Track Your Complaint
          </h1>
          <p className="text-gray-600 text-lg">
            Enter your complaint tracking ID to view the current status
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="trackingId" className="block text-sm font-semibold text-gray-700 mb-2">
                Complaint Tracking ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="trackingId"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter your complaint tracking ID (e.g., 68d616b8b55c022990f0dbfa)"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  disabled={loading}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading || !trackingId.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Tracking...</span>
                </>
              ) : (
                <>
                  <Search size={20} />
                  <span>Track Complaint</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center space-x-3">
              <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-red-800 font-semibold">Error</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {hasSearched && !data && !loading && !error && (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-gray-700 font-semibold text-lg mb-2">No Complaint Found</h3>
            <p className="text-gray-500">Please check your tracking ID and try again.</p>
          </div>
        )}

        {/* Complaint Details */}
        {data && (
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <h2 className="text-2xl font-bold mb-2">Complaint Status</h2>
                <div className="flex items-center space-x-2">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(data.status)}`}>
                    {data.status || 'Unknown'}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-blue-500" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Submitted On</p>
                      <p className="text-gray-900">{formatDate(data.createdAt)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="text-green-500" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Last Updated</p>
                      <p className="text-gray-900">{formatDate(data.updatedAt)}</p>
                    </div>
                  </div>
                </div>
                
                {data.escalationCount !== undefined && (
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="text-orange-500" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Escalation Count</p>
                      <p className="text-gray-900">{data.escalationCount}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Complaint Details */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complaint Details</h3>
              
              <div className="space-y-4">
                {data.issueType && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Issue Type</p>
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {data.issueType}
                    </span>
                  </div>
                )}
                
                {data.description && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
                    <p className="text-gray-900 leading-relaxed">{data.description}</p>
                  </div>
                )}
                
                {data.assignedDepartment && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Assigned Department</p>
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {data.assignedDepartment}
                    </span>
                  </div>
                )}
                
                {data.location && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-red-500 flex-shrink-0 mt-1" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Location</p>
                      <p className="text-gray-900">{data.location.address || 'Address not provided'}</p>
                      {data.location.latitude && data.location.longitude && (
                        <p className="text-sm text-gray-500">
                          Coordinates: {data.location.latitude.toFixed(6)}, {data.location.longitude.toFixed(6)}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Image */}
            {data.imageUrl && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Attached Image</h3>
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src={data.imageUrl} 
                    alt="Complaint evidence" 
                    className="w-full h-auto max-h-96 object-cover"
                  />
                </div>
              </div>
            )}

            {/* Raw Data (Debug) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <details>
                  <summary className="text-lg font-bold text-gray-900 cursor-pointer hover:text-blue-600 mb-4">
                    Raw Data (Debug)
                  </summary>
                  <pre className="bg-gray-50 p-4 rounded-xl text-sm overflow-auto border">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}