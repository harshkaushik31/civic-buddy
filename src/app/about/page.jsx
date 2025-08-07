import AboutUs from '@/components/AboutUs'
import Navbar from '@/components/Navbar'
import React from 'react'

const Page = () => {
  return (
    <div className='bg-gray-900 h-[100vh] pt-4'>
      <Navbar/>
      <AboutUs/>
    </div>
  )
}

export default Page