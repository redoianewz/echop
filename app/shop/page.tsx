'use client';

import React, { useEffect, useState } from 'react'
import { Disclosure, Menu } from '@headlessui/react'
import { ChevronDownIcon, ChevronRightIcon, FilterIcon, SearchIcon, ViewGridIcon, XIcon } from '@heroicons/react/solid'
import Products from '../_products/products';
import CategoryFilter from '../_components/filterShop';



const CategoryFilter1 = () => {
  const [category, setCategory] = useState([]);
  const fetchCategory = () => {
    fetch("http://localhost:5001/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  }
  useEffect(() => {
    fetchCategory();
  }, []);
  const [openFilter, setOpenFilter] = useState(true)
  const [sortOptions, setSortOptions] = useState([
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Newest', href: '#', current: false },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
  ])
  const filters = [
    {
        id: 'category',
        name: 'category',
    },    
    {
      id: 'color',
      name: 'Color',
      options: [
        { value: 'black', label: 'Black', class: 'bg-black text-black', checked: false },
        { value: 'white', label: 'Yellow', class: 'bg-yellow-400 text-yellow-400', checked: false },
        { value: 'blue', label: 'Blue', class: 'bg-blue-400 text-blue-400', checked: true },
        { value: 'brown', label: 'Purple', class: 'bg-purple-400 text-purple-400', checked: false },
        { value: 'green', label: 'Green', class: 'bg-green-400 text-green-400', checked: false },
        { value: 'purple', label: 'Red', class: 'bg-red-400 text-red-400', checked: false },
      ],
    },
    {
      id: 'size',
      name: 'Size',
      options: [
        { value: 'XS', label: 'XS', checked: false },
        { value: 'SM', label: 'SM', checked: false },
        { value: 'M', label: 'M', checked: false },
        { value: 'L', label: 'L', checked: false },
        { value: 'XL', label: 'XL', checked: false },
        { value: 'XXL', label: 'XXL', checked: true },
      ],
    },
  
  ]

  const sortBy = (value:any) => {
    let newState = [...sortOptions]
    newState.map(option => option.current = false)
    newState.find(option => option.name === value).current = true
    setSortOptions(newState)
  } 
  
  useEffect(() => {
    window.addEventListener('resize', () => {
      const viewport = window.innerWidth
      if(viewport >= 1024) return setOpenFilter(true)
    })
  })
  

  return (
    <div className="relative mx-auto py-8 sm:py-16 px-4 w-full max-w-7xl">
      <div className="grid grid-cols-4 gap-y-8 gap-x-4">
          <CategoryFilter />      
        <div className=" col-span-full lg:col-span-3 w-full max-w-9xl">    
          <Products slidestoShow={4} />                 
        </div>
      </div>
    </div>
  )
}

export default CategoryFilter1
