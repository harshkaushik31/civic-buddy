import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import PrivacyPolicyHero from '@/components/PrivacyPolicyHero'
import React from 'react'

const page = () => {
  return (
    <div className='pt-4 bg-gray-900 h-full'>
      <Navbar/>
      <PrivacyPolicyHero/>
    </div>
  )
}

export default page