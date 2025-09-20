"use client";
import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "./_components/Sidebar";
import axios from "axios";
import LoadingPage from "@/components/Loading";

function layout({ children }) {
  const [response, setResponse] = useState({
    _id: "",
    name: "",
    email: "",
    role: "citizen",
    complaints: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      
      let responseFromBackend;
      try {
        responseFromBackend = await axios.post("/api/users/profile");
      } catch (postError) {
        console.log("POST failed:", postError.message);
      }
      
      console.log("Full response:", responseFromBackend);
      
      if (responseFromBackend.data && responseFromBackend.data.data) {
        const responseData = responseFromBackend.data.data;
        setResponse(responseData);
        console.log("User name:", responseData.name);
        console.log("Full user data:", responseData);
      } else {
        console.error("Unexpected response structure:", responseFromBackend.data);
        setError("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError(error.message || "Failed to fetch user details");
      
      // Logging more details about the error
      if (error.response) {
        console.error("Error status:", error.response.status);
        console.error("Error data:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  // Log response whenever it changes
  useEffect(() => {
    if (response._id) {
      console.log("Updated response state:", response);
    }
  }, [response]);

  if (loading) {
    return <LoadingPage/> ;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={getUserDetails}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <div className="md:w-64 fixed hidden md:block">
        <Sidebar response={response} />
      </div>
      <div className="md:ml-64">{children}</div>
    </div>
  );
}

export default layout;