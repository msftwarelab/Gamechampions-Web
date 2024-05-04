import React from "react";
import Slider from "react-slick";

function PreviousItem(props) {
  const { onClick } = props;
  return <div className="carousel-track_prev" onClick={onClick}></div>;
}

function NextItem(props) {
  const { onClick } = props;
  return <div className="carousel-track_next" onClick={onClick}></div>;
}
const Carousel = ({ children }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextItem />,
    prevArrow: <PreviousItem />,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 930,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return <Slider {...settings}>{children}</Slider>;
};

export default Carousel;
