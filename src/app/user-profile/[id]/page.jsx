'use client'
import React from 'react'

export default function page({params}) {
  return (
    <div>
        <h1>Profile Page</h1>
        <h2>{params.id}</h2>
    </div>
  )
}

