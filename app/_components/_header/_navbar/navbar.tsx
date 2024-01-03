"use client";
import React, { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faList, faTimes ,faSearch} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
}

const apiURL = process.env.NEXT_PUBLIC_API_URL;
interface NavigationItem {
  name: string;
  href: string;
}
function Navbar() {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  const [category, setCategory] = useState<Category[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");


      const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
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

  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";
  const navigation: NavigationItem[] = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Orders", href: "/orders" },
  ];

   const handleSearchChange = (e: any) => {
     const query = e.target.value;
     setSearchQuery(query);
   };
  return (    
    <Disclosure as="nav" className="text-black p-2 lg:flex">
      {({ open }) => (
        <>       
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <FontAwesomeIcon
                      icon={open ? faTimes : faBars}
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="text-black active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ">
                          <FontAwesomeIcon
                            icon={faList}
                            className="mr-4 font-normal"
                          />
                          Category
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {category.map((cat) => (
                            <Menu.Item key={cat.id}>
                              {({ active }) => (
                                <a
                                  href={`/category/${cat.id}`}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "px-4 py-2 text-sm text-gray-700 flex items-center"
                                  )}
                                >
                                  <img
                                    src={`${apiURL}/images/category/${cat.image}`}
                                    alt={cat.name}
                                    className="w-6 h-6 rounded-full mr-2"
                                  />
                                  {cat.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            currentPath === item.href
                              ? "text-orange-500"
                              : "text-black hover:bg-gray-700 hover:text-orange-500",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-300 rounded-full focus:outline-none focus:border-orange-700 lg:w-[500px] xl:w-64 px-6 py-2 text-sm "
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <span className="absolute right-2 top-2 text-gray-500">
                    <Link href={`/search/${searchQuery}`}>
                      <button>
                        <FontAwesomeIcon
                          icon={faSearch}
                          className="text-2xl text-orange-500"
                        />
                      </button>
                    </Link>
                  </span>
                </div>
              </div>
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      currentPath === item.href
                        ? "text-orange-500"
                        : "text-black hover:bg-gray-700 hover:text-orange-500",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </Disclosure.Panel>                
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
