'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { assets } from '../../assets/assets';
import Logo from './Logo';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex items-center border mx-4 max-md:w-full justify-between max-md:justify-between border-slate-700 px-6 py-4 rounded-full text-white text-sm relative">
      
      <Logo/>

      <div className="hidden md:flex items-center gap-6 ml-7">
        {['Home', 'About', 'Privacy','Contact'].map((item) => (
          <Link key={item} href={item === 'Home'?'/':`${item.toLowerCase()}`} className="relative overflow-hidden h-6 group">
            <span className="block group-hover:-translate-y-full transition-transform duration-300">{item}</span>
            <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">{item}</span>
          </Link>
        ))}
      </div>

      <div className="hidden ml-14 md:flex items-center gap-4">
        
       <Link href={`/login`}>
 <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
          Login
        </button>

       </Link>
             </div>

      <button onClick={toggleMenu} className="md:hidden text-gray-600">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isMobileMenuOpen && (
        <div className="absolute top-48 text-base left-0 bg-black w-full flex-col items-center gap-4 flex z-10">
          {['Home', 'About', 'Privacy','Contact'].map((item) => (
            <Link key={item} className="" href={item === 'Home'?'/':`${item.toLowerCase()}`} >
              {item}
            </Link>
          ))}
          <Link href={`login`}>

          <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
            Login
          </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
