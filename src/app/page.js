import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Testimonial from "@/components/Testimonial";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="lex items-center flex-col justify-between bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient-2.png')] bg-cover text-sm text-white max-md:px-4 text-center bg-gray-900 ">
    <Hero/>
    <About/>
    <Testimonial/>
    <Footer/>
    </div>
    </>
  );
}
