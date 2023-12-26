'use client';
import React, { useState,useEffect } from 'react';
import Sliders from './home/_slider/slider';
import Products from './_products/products';
import Category from './_category/category';
;





export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState([]);




  const handleFilter = (filterType: string) => {
    // Implement your filtering logic here
    // For now, I'm setting filteredProducts to an empty array
    setFilteredProducts([]);
  };
  const features = [
    { icon: 'feature-1.png', title: 'Free Shipping', description: 'on all orders', color: 'bg-blue-200', textColor: 'text-blue-800' },
    { icon: 'feature-2.png', title: 'Online Order', description: 'easy and fast', color: 'bg-green-200', textColor: 'text-green-800' },
    { icon: 'feature-3.png', title: 'Save Money', description: 'best deals', color: 'bg-yellow-200', textColor: 'text-yellow-800' },
    { icon: 'feature-4.png', title: 'Promotions', description: 'check out our offers', color: 'bg-purple-200', textColor: 'text-purple-800' },
    { icon: 'feature-5.png', title: 'Happy Sell', description: 'customer satisfaction', color: 'bg-pink-200', textColor: 'text-pink-800' },
    { icon: 'feature-6.png', title: '24/7 Support', description: 'contact us anytime', color: 'bg-orange-200', textColor: 'text-orange-800' },
  ];
    
return (
    <div>
      <Sliders />      
      <div className="flex justify-around items-center py-8">
        {features.map((feature, index) => (
          <a
            key={index}
            className={`text-center ${feature.color} p-4 rounded-lg transition duration-300 hover:shadow-lg focus:outline-none`}
          >
            <img src={`/images/feature/${feature.icon}`} alt={feature.title} className="mx-auto mb-2" />
            <button className={`text-lg font-bold ${feature.textColor} transition duration-300 hover:${feature.textColor} hover:bg-gray-300`}>{feature.title}</button>
            <p>{feature.description}</p>
          </a>
        ))}
      </div>  
      <div className='m-5'>
        <Products  slidestoShow={6} />
      </div>
      <div className="lg:w-1/2 ml-12 lg:pr-4">
            <h2 className="text-2xl  font-semibold mb-4">Subscribe to Our Newsletter</h2>
        </div>
      <Category />              
    </div>
  );
}
