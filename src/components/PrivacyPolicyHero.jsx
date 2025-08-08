import React from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <section className="text-white flex flex-col items-center px-4">

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl text-center font-semibold max-w-3xl mt-5 mb-5 bg-gradient-to-r from-white to-[#748298] text-transparent bg-clip-text">
        Our Privay Policy
      </h1>

      {/* Description */}
      <p className="text-slate-300 md:text-base  max-md:px-2 text-center max-w-7xl mt-3">
        Unlock potential with tailored strategies designed for success. Simplify challenges,
        maximize results, and stay ahead in the competitive market.
      </p>

      <p className="text-slate-300 md:text-base  max-md:px-2 text-center max-w-7xl mt-3">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa iure accusantium beatae maxime facere corrupti dolorem, in placeat hic rerum ex similique distinctio earum numquam necessitatibus explicabo sequi exercitationem? Libero autem aliquid in eius. Magnam, iste necessitatibus? Maiores repudiandae minus sapiente qui magnam quis, porro esse facere ad, architecto odio unde, totam ea hic odit est non sunt corrupti cum?
      </p>
      <p className="text-slate-300 md:text-base  max-md:px-2 text-center max-w-7xl mt-3">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa iure accusantium beatae maxime facere corrupti dolorem, in placeat hic rerum ex similique distinctio earum numquam necessitatibus explicabo sequi exercitationem? Libero autem aliquid in eius. Magnam, iste necessitatibus? Maiores repudiandae minus sapiente qui magnam quis, porro esse facere ad, architecto odio unde, totam ea hic odit est non sunt corrupti cum?
      </p>
      <p className="text-slate-300 md:text-base  max-md:px-2 text-center max-w-7xl mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium itaque ex facilis a unde! Error fugit quae doloribus laborum alias est? Repudiandae molestiae voluptate tempora doloribus similique fugiat maiores aut eligendi quae dicta tempore quibusdam corporis unde excepturi sed reiciendis, adipisci ad culpa quis quam totam labore rem eius! Quaerat ad accusantium quae ab nisi, facere sunt quis reprehenderit porro sint laborum quo ea aliquam beatae culpa delectus deserunt amet! Dolore numquam consectetur at asperiores voluptatem labore exercitationem possimus, suscipit delectus expedita quisquam aliquam praesentium? Fuga fugit ratione voluptatem libero.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae illo eum accusamus fugiat eaque voluptatibus fugit blanditiis, officia vitae harum perferendis nesciunt. Et sit rerum, maxime, in quod animi excepturi ut dolor soluta tempora omnis saepe exercitationem corrupti ab optio eligendi numquam veritatis odit perspiciatis? Dolor nobis necessitatibus tempore praesentium? Vitae sapiente odio suscipit consequatur sed neque labore vel unde dolorum consectetur! Maxime vitae mollitia, blanditiis odit est aspernatur illum, id nihil recusandae laudantium rem laborum quia! Debitis sed possimus culpa distinctio ut officia numquam adipisci? Deleniti possimus qui id?
      </p>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-8 text-sm">
        <Link  href={`/login`}>
        <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-full">
          Get Started
        </button>
        </Link>
        <Link href={`/about`} >
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
        </button></Link>
      </div>

      
    </section>
  );
};

export default PrivacyPolicy;
