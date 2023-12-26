import React, { useEffect, useState } from 'react'
import { Disclosure, Menu } from '@headlessui/react'
import { ChevronDownIcon, ChevronRightIcon, FilterIcon, SearchIcon, ViewGridIcon, XIcon } from '@heroicons/react/solid'
import Link from 'next/link';

interface Category{
  id: number;
  name: string;
  image: string;

}

export default function CategoryFilter() {
    const [category, setCategory] = useState<Category[]>([]);
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
          options: [        ]
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
      const selectedOption = newState.find(option => option.name === value);
      if (selectedOption) {
        selectedOption.current = true;
        setSortOptions(newState);
      }
      
    } 
    
    useEffect(() => {
      window.addEventListener('resize', () => {
        const viewport = window.innerWidth
        if(viewport >= 1024) return setOpenFilter(true)
      })
    })
 
return (
    <div>
    <div className="col-span-full  pb-6 flex flex-col sm:flex-row  justify-end space-y-5 sm:space-y-0 border-b border-gray-200">        
          <div className="flex  space-x-5 end-0">                              
            <Menu as="div" className="flex-shrink-0 relative">           
              <Menu.Button className="inline-flex items-center text-base text-gray-400 font-semibold hover:text-gray-700">
                Sort by
                <ChevronDownIcon className="ml-2 w-5 h-5" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-4 p-2 w-40 flex flex-col rounded-md shadow-2xl bg-white origin-top-right">
                {sortOptions.map(option => (
                  <Menu.Item key={option.name}>
                    {({ active }) => (
                      <a href={option.href} 
                        className={`p-1 block rounded ${active ? "bg-gray-50" : option.current ? "bg-blue-50 text-blue-500" : "bg-transparent text-gray-400"} text-base font-medium whitespace-nowrap`}
                        onClick={() => sortBy(option.name)}
                      >
                        {option.name}
                      </a>
                    )}
                  </Menu.Item>
                ))
                }
              </Menu.Items>
            </Menu>
            

<select id="underline_select" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
    <option selected>Choose a country</option>
    <option value="US">United States</option>
    <option value="CA">Canada</option>
    <option value="FR">France</option>
    <option value="DE">Germany</option>
</select>

            {/* :::Display option */}
            <button className="text-gray-400 hover:text-blue-400">
              <ViewGridIcon className="w-6 h-6" />
            </button>
            {/* :::Filter button (small devices) */}
            <button className="lg:hidden text-gray-400 hover:text-blue-400" onClick={() => setOpenFilter(!openFilter)}>
              <FilterIcon className="w-6 h-6" />
            </button>
          </div>
        </div>    
        <div className={`lg:hidden absolute inset-0 bg-gray-500 bg-opacity-75 ${openFilter ? "visible" : "invisible"}`} />
                <div className={`col-span-1 absolute top-0 right-0 lg:inset-0 lg:relative w-full h-full max-h-full max-w-xs overflow-y-scroll lg:overflow-auto bg-gray-50 transition-all duration-300 ease-in-out transform ${openFilter ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>

          {/* ::Title (small devices) */}
          <div className="lg:hidden py-5 px-5 flex items-center justify-between border-b border-gray-200">
            <h3 className="text-2xl text-gray-700 font-semibold">Filters</h3>
            <button className="text-gray-400 hover:text-gray-700" onClick={() => setOpenFilter(false)}>
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* ::Input Search (small devices) */}
          <div className="lg:hidden relative m-5">
              {/* ::::label */}
              <label htmlFor="search" className="sr-only">Search</label>
              {/* ::::input */}
              <input type="search" id="search" name="search"
                placeholder="search"
                className="form-input pl-11 pr-5 w-44 block shadow-sm rounded-full border-gray-300 bg-gray-50 text-sm placeholder-gray-300 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
              />
              {/* ::::icon */}
              <span className="absolute top-1/2 left-3 text-gray-400 transform -translate-y-1/2">
                <SearchIcon className="w-4 h-4" />
              </span>
            </div>                   

          {/* ::Filters */}
          <div>
          {filters.map((section) => (
    <Disclosure as="div" key={section.id} className="border-b border-gray-200">
      {({ open }) => (
        <div className={`py-5 pl-5 pr-3 flex flex-col ${open && "bg-blue-50"}`}>
          <Disclosure.Button className="group flex items-center justify-between">
            <span className="text-base text-gray-700 font-semibold">{section.name}</span>
            <ChevronRightIcon
              className={`w-6 h-6 ${open ? "transform rotate-90" : "text-gray-400 group-hover:text-gray-700 "}`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="mt-5 flex flex-col">
            {section.id === "category" && (
              /* :::Filters category */
              <>
                {category.map((cat, index) => (
                  <div key={index} className="m-1 flex items-center space-x-3">
                    <Link     key={cat.id} href={`/category/${cat.id}`} className="text-base text-gray-700 font-semibold hover:text-orange-400">
                      {cat.name}
                    </Link>
                    <img src={`http://localhost:5001/images/category/${cat.image}`} alt={cat.name} className="w-8 h-8 rounded-full" />
                  </div>
                ))}
              </>
            )}
            {/* :::Filters color */}
            {section.id === "color" && (
              <Disclosure.Panel className="mt-5 flex flex-wrap items-center">
                {section.options.map((option) => (
                  <div className="m-2" key={option.value}>
                    <label htmlFor={option.label} className="sr-only">{`Color ${option.label}`}</label>
                    <input
                      type="checkbox"
                      name={option.label}
                      id={option.label}
                      defaultValue={option.value}
                      defaultChecked={option.checked}
                      className={`form-checkbox w-6 h-6 rounded-full border-none  focus:ring-gray-200`}
                      />
                  </div>
                ))}
              </Disclosure.Panel>
            )}
            {/* :::Filters size */}
            {section.id === "size" && (
              <Disclosure.Panel className="mt-5 flex flex-col">
                {section.options.map((option) => (
                  <div className="m-1 flex items-center space-x-3" key={option.value}>
                    <div>
                      <label htmlFor={option.label} className="sr-only">{`Color ${option.label}`}</label>
                      <input
                        type="checkbox"
                        name={option.label}
                        id={option.label}
                        defaultValue={option.value}
                        defaultChecked={option.checked}
                        className="form-checkbox h-5 w-5 border-gray-300 rounded text-blue-400 focus:ring-blue-400"
                      />
                    </div>
                    <span className="text-base text-gray-700">{option.label}</span>
                  </div>
                ))}
              </Disclosure.Panel>
            )}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  ))}
          </div>
        </div>   
    </div>    
    )
} 