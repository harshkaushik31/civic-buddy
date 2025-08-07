import React from 'react';
import FAQ from './FAQ';

const FAQSection = () => {
  const faqs = [
    {
      question: "How to use this component?",
      answer: "To use this component, you need to import it in your project and use it in your JSX code.",
    },
    {
      question: "Are there any other components available?",
      answer: "Yes, there are many other components available in this library.",
    },
    {
      question: "Are components responsive?",
      answer: "Yes, all components are responsive and can be used on different screen sizes.",
    },
    {
      question: "Can I customize the components?",
      answer: "Yes, you can customize the components by passing props to them.",
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
