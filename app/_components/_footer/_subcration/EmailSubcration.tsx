// EmailSubscription.jsx
import React from 'react';

const EmailSubscription = () => {
  return (
    <div className="flex flex-nowrap min-h-max md:justify-center items-center py-12">
      <div className="w-full bg-gray-100 drop-shadow-md rounded-md">
        <div className=" flex flex-nowrap lg:flex-nowrap lg:items-center">
          <div className="lg:w-1/2 ml-12 lg:pr-4">
            <h2 className="text-2xl  font-semibold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-4">
              Get the latest updates and news delivered straight to your inbox.
            </p>            
          </div>
          <div
            className="lg:w-1/2 flex items-center justify-center lg:justify-end"
          >
            <p className="text-gray-600 mr-9">
              <span className="text-blue-500 font-semibold">Sign up now and receive DH25 coupon <br />for first shopping.</span>
            </p>
          </div>
          <form className="lg:w-1/2 flex items-center">
            {/* Your subscription form elements go here */}
            <input
              type="email"
              className="border border-gray-300 px-3 py-2 w-full rounded-md mr-2"
              placeholder="Your email"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailSubscription;
