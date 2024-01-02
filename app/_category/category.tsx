"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
const apiURL = process.env.NEXT_PUBLIC_API_URL;
// Define NextArrow outside of the Category component
function NextArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      {/* Use your preferred arrow icon or styling */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6 text-gray-700"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
}

// Define PrevArrow outside of the Category component
function PrevArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      {/* Use your preferred arrow icon or styling */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6 text-gray-700"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  );
}
interface Category {
  id: number;
  name: string;
  image: string;
}
export default function Category() {
  const [category, setCategory] = useState<Category[]>([]);
  const settings = {
     dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    rows: 2,
    autoplaySpeed: 2000,
    autoplay: true,
  };
  const fetchCategory = () => {
    fetch(`${apiURL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="my-8">
      <Slider {...settings}>
        {category.map((category, index) => (
          <div key={index} className="px-2 mt-2">
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="block text-center bg-white p-4 rounded-md transition duration-300 hover:shadow-lg focus:outline-none"
            >
              <div className="relative bg-white border border-gray-200 rounded-md shadow-md overflow-hidden">
                <img
                  src={`${apiURL}/images/category/` + category.image}
                  alt={category.name}
                  width={100}
                  height={100}
                  className="object-cover object-center text-center w-full h-full"
                />
              </div>
              <p className="mt-3 text-lg font-bold transition duration-300">
                {category.name}
              </p>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
