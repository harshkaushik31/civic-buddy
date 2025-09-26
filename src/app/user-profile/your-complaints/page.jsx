'use client'
import { useEffect, useState } from "react"
import Card from "../_components/Card"
import axios from "axios"

export default function Page() {
  const [resp, setResp] = useState(null) 

  const getDataFromBackend = async () => {
    try {
      const response = await axios.get("/api/users/your-complaints")
      setResp(response.data) 
    } catch (error) {
      console.error("Error fetching complaints:", error)
    }
  }

  useEffect(() => {
    getDataFromBackend()
  }, [])

  return (
    <div className="flex flex-wrap gap-4">
      {resp?.complaints?.length > 0 ? (
        resp.complaints.map((complain) => (
          <Card
            key={complain._id}
            imageUrl={complain.imageUrl}
            id={complain._id}
            description={complain.description}
          />
        ))
      ) : (
        <p className="flex justify-center items-center h-[100vh] w-[100%] text-xl">No complaints found</p>
      )}
    </div>
  )
}
