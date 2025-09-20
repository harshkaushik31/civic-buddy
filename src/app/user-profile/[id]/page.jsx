'use client'
import React from 'react'
import Header from '../_components/Header'

export default function page({params}) {
  const unwrappedParams = React.use(params);
  
  return (
    <div>
      <Header/>
      <h1>Profile Page</h1>
      <h2>{unwrappedParams.id}</h2>
    </div>
  )
}