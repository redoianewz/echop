// navbar/page.jsx
'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-dropdown-select';
import { Disclosure, Menu } from '@headlessui/react'
import { ChevronRightIcon,} from '@heroicons/react/solid'
import PageDropb from '@/app/menu/page';
import { useAuth } from "@clerk/nextjs";
import Link from 'next/link';
const Navbar = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
 

  
  return (
    <nav className="text-black p-4 flex justify-between items-center h-20 text-xl font-mono">
      <ul className="flex space-x-12 mx-auto">
          <PageDropb                    
          />
        <li>
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
        </li>
        <li>
          <Link href="/shop" className="hover:text-orange-500">
            Shop
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-orange-500">
            About
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-orange-500">
            Contact
          </Link>
        </li>
        {isSignedIn && (
        <li>        
        <Link href='/orders'
         className="hover:text-orange-500">
          Orders
        </Link>
        </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
