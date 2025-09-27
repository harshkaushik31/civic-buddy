"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const complaintId = "68d616b8b55c022990f0dbfa";

  const [data, setData] = useState();

  const getDataFromBackend = async () => {
    try {
      const res = await axios.post("/api/users/track-complaint", {
        complaintId,
      });
      console.log(res.data.complaint);
      setData(res.data.complaint);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataFromBackend();
  }, []);

  return (
    <div>
      
      {data && 
      <div>
        <img src={data.imageUrl} alt="Complaint image" className="h-200 w-200"/>
      </div>
      }

      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
    </div>
  );
}
