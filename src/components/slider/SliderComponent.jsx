import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/saat.jpeg";
import img2 from "../../assets/bayi.png";
import img3 from "../../assets/bayi2.png";
import "./SliderComponent.css";

const images = [img1, img2, img3];

function SliderComponent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`slide-${index}`}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderComponent;
