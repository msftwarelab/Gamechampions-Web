import React from "react";

const TestimonialCard = ({ summary, thumbnail, username }) => {
  return (
    <div className="testimonial-card">
      <div dangerouslySetInnerHTML={{ __html: summary }}></div>
      <div className="testimonial__profile">
        <img
          src={thumbnail.imageUrl}
          alt={thumbnail.alternateText}
          title={thumbnail.title}
        />
        <p>{username}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
