"use client";
import { assets } from "../../assets/assets";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const toggleRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const toggleBtn = toggleRef.current;
    const navMenu = navRef.current;

    const handleToggle = () => {
      navMenu.classList.toggle("hidden");
    };

    toggleBtn.addEventListener("click", handleToggle);
    return () => {
      toggleBtn.removeEventListener("click", handleToggle);
    };
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 font-medium relative z-10 backdrop-blur-md">
        {/* Logo */}
        <Link href={`/`}>
          <div className="flex flex-row">
            <Image src={assets.emblem} alt="" height={40} />
            <p className="text-xl ml-2 mt-1 text-gray-200">Civic Buddy</p>
          </div>
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          ref={toggleRef}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Nav Links */}
        <ul
          ref={navRef}
          className="hidden max-md:absolute top-full left-0 max-md:w-full md:flex md:items-center gap-8 max-md:bg-white max-md:shadow-md max-md:px-6 max-md:py-4 flex-col md:flex-row z-50"
        >
          {["Home", "About", "Privacy", "Contact"].map((item, i) => (
            <li key={i}>
              <Link
                className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition"
                href={item === 'Home'?'/':item.toLowerCase()}
              >
                {item}
              </Link>
            </li>
          ))}
          {/* Login button for mobile */}
          <Link href={`login`} className="block md:hidden mt-4">
            <button className="group flex items-center gap-2">
              Log In
              <svg
                className="group-hover:translate-x-1 transition pt-0.5"
                width="12"
                height="9"
                viewBox="0 0 12 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Link>
        </ul>

        {/* Login button for desktop */}
        <div>
          <Link href={`login`}>
            <button className="group hidden md:flex items-center gap-2">
          Log In
          <svg
            className="group-hover:translate-x-1 transition pt-0.5"
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="h-[580px] flex flex-col items-center justify-center px-4 text-center">
        

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl text-white">
          Have a complaint againt the Government?
        </h1>
        <p className="max-w-xl text-center mt-6 px-4">
          Unlock potential with tailored strategies designed for success.
          Simplify challenges, maximize results, and stay ahead in the
          competitive market.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link href={`/login`} >
          <button className="px-7 py-3 rounded-xl cursor-pointer bg-transparent border border-white text-white font-medium">
            Get Started Now
          </button>
          </Link>
          <Link href={`/about`}>
            <button className="group px-7 py-2.5 flex items-center gap-2 font-medium">
            Learn more
            <svg
              className="group-hover:translate-x-1 transition pt-0.5"
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
