"use client";
import React from "react";

const AboutUs = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4 py-16">
      <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
        <img
          className="max-w-md w-full object-cover rounded-2xl"
          src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=451&h=451&auto=format&fit=crop"
          alt="Office team"
        />
          
      </div>

      <div className="text-sm max-w-lg">
        <h1 className="text-xl uppercase font-semibold text-white">
          What we do?
        </h1>
        <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF]"></div>
        <p className="mt-8 text-white">
          PrebuiltUI helps you build faster by transforming your design vision
          into fully functional, production-ready UI components.
        </p>
        <p className="mt-4 text-white">
          Whether you're launching a SaaS app, landing page, or dashboard, our
          collection of Tailwind CSS components is crafted to boost your
          development speed and improve user experience.
        </p>
        <p className="mt-4 text-white">
          From UI design systems to automation-ready layouts, PrebuiltUI
          empowers you to build beautifully and scale effortlessly.
        </p>
        
      </div>
    </section>
  );
};

export default AboutUs;
