'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import Link from 'next/link'
import { useRouter} from 'next/navigation'

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const getUserDetails = async () => {
        try {
            const response = await axios.post("/api/users/profile")
            console.log(response.data.data._id);
            setData(response.data.data._id);
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            router.push("/login");
        } catch (error) {
           console.log(error.message) 
        }  
    }

  return (
    <div>
        <h1>Profile Page</h1>
        <hr />
        <h2>
            {data === "nothing" ? "Did not get User Data": <Link href={`/user-profile/${data}`} >{data}</Link>}
        </h2>
        
        <button onClick={logout} className='bg-green-500 text-white rounded-lg border-2 border-black p-4'>
            Logout
        </button>
        <button onClick={getUserDetails} className='bg-blue-500 text-white rounded-lg border-2 border-black p-4'>
            Get User Details
        </button>
    </div>
  )
}

