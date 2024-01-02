import React from 'react'

export default function page() {
  return (
    <div className="mb-10">
      <div className="mb-4">
        <header className="relative bg-blue-gray-800 pb-36">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
              alt=""
            />
            <div
              className="absolute inset-0 bg-blue-gray-800 mix-blend-multiply"
              aria-hidden="true"
            ></div>
          </div>
          <div className="relative mx-auto mt-24 max-w-md px-6 pb-32 sm:max-w-3xl md:mt-32 lg:max-w-7xl lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Support
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-blue-gray-300">
              Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate
              id malesuada non. Cras aliquet purus dui laoreet diam sed lacus,
              fames. Dui, amet, nec sit pulvinar.
            </p>
          </div>
        </header>

        <main>
          <div className="bg-blue-gray-50">
            <section
              className="relative z-10 mx-auto -mt-32 max-w-md px-6 sm:max-w-3xl lg:max-w-7xl"
              aria-labelledby="contact-heading"
            >
              <h2 className="sr-only" id="contact-heading">
                Contact us
              </h2>
              <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
                <div className="flex flex-col rounded-2xl bg-white shadow-xl">
                  <div className="relative flex-1 px-6 pt-16 pb-8 md:px-8">
                    <div className="absolute top-0 inline-block -translate-y-1/2 transform rounded-xl bg-blue-600 p-5 shadow-lg">
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-blue-gray-900">
                      Sales
                    </h3>
                    <p className="mt-4 text-base text-blue-gray-500">
                      Varius facilisi mauris sed sit. Non sed et duis dui leo,
                      vulputate id malesuada non. Cras aliquet purus dui laoreet
                      diam sed lacus, fames.
                    </p>
                  </div>
                  <div className="rounded-bl-2xl rounded-br-2xl bg-blue-gray-50 p-6 md:px-8">
                    <a
                      href="#"
                      className="text-base font-medium text-blue-700 hover:text-blue-600"
                    >
                      Contact us
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                </div>

                <div className="flex flex-col rounded-2xl bg-white shadow-xl">
                  <div className="relative flex-1 px-6 pt-16 pb-8 md:px-8">
                    <div className="absolute top-0 inline-block -translate-y-1/2 transform rounded-xl bg-blue-600 p-5 shadow-lg">
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-blue-gray-900">
                      Technical Support
                    </h3>
                    <p className="mt-4 text-base text-blue-gray-500">
                      Varius facilisi mauris sed sit. Non sed et duis dui leo,
                      vulputate id malesuada non. Cras aliquet purus dui laoreet
                      diam sed lacus, fames.
                    </p>
                  </div>
                  <div className="rounded-bl-2xl rounded-br-2xl bg-blue-gray-50 p-6 md:px-8">
                    <a
                      href="#"
                      className="text-base font-medium text-blue-700 hover:text-blue-600"
                    >
                      Contact us
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                </div>

                <div className="flex flex-col rounded-2xl bg-white shadow-xl">
                  <div className="relative flex-1 px-6 pt-16 pb-8 md:px-8">
                    <div className="absolute top-0 inline-block -translate-y-1/2 transform rounded-xl bg-blue-600 p-5 shadow-lg">
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-blue-gray-900">
                      Media Inquiries
                    </h3>
                    <p className="mt-4 text-base text-blue-gray-500">
                      Varius facilisi mauris sed sit. Non sed et duis dui leo,
                      vulputate id malesuada non. Cras aliquet purus dui laoreet
                      diam sed lacus, fames.
                    </p>
                  </div>
                  <div className="rounded-bl-2xl rounded-br-2xl bg-blue-gray-50 p-6 md:px-8">
                    <a
                      href="#"
                      className="text-base font-medium text-blue-700 hover:text-blue-600"
                    >
                      Contact us
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="mx-auto max-w-md divide-y-2 divide-blue-gray-200 py-24 px-6 sm:max-w-3xl lg:max-w-7xl lg:py-32 lg:px-8"
              aria-labelledby="faq-heading"
            >
              <h2
                className="text-3xl font-bold tracking-tight text-blue-gray-900"
                id="faq-heading"
              >
                Frequently asked questions
              </h2>
              <div className="mt-6 pt-10">
                <dl className="space-y-10 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-8 md:gap-y-12 md:space-y-0">
                  <div>
                    <dt className="text-lg font-medium text-blue-gray-900">
                      What&#039;s the best thing about Switzerland?
                    </dt>
                    <dd className="mt-2 text-base text-blue-gray-500">
                      I don&#039;t know, but the flag is a big plus. Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Quas
                      cupiditate laboriosam fugiat.
                    </dd>
                  </div>

                  <div>
                    <dt className="text-lg font-medium text-blue-gray-900">
                      Why do you never see elephants hiding in trees?
                    </dt>
                    <dd className="mt-2 text-base text-blue-gray-500">
                      Because they&#039;re so good at it. Lorem ipsum dolor sit
                      amet consectetur adipisicing elit. Quas cupiditate
                      laboriosam fugiat.
                    </dd>
                  </div>

                  <div>
                    <dt className="text-lg font-medium text-blue-gray-900">
                      How do you make holy water?
                    </dt>
                    <dd className="mt-2 text-base text-blue-gray-500">
                      You boil the hell out of it. Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Quas cupiditate laboriosam
                      fugiat.
                    </dd>
                  </div>

                  <div>
                    <dt className="text-lg font-medium text-blue-gray-900">
                      Why can&#039;t you hear a pterodactyl go to the bathroom?
                    </dt>
                    <dd className="mt-2 text-base text-blue-gray-500">
                      Because the pee is silent. Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Quas cupiditate laboriosam
                      fugiat.
                    </dd>
                  </div>

                  <div>
                    <dt className="text-lg font-medium text-blue-gray-900">
                      What do you call someone with no body and no nose?
                    </dt>
                    <dd className="mt-2 text-base text-blue-gray-500">
                      Nobody knows. Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Quas cupiditate laboriosam fugiat.
                    </dd>
                  </div>

                  <div>
                    <dt className="text-lg font-medium text-blue-gray-900">
                      Why did the invisible man turn down the job offer?
                    </dt>
                    <dd className="mt-2 text-base text-blue-gray-500">
                      He couldn&#039;t see himself doing it. Lorem ipsum dolor
                      sit amet consectetur adipisicing elit. Quas cupiditate
                      laboriosam fugiat.
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
          </div>

          <section className="relative bg-white" aria-labelledby="join-heading">
            <div
              className="absolute inset-x-0 hidden h-1/2 bg-blue-gray-50 lg:block"
              aria-hidden="true"
            ></div>
            <div className="mx-auto max-w-7xl bg-blue-600 lg:bg-transparent lg:px-8">
              <div className="lg:grid lg:grid-cols-12">
                <div className="relative z-10 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:bg-transparent lg:py-16">
                  <div
                    className="absolute inset-x-0 h-1/2 bg-blue-gray-50 lg:hidden"
                    aria-hidden="true"
                  ></div>
                  <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-none lg:p-0">
                    <div className="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
                      <img
                        className="rounded-3xl object-cover object-center shadow-2xl"
                        src="https://images.unsplash.com/photo-1507207611509-ec012433ff52?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div className="relative bg-blue-600 lg:col-span-10 lg:col-start-3 lg:row-start-1 lg:grid lg:grid-cols-10 lg:items-center lg:rounded-3xl">
                  <div
                    className="absolute inset-0 hidden overflow-hidden rounded-3xl lg:block"
                    aria-hidden="true"
                  >
                    <svg
                      className="absolute bottom-full left-full translate-y-1/3 -translate-x-2/3 transform xl:bottom-auto xl:top-0 xl:translate-y-0"
                      width="404"
                      height="384"
                      fill="none"
                      viewBox="0 0 404 384"
                      aria-hidden="true"
                    >
                      <defs>
                        <pattern
                          id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                          x="0"
                          y="0"
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <rect
                            x="0"
                            y="0"
                            width="4"
                            height="4"
                            className="text-blue-500"
                            fill="currentColor"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="404"
                        height="384"
                        fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                      />
                    </svg>
                    <svg
                      className="absolute top-full -translate-y-1/3 -translate-x-1/3 transform xl:-translate-y-1/2"
                      width="404"
                      height="384"
                      fill="none"
                      viewBox="0 0 404 384"
                      aria-hidden="true"
                    >
                      <defs>
                        <pattern
                          id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                          x="0"
                          y="0"
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <rect
                            x="0"
                            y="0"
                            width="4"
                            height="4"
                            className="text-blue-500"
                            fill="currentColor"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="404"
                        height="384"
                        fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                      />
                    </svg>
                  </div>
                  <div className="relative mx-auto max-w-md space-y-6 py-12 px-6 sm:max-w-3xl sm:py-16 lg:col-span-6 lg:col-start-4 lg:max-w-none lg:p-0">
                    <h2
                      className="text-3xl font-bold tracking-tight text-white"
                      id="join-heading"
                    >
                      Join our team
                    </h2>
                    <p className="text-lg text-white">
                      Varius facilisi mauris sed sit. Non sed et duis dui leo,
                      vulputate id malesuada non. Cras aliquet purus dui laoreet
                      diam sed lacus, fames.
                    </p>
                    <a
                      className="block w-full rounded-md border border-transparent bg-white py-3 px-5 text-center text-base font-medium text-blue-700 shadow-md hover:bg-blue-gray-50 sm:inline-block sm:w-auto"
                      href="#"
                    >
                      Explore open positions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <section className="text-gray-600 body-font relative">
        <div className="absolute inset-0 bg-gray-300">          
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3419105.406698964!2d-7.0151353215705345!3d33.18865450891454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d29ce1f4c311%3A0x1143d4a6af00527e!2z2K_YsdioINi52YXYsdiMINin2YTYr9in2LEg2KfZhNio2YrYttin2KE!5e0!3m2!1sar!2sma!4v1704206899559!5m2!1sar!2sma"
            width="100%"
            height="100%"
            className='border-rounded'            
          ></iframe>
        </div>
        <div className="container px-5 py-24 mx-auto flex">
          <div className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
              <div className="text-white relative px-4 py-10 bg-indigo-400 shadow-lg sm:rounded-3xl sm:p-20">
                <div className="text-center pb-6">
                  <h1 className="text-3xl">Contact Us!</h1>

                  <p className="text-gray-300">
                    Fill up the form below to send us a message.
                  </p>
                </div>

                <form>
                  <input
                    className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Name"
                    name="name"
                  />

                  <input
                    className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="Email"
                    name="email"
                  />

                  <input
                    className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Subject"
                    name="_subject"
                  />

                  <textarea
                    className="shadow mb-4 min-h-0 appearance-none border rounded h-64 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Type your message here..."
                    name="message"
                    style={{ height: "121px;" }}
                  ></textarea>

                  <div className="flex justify-between">
                    <input
                      className="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      value="Send ➤"
                    />
                    <input
                      className="shadow bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="reset"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
