import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer className="flex flex-col md:flex-row gap-3 items-center justify-around w-full py-4 text-sm bg-slate-800 text-white/70">
        <p>Copyright © 2025 CivicBuddy. All rights reservered.</p>

        <div className="flex items-center gap-4">
          <Link href={`/contact`} className="hover:text-white transition-all">
            Contact Us
          </Link>

          <div className="h-8 w-px bg-white/20"></div>

          <Link href={`/privacy`} className="hover:text-white transition-all">
            Privacy Policy
          </Link>

          <div className="h-8 w-px bg-white/20"></div>

          <Link href={'/about'} className="hover:text-white transition-all">
            About
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
