"use client";

import React, { useEffect, useState } from "react";
import Products from "../_products/products";
import CategoryFilter from "../_components/filterShop";
const apiURL = process.env.NEXT_PUBLIC_API_URL;
const CategoryFilter1 = () => {
  const [category, setCategory] = useState([]);
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
    <div className="relative mx-auto py-8 sm:py-16 px-4 w-full max-w-7xl">
      <div className="grid grid-cols-4 gap-y-8 gap-x-4">
        <CategoryFilter />
        <div className=" col-span-full lg:col-span-3 w-full max-w-9xl">
          <Products slidestoShow={4} />
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter1;
