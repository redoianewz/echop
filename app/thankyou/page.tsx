import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '@/public/images/slider/attachment.jpg';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-1 rounded shadow-lg bg-gradient-to-r from-purple-500 via-green-500 to-blue-500 to-indigo-500 to-pink-500  to-red-500 to-yellow-500 to-gray-500 to-gray-600 to-gray-700 to-gray-800 to-gray-900">
        <div className="flex flex-col items-center p-4 space-y-2 bg-white">
          <div className="flex items-center">
            <img src="/images/slider/attachment.jpg" alt="attachment" />
          </div>
          <p 
            className="text-xl font-semibold  text-gray-800"           
          >We thank you for your trust and purchase from us and we hope you enjoy our products.</p>
          <Link href={'/shop'}
            className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring ">
            <span className="text-sm font-medium mr-3">continue to shopping</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
    </div>
  );
}
