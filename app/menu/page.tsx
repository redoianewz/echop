'use client';
import React,{useState,useEffect,createRef} from "react";
import { createPopper } from "@popperjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';


// ... (previous imports)
interface Category{
  id: number;
  name: string;
  image: string;
  description: string;
}

const PageDropdown = () => {
  const [popoverShow, setPopoverShow] = useState(false);
  const btnRef = createRef<HTMLButtonElement>();
  const popoverRef = createRef<HTMLDivElement>();  
  const [category, setCategory] = useState<Category[]>([]);

  const fetchCategory = () => {
    fetch("https://bachen-eco.onrender.com/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  };

  useEffect(() => {
    fetchCategory();

    // Add event listener to close popover on outside click
    const handleClickOutside = (event:MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(event.target as Node)
      ) {
        setPopoverShow(false);
      }
    };

    // Add the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openPopover = () => {
    if (btnRef.current && popoverRef.current) {
      createPopper(btnRef.current, popoverRef.current, {
        placement: "bottom"
      });
      setPopoverShow(true);
    }
  };
  

  const closePopover = () => {      
    setPopoverShow(false);
  };

  const handleCategoryClick = () => {
    // Close the popover when a category is clicked
    closePopover();
  }; 
    return (
      <>
        <div className="flex flex-wrap" style={{ marginTop: -8 + "px" }} >
          <div className="w-full text-center">
          <button
            className=" text-black active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => {
              popoverShow ? closePopover() : openPopover();
            }}           
            ref={btnRef}
          >
            <FontAwesomeIcon icon={faList} className="mr-4" />
            Category
          </button>
          <div
            className={
              (popoverShow ? "" : "hidden ") +
              "bg-blueGray-600 border-0 mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
            }
            ref={popoverRef}
          >

              <div className="bg-white">
                <div className="bg-white text-black opacity-75 font-semibold p-3 mb-0 border-b border-solid border-blueGray-100 uppercase rounded-t-lg hover:text-orange-500">
                  Categories
                </div>
                <div className="text-black p-3 flex flex-wrap gap-6">
                  {category.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 mb-3 text-black w-full md:w-1/2 lg:w-1/6 hover:text-orange-500"
                    >
                      
                        <Link
                         key={category.id}
                        href={`/category/${category.id}`}onClick={handleCategoryClick}>
                          <img
                            src={
                              "https://bachen-eco.onrender.com/images/category/" +
                              category.image
                            }
                            alt={category.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <div className="font-semibold">
                              {category.name}
                            </div>
                            <div className="text-xs">
                              {category.description}
                            </div>
                          </div>
                        </Link>
                     
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default PageDropdown;
  
