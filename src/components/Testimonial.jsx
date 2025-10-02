"use client";
import React, { useRef, useState } from "react";
import { TestimonialCard } from "./TestimonialCard";
const testimonials = [
  {
    name: "Aditya Tripthi",
    title: "Resident, New Delhi",
	mainTitle: "Easy to Use",
    message:
      "Civic Buddy made it so easy to report a broken streetlight in my area. Within days, it was fixed! The process was simple and transparent.",
    image:
      "https://res.cloudinary.com/dpcal7pun/image/upload/v1759388142/WhatsApp_Image_2025-08-05_at_10.52.21_AM_eetw5h.jpg",
  },
  {
    name: "Vaibhav Sahu",
    title: "Community Volunteer",
	mainTitle: "The Website Works",
    message:
      "I love how Civic Buddy connects people directly with the right authorities. It has helped our neighborhood stay cleaner and safer.",
    image:
      "https://res.cloudinary.com/dpcal7pun/image/upload/v1759388456/WhatsApp_Image_2025-10-02_at_12.29.11_PM_1_gx4ry6.jpg",
  },
  {
    name: "Tanmay Singh",
    title: "College Student",
	mainTitle: "Very Easy to Integerate",
    message:
      "Reporting potholes and waste management issues has never been easier. Civic Buddy saves time and actually gets results!",
    image:
      "https://res.cloudinary.com/dpcal7pun/image/upload/v1759388584/WhatsApp_Image_2025-10-02_at_12.27.54_PM_1_iwn4ur.jpg",
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
