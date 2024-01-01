
"use client";
import React, { useState, useEffect, useContext, Attributes } from "react";
import Products from "../../_products/products";
import { Checkbox } from "@material-tailwind/react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";


const apiURL = process.env.NEXT_PUBLIC_API_URL;
interface Attribute {
  name: string;
  values: string[];
}
interface Product {
  id: number;
  name: string;
  description: string;
  short_description: string;
  regular_price: number;
  sale_price: number;
  image: string;
  images: string;
  category_name: string;
  quantity: number;
  attributes: Attribute[];
}

export default function page({ params: { productId } }: any) {
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    short_description: "",
    regular_price: 0,
    sale_price: 0,
    image: "",
    images: "",
    category_name: "",
    quantity: 0,
    attributes: [],
  });
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectsize, setSelectsize] = useState<string | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [quantity, setQuantity] = useState(1);
   const [uuid, setUuid] = useState("");

   useEffect(() => {
     const storedUuid = localStorage.getItem("deviceUuid");
     if (storedUuid) {
       setUuid(storedUuid);
     } else {
       const newUuid = uuidv4();
       setUuid(newUuid);
       localStorage.setItem("deviceUuid", newUuid);
     }
   }, []); 

  const getDataProduct = () => {
    fetch(`${apiURL}/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data[0]);       
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  };

  useEffect(() => {
    console.log("Product ID:", productId);
    if (productId) {
      getDataProduct();
    }
  }, [productId]);
  const handleThumbnailClick = (image: any) => {
    setMainImage(image);
  };
  const thumbnailImages = [product.images, product.image];

  useEffect(() => {
    setMainImage(product.image);
  }, [product.image]);

const handleAddToCart = () => {
  const requestBody = {
    uuid: uuid, // Correct the variable name to match the server-side code
    productId: product.id,
    quantity: quantity,
    price: product.sale_price,
    productAttributes: [
      ...selectedAttributes,
      { attributeId: "color", attributeValue: selectedColor },
      { attributeId: "size", attributeValue: selectsize },
    ],
  };

  fetch(`${apiURL}/api/shoppingCart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Add to cart:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};


  const handleAddToWishlist = () => {
    const requestBody = {
      uuid: uuid, // Correct the variable name to match the server-side code
      productId: product.id,
      quantity: quantity,
      price: product.sale_price,
      productAttributes: [
        ...selectedAttributes,
        { attributeId: "color", attributeValue: selectedColor },
        { attributeId: "size", attributeValue: selectsize },
      ],
    };

    fetch(`${apiURL}/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Add to cart:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <a href="#" className="hover:underline hover:text-black">
              Home
            </a>
            <span>
              <svg
                className="h-5 w-5 leading-none text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
            <a href="#" className="hover:underline hover:text-black">
              Electronics
            </a>
            <span>
              <svg
                className="h-5 w-5 leading-none text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
            <span>{product.name}</span>
          </div>
        </div>
      </div>
      <section className="py-20 overflow-hidden bg-white font-poppins dark:bg-gray-100">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 md:w-1/2 ">
              <div className="sticky top-0 z-50 overflow-hidden border border-orange-500">
                <div
                  className="relative mb-6 lg:mb-10"
                  style={{ height: "450px" }}
                >
                  <img
                    src={`${apiURL}/images/products/` + mainImage}
                    alt=""
                    className="object-contain w-full h-full"
                  />
                </div>
                <hr />
                <div className="flex-wrap hidden md:flex ">
                  {thumbnailImages.map((thumbnail, index) => (
                    <div key={index} className="w-1/2 p-2 sm:w-1/4">
                      <button
                        onClick={() => handleThumbnailClick(thumbnail)}
                        className="block border border-teal-100 dark:border-gray-700 dark:hover:border-gray-600 hover:border-teal-300"
                      >
                        <img
                          src={`${apiURL}/images/products/` + thumbnail}
                          alt=""
                          className="object-cover w-full lg:h-32"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center mt-10">
                <span className="mr-2">Category:</span>
                <h1 className=" text-2xl font-bold text-orange-500 dark:text-orange-500">
                  {product.category_name}
                </h1>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 ">
              <div className="lg:pl-20">
                <div className="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-medium text-orange-500 dark:text-orange-500">
                    New
                  </span>
                  <h2 className="max-w-xl mt-2 mb-6 text-xl font-bold dark:text-black md:text-4xl">
                    {product.name}
                  </h2>
                  <div className="flex flex-wrap items-center mb-6">
                    <ul className="flex mb-4 mr-2 lg:mb-0">
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                    <a
                      className="mb-4 text-xs underline dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0"
                      href="#"
                    >
                      Be the first to review the product
                    </a>
                  </div>
                  <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                    {product.short_description}
                  </p>
                  <div className="p-4 mb-8 border border-gray-300 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-semibold dark:text-gray-400">
                      Real time{" "}
                      <span className="px-2 bg-teal-500 text-gray-50">26</span>
                      visitors right now!{" "}
                    </h2>
                    <div className="mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">
                      {product.quantity} in stock
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5  dark:bg-gray-600">
                      <div
                        className="bg-teal-600 dark:bg-teal-400 h-2.5 rounded-full"
                        style={{
                          width: `${
                            product.quantity > 100
                              ? product.quantity / 10
                              : product.quantity
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    <span>{product.sale_price}dh</span>
                    <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400">
                      {product.regular_price} dh
                    </span>
                  </p>
                </div>
                <div className="mb-8">
                  <div className="pb-6 mb-8 border-b border-gray-300 dark:border-gray-700">
                    {product.attributes &&
                      product.attributes.map((attr, index) => (
                        <div key={index} className="mb-8">
                          <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                            {attr.name}{" "}
                          </h2>
                          {attr.name.toLowerCase() === "color" ? (
                            // Render radio buttons for color attribute with dynamic background color
                            <div className="flex flex-wrap -mb-2">
                              {attr.values.map((value, valueIndex) => (
                                <div className="inline-flex items-center">
                                  <label
                                    key={valueIndex}
                                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                                  >
                                    <input
                                      name={attr.name}
                                      value={value}
                                      type="radio"
                                      className={
                                        "before:content[''] peer relative h-10 w-11 cursor-pointer appearance-none  border border-black rounded-sm " +
                                        (value.toLowerCase() === "black"
                                          ? `bg-${value} text-${value} checked:border-${value} transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:before:bg-black checked:before:rounded-sm hover:before:opacity-10`
                                          : `bg-${value}-500 text-${value}-500 checked:border-${value}-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:before:bg-black checked:before:rounded-sm hover:before:opacity-10`)
                                      }
                                      id={value}
                                      onChange={() => setSelectedColor(value)}
                                    />
                                  </label>
                                </div>
                              ))}
                            </div>
                          ) : (
                            // Render radio buttons with the same background color as text for other attributes
                            <div className="flex flex-wrap -mb-2">
                              {attr.values.map((value, valueIndex) => (
                                <div className="inline-flex items-center">
                                  <label
                                    key={valueIndex}
                                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                                  >
                                    <input
                                      name={attr.name}
                                      type="radio"
                                      value={value}
                                      className=" peer relative h-10 w-11 cursor-pointer appearance-none  border border-black rounded-sm bg-gray-200 text-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-orange-500 checked:before:bg-black checked:before:rounded-sm hover:before:opacity-10"
                                      id={value}
                                      onChange={() => setSelectsize(value)}
                                    />
                                    <span className="absolute transition-opacity opacity-100 text-lg font-medium top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-black">
                                      {value}
                                    </span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    {selectedColor && (
                      <p className="text-lg font-medium mt-4">
                        Selected Color: {selectedColor}
                      </p>
                    )}
                    {selectsize && (
                      <p className="text-lg font-medium mt-4">
                        Selected Size: {selectsize}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center ">
                  <div className="mb-4 mr-4 lg:mb-0">
                    <div className="w-28">
                      <div className="flex items-center border-gray-100">
                        <span
                          onClick={handleDecrement}
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          -{" "}
                        </span>
                        <input
                          className="h-8 w-10 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={quantity}
                          min="1"
                          readOnly
                        />
                        <span
                          onClick={handleIncrement}
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 mr-4 lg:mb-0">
                    <button className="w-full h-10 p-2 mr-4 bg-teal-500 dark:text-gray-200 text-gray-50 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500">
                      Buy Now
                    </button>
                  </div>
                  <Link href="/cart">
                    <div className="mb-4 mr-4 lg:mb-0">
                      <button
                        onClick={handleAddToCart}
                        className="flex items-center justify-center w-full h-10 p-2 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-teal-600 hover:bg-teal-600 hover:border-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500 dark:hover:border-teal-500 dark:hover:text-gray-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-cart"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                      </button>
                    </div>
                  </Link>
                  <Link href={`/wishlist`}>
                  <div className="mb-4 lg:mb-0">
                    <button
                      onClick={handleAddToWishlist}
                      className="flex items-center justify-center w-full h-10 p-2 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-teal-600 hover:bg-teal-600 hover:border-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500 dark:hover:border-teal-500 dark:hover:text-gray-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className=" bi bi-heart"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                      </svg>
                    </button>
                  </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="m-5">
        <Products slidestoShow={6} />
      </div>
    </div>
  );
}
