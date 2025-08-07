import AboutUs from '@/components/AboutUs'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import TeamMembers from '@/components/TeamMembers'
import React from 'react'

const Page = () => {
  return (
    <div className='bg-gray-900 pt-4'>
      <Navbar/>
      <AboutUs/>
      <TeamMembers/>
      <FAQSection/>
      <Footer/>
    </div>
  )
}

export default Page