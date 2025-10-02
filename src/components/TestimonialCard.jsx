export const TestimonialCard = ({ testimonial, index, cardRefs, onMouseMove, onMouseLeave, tooltip }) => (
  <div
    className="relative border border-gray-200 rounded-lg overflow-hidden max-w-sm hover:shadow-lg transition-shadow duration-300"
  >
    

    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 text-white">
        <h3 className="text-lg font-semibold text-white">{testimonial.mainTitle}</h3>
        <p className="my-4 text-sm line-clamp-3">{testimonial.message}</p>
      </div>
      <div className="flex items-center justify-center">
        <img
          className="rounded-full w-9 h-9"
          src={testimonial.image}
          alt={`${testimonial.name} profile`}
        />
        <div className="space-y-0.5 font-medium text-left ml-3">
          <p>{testimonial.name}</p>
          <p className="text-sm text-gray-200">{testimonial.title}</p>
        </div>
      </div>
    </div>
  </div>
);