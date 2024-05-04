import React from "react";
import Carousel from "../carousel/carousel";
import TestimonialCard from "../testimonialCard/testimonialCard";

const Testimonials = ({ title, reviews = [] }) => {
  return (
    <div className="testimonials">
      <div className="testimonials__info">
        <h2 style={{ fontWeight: 900 }}>{title}</h2>
      </div>

      <Carousel>
        {reviews.length &&
          reviews.map(({ summary, thumbnail, username }, reviewIdx) => (
            <TestimonialCard
              key={reviewIdx + username}
              summary={summary}
              thumbnail={thumbnail}
              username={username}
            />
          ))}
      </Carousel>
    </div>
  );
};

export default Testimonials;
