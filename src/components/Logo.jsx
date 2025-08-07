import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { assets } from '../../assets/assets'

const Logo = () => {
  return (
    <div>
         <Link href={`/`}>
          <div className="flex flex-row">
            <Image src={assets.emblem} alt="" height={40} />
            <p className="text-xl ml-2 mt-1 text-gray-200">Civic Buddy</p>
          </div>
        </Link>
    </div>
  )
}

export default Logo