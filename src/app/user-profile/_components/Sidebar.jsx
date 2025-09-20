import React from 'react'

function Sidebar({response}) {
  console.log("Sidebar received response:", response);
  
  return (
    <div className="p-4 bg-gray-100 h-[100vh]">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold">User Information:</h3>
        {response ? (
          <div className="mt-2 space-y-1">
            <p><strong>Name:</strong> {response.name || 'Not provided'}</p>
            <p><strong>Email:</strong> {response.email || 'Not provided'}</p>
            <p><strong>Role:</strong> {response.role || 'Not provided'}</p>
            <p><strong>ID:</strong> {response._id || 'Not provided'}</p>
            <p><strong>Complaints:</strong> {response.complaints ? response.complaints.length : 0}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>

      {/*TODO: Debug section - remove this in production */}
      <div className="mt-4 p-2 bg-yellow-100 rounded-lg border border-black text-xs">
        <strong>Debug - Full Response:</strong>
        <pre className="mt-1 whitespace-pre-wrap">
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default Sidebar