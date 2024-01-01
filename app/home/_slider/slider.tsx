import React, { useState } from 'react';

const Sliders = () => {
  const image = 'images/slider/slider-1.png';
  const image2 = 'images/slider/slider-2.png';  
  const image3 = "images/slider/btn-brush-bg.png";

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const slides = [
    {
      topTitle: 'Top Title 1',
      title: 'Slider Title 1',
      subTitle: 'Slider Subtitle 1',
      offer: 'Slider Offer 1',
    },
    {
      topTitle: 'Top Title 2',
      title: 'Slider Title 2',
      subTitle: 'Slider Subtitle 2',
      offer: 'Slider Offer 2',
    },
  ];

  const currentSlideContent = slides[currentSlide];

  return (
    <section className="home-slider relative pt-20">
      <div className="hero-slider-1 flex dot-style-1 dot-style-1-position-1">
        <div className="single-hero-slider single-animation-wrap w-full bg-gray-100">
          <div className="container mx-auto">
            <h4 className="animated text-6xl">
              {currentSlideContent.topTitle}
            </h4>
            <div className="flex flex-wrap items-center">
              <div className="lg:w-5/12 md:w-6/12">
                <div className="hero-slider-content-2">
                  <h2 className="animated text-4xl font-extrabold">
                    {currentSlideContent.title}
                  </h2>
                  <h1 className="animated text-5xl font-extrabold text-brand">
                    {currentSlideContent.subTitle}
                  </h1>
                  <p className="animated">{currentSlideContent.offer}</p>
                </div>
                <a
                  href="#"
                  className="animated inline-block mt-4 px-8 py-3 text-black rounded-full"
                  style={{
                    backgroundImage: `url(${image2})`,
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
                    src={
                      currentSlide === 0
                        ? image
                        : currentSlide === 1
                        ? image2
                        : image2
                    }
                    alt={`Slider Title ${currentSlide + 1}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="slider-arrow hero-slider-1-arrow">
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full"
          onClick={prevSlide}
        >
          {`< Prev`}
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full"
          onClick={nextSlide}
        >
          {`Next >`}
        </button>
      </div>
    </section>
  );
};

export default Sliders;
