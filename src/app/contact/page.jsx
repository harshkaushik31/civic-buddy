import React from 'react'
import Navbar from '@/components/Navbar'
import ContactForm from '@/components/ContactForm'

const page = () => {
  return (
    <div className='pt-4 bg-gray-900 h-[100vh]'>
      <Navbar/>
      <ContactForm/>
    </div>
  )
}

export default page