'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post("/api/users/profile");
      setData(response.data.data);
      
    } catch (error) {
      console.log("Error fetching user details:", error);
      setError(error.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  // Log data whenever it changes
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      console.log("Updated data state:", data);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
        <hr className="mb-4" />
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading user data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
        <hr className="mb-4" />
        <div className="text-red-600">
          <p>Error: {error}</p>
          <button 
            onClick={getUserDetails}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <hr className="mb-4" />
      
      {Object.keys(data).length === 0 ? (
        <h2 className="text-lg text-gray-600">Did not get User Data</h2>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">User Information:</h2>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <p><strong>ID:</strong> {data._id || 'N/A'}</p>
            <p><strong>Name:</strong> {data.name || 'N/A'}</p>
            <p><strong>Email:</strong> {data.email || 'N/A'}</p>
            <p><strong>Role:</strong> {data.role || 'N/A'}</p>
            <p><strong>Complaints:</strong> {data.complaints ? data.complaints.length : 0}</p>
          </div>
          
          {/* Debug section - TODO: remove in production */}
          <details className="mt-6">
            <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
              View Raw Data (Debug)
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  )
}