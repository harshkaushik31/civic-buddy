import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex items-center justify-center bg-green-400">
      <div className="border border-gray-300 rounded-2xl bg-white max-w-[750px] p-4 m-4 my-24">
        <div className="m-4">
          <h1 className="text-xl">Have a complaint againt the Government?</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            quia sit itaque cupiditate magnam ab rem adipisci dicta voluptatibus
            fugiat, autem ex tenetur consequuntur.
          </p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            sed sit voluptates.
          </p>
        </div>
        <Link
          href={`/login`}
          className="border border-white bg-black text-white hover:text-black hover:bg-white hover:border-black m-8 p-2 rounded-md cursor-pointer"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Hero;
