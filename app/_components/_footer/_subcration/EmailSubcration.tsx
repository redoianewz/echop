// EmailSubscription.jsx
import React from 'react';

const EmailSubscription = () => {
  return (
    <div className="relative">
      <div
        className="absolute left-0 right-0 h-1/2 bg-warm-gray-50 "
        aria-hidden="true"
      ></div>
      <div className="relative mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-[1200px] lg:px-8">
        <div className="rounded-3xl bg-gradient-to-l from-orange-600 to-orange-500 to-orange-400 to-orange-300 py-10 px-6 sm:py-16 sm:px-12 lg:flex lg:items-center lg:py-9 lg:px-20">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Sign up for our newsletter
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-cyan-100">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              Lorem cupidatat commodo. Elit sunt amet fugiat.
            </p>
          </div>
          <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
            <form className="sm:flex">
              <label className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                required
                className="w-full rounded-md border-white px-5 py-3 placeholder-warm-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-cyan-700"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-green-400 px-5 py-3 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-cyan-700 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
              >
                Notify me
              </button>
            </form>
            <p className="mt-3 text-sm text-cyan-100">
              We care about the protection of your data. Read our
              <a href="#" className="font-medium text-white underline">
                Privacy Policy.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSubscription;
