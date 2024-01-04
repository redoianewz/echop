import React, { useState } from "react";
import Slider from "react-slick";

const Sliders = () => {
  const images = [
    "images/slider/slider-1.png",
    "images/slider/slider-2.png",
    "images/slider/btn-brush-bg.png",
  ];

  const slides = [
    {
      topTitle: "Top Title 1",
      title: "Slider Title 1",
      subTitle: "Slider Subtitle 1",
      offer: "Slider Offer 1",
    },
    {
      topTitle: "Top Title 2",
      title: "Slider Title 2",
      subTitle: "Slider Subtitle 2",
      offer: "Slider Offer 2",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentSlideContent = slides[currentSlide];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
    beforeChange: (oldIndex:any, newIndex:any) => setCurrentSlide(newIndex),
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className="single-hero-slider single-animation-wrap w-full bg-gray-100"
        >
          <div className="container mx-auto">
            <h4 className="animated text-6xl">{slide.topTitle}</h4>
            <div className="flex flex-wrap items-center">
              <div className="lg:w-5/12 md:w-6/12">
                <div className="hero-slider-content-2">
                  <h2 className="animated text-4xl font-extrabold">
                    {slide.title}
                  </h2>
                  <h1 className="animated text-5xl font-extrabold text-brand">
                    {slide.subTitle}
                  </h1>
                  <p className="animated">{slide.offer}</p>
                </div>
                <a
                  href="#"
                  className="animated inline-block mt-4 px-8 py-3 text-black rounded-full"
                  style={{
                    backgroundImage: `url(${images[index]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  Shop Now
                </a>
              </div>
              <div className="lg:w-7/12 md:w-6/12">
                <div className="single-slider-img single-slider-img-1 mb-16">
                  <img
                    className="animated w-full"
                    src={images[index]}
                    alt={`Slider Title ${index + 1}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Sliders;
