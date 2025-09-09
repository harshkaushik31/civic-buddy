import React from 'react';
import FAQ from './FAQ';

const FAQSection = () => {
  const faqs = [
    {
      question: "What kind of issues can I report on Civic Buddy?",
      answer:
        "You can report common municipal problems such as potholes, streetlight outages, garbage collection, water supply issues, and other local civic concerns.",
    },
    {
      question: "Do I need to create an account to submit a complaint?",
      answer:
        "No, you can submit issues without creating an account. However, registering allows you to track your complaint status and get updates.",
    },
    {
      question: "Is my personal information shared with authorities?",
      answer:
        "Only the information necessary to resolve the complaint is shared. Your data is encrypted and never sold or used for marketing purposes.",
    },
    {
      question: "How does Civic Buddy forward my complaint?",
      answer:
        "Once you submit a report, Civic Buddy automatically routes it to the correct government department or municipal body responsible for handling it.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <div className='m-10'>
        <FAQ faqs={faqs}/>
      </div>
      
    </>
  );
};

export default FAQSection;
