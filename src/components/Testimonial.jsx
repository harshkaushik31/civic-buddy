"use client";
import React, { useRef, useState } from "react";
import { TestimonialCard } from "./TestimonialCard";
const testimonials = [
  {
    name: "Rohit Verma",
    title: "Resident, New Delhi",
    message:
      "Civic Buddy made it so easy to report a broken streetlight in my area. Within days, it was fixed! The process was simple and transparent.",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    name: "Ananya Sharma",
    title: "Community Volunteer",
    message:
      "I love how Civic Buddy connects people directly with the right authorities. It has helped our neighborhood stay cleaner and safer.",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
  },
  {
    name: "Karan Singh",
    title: "College Student",
    message:
      "Reporting potholes and waste management issues has never been easier. Civic Buddy saves time and actually gets results!",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
  },
];

const Testimonial = () => {
	const [tooltip, setTooltip] = useState({
		visible: false,
		x: 0,
		y: 0,
		text: "",
	});
	const cardRefs = useRef([]);

	const handleMouseMove = (e, index) => {
		const bounds = cardRefs.current[index].getBoundingClientRect();
		setTooltip({
			visible: true,
			x: e.clientX - bounds.left,
			y: e.clientY - bounds.top,
			text: testimonials[index].name,
		});
	};

	const handleMouseLeave = () => {
		setTooltip((prev) => ({ ...prev, visible: false }));
	};

	return (
		<div className="py-16 px-4">
			<h1 className="text-center text-4xl font-bold text-gray-100">
				Testimonials
			</h1>
			<p className="text-center text-gray-200 mt-1">
				We have collected some testimonials from our users. They are real people
				who have used our product.
			</p>
			<div className="flex flex-wrap items-center justify-center gap-6 mt-12">
				{testimonials.map((testimonial, index) => (
					<TestimonialCard
						key={index}
						testimonial={testimonial}
						index={index}
						cardRefs={cardRefs}
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
						tooltip={tooltip}
					/>
				))}
			</div>
		</div>
	);
};

export default Testimonial;
