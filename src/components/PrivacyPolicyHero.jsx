import React from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <section className="text-white flex flex-col items-center px-4">
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl text-center font-semibold max-w-3xl mt-5 mb-5 bg-gradient-to-r from-white to-[#748298] text-transparent bg-clip-text">
        Our Privacy Policy
      </h1>

      {/* Description */}
      <p className="text-slate-300 md:text-base  max-md:px-2 text-center max-w-7xl mt-3">
        At Civic Buddy, your privacy and trust are extremely important to us.
        This Privacy Policy explains in detail how we collect, use, and
        safeguard your personal information when you use our platform to report
        civic or municipal issues. By accessing our services, you agree to the
        practices described below.
      </p>

      <div className="text-slate-300 md:text-base  max-md:px-2 text-center max-w-7xl mt-3">
        <strong>1. Information We Collect</strong>
        <br />
        We collect only the information necessary to provide and improve our
        services:
        <ul className="list-disc list-inside text-left mt-2">
          <li>
            Personal details such as your name, email address, or phone number
            (if you choose to provide them).
          </li>
          <li>
            Location information to accurately forward your report to the
            correct government authority.
          </li>
          <li>
            Details about the issue being reported, including photos or
            descriptions.
          </li>
          <li>
            Technical data like browser type, device type, and IP address for
            security and optimization purposes.
          </li>
        </ul>
      </div>
      <div className="text-slate-300 md:text-base  max-md:px-2 text-center max-w-7xl mt-3">
        <strong>2. How We Use Your Information</strong>
        <br />
        The information you provide is used strictly for the following purposes:
        <ul className="list-disc list-inside text-left mt-2">
          <li>
            To forward your report to the relevant government body or authority.
          </li>
          <li>To keep you updated about the status of your complaint.</li>
          <li>
            To improve the efficiency, accuracy, and reliability of our
            platform.
          </li>
          <li>To maintain security and prevent misuse of the platform.</li>
        </ul>
      </div>
      <p className="text-slate-300 md:text-base  max-md:px-2 text-center max-w-7xl mt-3">
        <strong>3. Data Sharing</strong>
        <br />
        We do not sell, rent, or trade your personal data with third parties for
        marketing purposes. However, your information may be shared:
        <ul className="list-disc list-inside text-left mt-2">
          <li>
            With the appropriate government authorities to address your report.
          </li>
          <li>
            With trusted service providers who help us operate and improve our
            platform (under strict confidentiality agreements).
          </li>
          <li>If required by law, regulation, or legal process.</li>
        </ul>
      </p>

      <p className="text-slate-300 md:text-base  max-md:px-2 text-center max-w-7xl mt-3">
        <strong>4. Data Security</strong>
        <br />
        We use industry-standard encryption and security measures to protect
        your data. While no system is completely secure, we regularly update our
        infrastructure and practices to minimize risks and ensure your
        information is protected against unauthorized access.
      </p>

      <p className="text-slate-300 md:text-base max-md:px-2 text-center max-w-7xl mt-3">
        <strong>5. Your Rights</strong>
        <br />
        You have the right to:
        <ul className="list-disc list-inside text-left mt-2">
          <li>
            Access and review the personal information you have shared with us.
          </li>
          <li>Request corrections or updates to your information.</li>
          <li>
            Request deletion of your data, subject to legal and operational
            requirements.
          </li>
          <li>Opt out of receiving non-essential notifications or emails.</li>
        </ul>
      </p>

      <p className="text-slate-300 md:text-base max-md:px-2 text-center max-w-7xl mt-3">
        <strong>6. Changes to This Policy</strong>
        <br />
        Civic Buddy may update this Privacy Policy from time to time to reflect
        changes in laws, technology, or our practices. The latest version will
        always be available on our website, and significant updates will be
        communicated to users.
      </p>
      <p className="text-slate-300 md:text-base max-md:px-2 text-center max-w-7xl mt-3">
        <strong>7. Contact Us</strong>
        <br />
        If you have any questions, concerns, or feedback regarding this Privacy
        Policy, please contact us at: <br />
        <a
          href="mailto:support@civicbuddy.org"
          className="text-indigo-400 underline"
        >
          support@civicbuddy.org
        </a>
      </p>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-8 text-sm">
        <Link href={`/login`}>
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-full">
            Get Started
          </button>
        </Link>
        <Link href={`/about`}>
          <button className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-6 py-3">
            <span>Learn More</span>
            <svg
              className="mt-0.5"
              width="6"
              height="8"
              viewBox="0 0 6 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.25.5 4.75 4l-3.5 3.5"
                stroke="currentColor"
                strokeOpacity=".4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
