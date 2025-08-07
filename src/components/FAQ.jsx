'use client'
import React, { useState } from 'react';

const FAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-xl mx-auto flex flex-col items-center justify-center px-4 md:px-0">
      <p className="text-white text-sm font-medium">FAQ's</p>
      <h1 className="text-3xl font-semibold text-center text-white">Looking for answer?</h1>
      <p className="text-sm text-white mt-2 pb-8 text-center">
        Ship Beautiful Frontends Without the Overhead — Customizable, Scalable and Developer-Friendly UI Components.
      </p>

      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-slate-200 py-4 cursor-pointer w-full"
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base text-white font-medium">{faq.question}</h3>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${openIndex === index ? 'rotate-180' : ''} transition-all duration-500 ease-in-out`}
            >
              <path
                d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                color='white'
              />
            </svg>
          </div>
          <p
            className={`text-sm text-white transition-all duration-500 ease-in-out max-w-md ${
              openIndex === index
                ? 'opacity-100 max-h-[300px] translate-y-0 pt-4'
                : 'opacity-0 max-h-0 -translate-y-2'
            }`}
          >
            {faq.answer}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
