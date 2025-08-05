import Image from "next/image";
import React from "react";
import { assets } from "../../assets/assets";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <div className="flex bg-gray-500 justify-between items-center">
        <div className="flex">
          <Image src={assets.emblem} alt="emblem" height={40} className="m-2" />
          <h1 className="text-xl pt-3 text-white">Civic Buddy</h1>
        </div>

        <div >
          <ul className="flex flex-row gap-4 text-white m-4">
            <li>
              <Link href={`/`}>Home</Link>
            </li>
            <li>
              <Link href={`/about-us`}>About Us</Link>
            </li>
            <li>
              <Link href={`/contact-us`}>Contact Us</Link>
            </li>
            <li>
              <Link href={`/login`} className="border border-white p-2 rounded-sm cursor-pointer" >Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
