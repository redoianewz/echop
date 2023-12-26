'use client';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import React, { useState,useEffect } from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';

// Define NextArrow outside of the product component
function NextArrow(props:any) {
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

// Define PrevArrow outside of the product component
function PrevArrow(props:any) {
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

export default function page() {
  const [product, setProduct] = useState([]);
  const [hoveredProducts, setHoveredProducts] = useState({});
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    rows: 2,
    autoplaySpeed: 2000,
    autoplay: true,    
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const fetchproduct = () => {
    fetch("http://localhost:5001/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }
  useEffect(() => {
    fetchproduct();
  }, []);
  const handleProductHover = (productId: any) => {
    setHoveredProducts((prevHoveredProducts) => ({
      ...prevHoveredProducts,
      [productId]: true,
    }));
  };

  const handleProductLeave = (productId: any) => {
    setHoveredProducts((prevHoveredProducts) => ({
      ...prevHoveredProducts,
      [productId]: false,
    }));
  };

  return (
    <div className="my-8">
      <Slider {...settings}>
        {product.map((product, index) => (
          <div key={index} 
          onMouseEnter={() => handleProductHover(product.id)}
          onMouseLeave={() => handleProductLeave(product.id)}
          className="mt-2"
          >
            <div      className="block  bg-white p-4 rounded-md transition duration-300 hover:shadow-lg focus:outline-none w-56">     
            <Link href={`/products/${product.id}`}>
              <div className="aspect-h-3 h-10 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40 relative w-48">
                <Image
                  src={
                    hoveredProducts[product.id]
                      ? `http://localhost:5001/images/products/${product.image}`
                      : `http://localhost:5001/images/products/${product.images}`
                  }
                  width={180}
                  height={40}
                  alt={product.name}
                />
              </div>
                </Link>
                <span className="text-xs text-gray-500">{product.category_name}</span>
                <h3 className="mt-1 text-sm font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-xs text-gray-700"><span>{product.price}dh</span>  - <span className='text-base font-normal text-gray-500 line-through dark:text-gray-400'>{product.regular_price}dh</span> </p>         
                <div className="text-end">
                    <FontAwesomeIcon
                        icon={faHeart}
                        
                        className="text-orange-500 mr-1  border text-end bg-green-100 text-lg border-green-400 rounded-full p-2"
                      />
                    <FontAwesomeIcon
                        icon={faHeart}
                        className="text-orange-500 border  bg-green-100 text-lg border-green-400 rounded-full p-2"
                       
                      />
                </div>
            </div>            
          </div>
         
        ))}
      </Slider>
    </div>
  );
}
