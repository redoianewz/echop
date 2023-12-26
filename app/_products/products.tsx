'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart ,faStar} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Products({slidestoShow}) {
  const [products, setProducts] = useState([]);
  const [hoveredProducts, setHoveredProducts] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectsize, setSelectsize] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  

  const getShopignCart = () => {
    // Fetch the cart data and update the state
    fetch('http://localhost:5001/api/shoppingCart')
      .then((res) => res.json())
      .then((data) => {
        setCart(data); // Update the cart state
      })
      .catch((error) => {
        console.error('Error fetching shopping cart:', error);
      });
  };
  const getShopignWishlist = () => {
    // Fetch the cart data and update the state
    fetch('http://localhost:5001/api/wishlist')
      .then((res) => res.json())
      .then((data) => {
        setWishlist(data); // Update the cart state
      })
      .catch((error) => {
        console.error('Error fetching shopping cart:', error);
      });
  };
  useEffect(() => {
    getShopignCart();  
  } , []);  
  useEffect(() => {
    getShopignWishlist();  
  } , []);
  const settings = {  
      dots: true ,
      infinite: true,
      speed: 500,
      slidesToShow: slidestoShow,
      slidesToScroll: 2,
      rows: 2,
      autoplaySpeed: 2000,
      autoplay: true,                 
    };
    
  const fetchProducts = () => {
    fetch("http://localhost:5001/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };



  const handleProductHover = (productId: any) => {
    setHoveredProducts((prevHoveredProducts) => ({
      ...prevHoveredProducts,
      [productId]: true,
    }));
  };

  const handleProductLeave = (productId: any) => {
    setHoveredProducts((prevHoveredProducts) => ({
      ...prevHoveredProducts,
      [productId]: false,
    }));
  };

  useEffect(() => {
    fetchProducts();
  }, []);


const addProductToCart = (productId,price) => {
  const requestBody = {
    productId,
    quantity: 1, 
    price: price,
  };
    console.log('Request body:', requestBody);

    fetch('http://localhost:5001/api/shoppingCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Add to cart:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const addProductToWishlist = (productId,price) => {
    const requestBody = {
      productId,
      quantity: 1, 
      price: price,
    };
      console.log('Request body:', requestBody);
  
      fetch('http://localhost:5001/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Add to wishlist:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
  const deleteProductFromWishlist = (idshopcartItem) => {
    fetch(`http://localhost:5001/api/wishlist/${idshopcartItem}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'yourUserId', // Replace with the actual user ID or identifier
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {       
        getShopignWishlist();
        window.location.reload();
        // Refresh the shopping cart after deletion
      })
      .catch((error) => {
        console.error('Error deleting product from cart:', error);
      });
  };
  const deleteProductFromCart = (idshopcartItem) => {
    fetch(`http://localhost:5001/api/shoppingCart/${idshopcartItem}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'yourUserId', // Replace with the actual user ID or identifier
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {       
        getShopignCart();
        window.location.reload();
        // Refresh the shopping cart after deletion
      })
      .catch((error) => {
        console.error('Error deleting product from cart:', error);
      });
  };


  
  return (
    // <div className="mx-auto sm:px-6 sm:py-8 lg:max-w-4xl">
    //   <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    //     {paginatedProducts.map((product) => (
          
    //         <div 
    //           className="group relative bg-white p-2 border border-gray-200 rounded-md shadow-md"
    //           onMouseEnter={() => handleProductHover(product.id)}
    //           onMouseLeave={() => handleProductLeave(product.id)}
    //         >
    //           <Link href={`/products/${product.id}`}>
    //           <div className="aspect-h-3 h-10 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40 relative">
                
    //             <p className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md">New</p>
    //             <Image
    //               src={
    //                 hoveredProducts[product.id]
    //                   ? `http://localhost:5001/images/products/${product.image}`
    //                   : `http://localhost:5001/images/products/${product.images}`
    //               }
    //               width={180}
    //               height={40}
    //               alt={product.name}
    //             />
                
    //           </div>
    //           <div className="mt-4 flex justify-between flex-col h-full">
    //             <div className="mb-2">                        
    //               <span className="text-xs text-gray-500">{product.category_name}</span>
                  
    //               <h3 className="text-xs text-gray-700">                    
    //                   <span aria-hidden="true" className="absolute inset-0" />
    //                 <a href="#">{product.name}</a>                     
    //               </h3>                
    //               <div className="flex items-end justify-between">
    //                 <p className="text-xs font-medium text-gray-900">{product.sale_price}</p>
    //                 <p className="text-xs line-through text-gray-500">{product.regular_price}</p>
    //                 <div className="flex space-x-2">
    //                 <button
    //                     onClick={(e) => handleAddToCart(product.id, e)} 
    //                     className="text-xs text-gray-500"
    //                   >
    //                     <FontAwesomeIcon                          
    //                       icon={faCartShopping}
    //                       className="text-orange-500 border bg-green-100 text-lg border-green-400 rounded-full p-2"
    //                     />
    //                   </button>
    //                   <FontAwesomeIcon
    //                     icon={faHeart}
    //                     className="text-orange-500 border bg-green-100 text-lg border-green-400 rounded-full p-2"
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           </Link>
    //         </div>
          
    //     ))}
    //   </div>      
    //   <div className="flex justify-center mt-4 space-x-2">
    //     {pages.map((page) => (
    //       <button
    //         key={page}
    //         onClick={() => handlePageChange(page)}
    //         className={`px-3 py-1 rounded-md ${
    //           currentPage === page ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-700'
    //         }`}
    //       >
    //         {page}
    //       </button>
    //     ))}
    //   </div>
    // </div>
    <div className="my-8">
    <Slider {...settings}>
      {products.map((product, index) => (
        <div key={index} 
        onMouseEnter={() => handleProductHover(product.id)}
        onMouseLeave={() => handleProductLeave(product.id)}
        className="mt-2"
        >
          <div      className="block  bg-white p-4 rounded-md transition duration-300 hover:shadow-lg focus:outline-none w-56">     
          <Link href={`/product/${product.id}`}>
            <div className="aspect-h-3 h-10 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40 relative w-48">
            <p className="absolute -top-1 -left-1 bg-orange-500 text-white px-2 py-1 rounded-md">New</p>

              <Image
                src={
                  hoveredProducts[product.id]
                    ? `http://localhost:5001/images/products/${product.image}`
                    : `http://localhost:5001/images/products/${product.images}`
                }
                width={180}
                height={40}
                alt={product.name}
              />
            </div>
              </Link>
              <span className="text-xs text-gray-500">{product.category_name}</span>
              <h3 className="mt-1 text-sm font-medium text-gray-900">{product.name}</h3>
              <p className="mt-1 text-xs text-gray-700"><span>{product.sale_price}dh</span>  - <span className='text-base font-normal text-gray-500 line-through dark:text-gray-400'>{product.regular_price}dh</span> </p>                       
              <div>
                <div className="text-start">
                  <ul className="flex mb-4 mr-2 lg:mb-0">
                                  <li>                                    
                                  <FontAwesomeIcon icon={faStar} className='text-yellow-400' />                                  
                                  </li>
                                  <li>                                      
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-400' />                                    
                                  </li>
                                  <li>                                      
                                      <FontAwesomeIcon icon={faStar} className='text-yellow-400' />                                       
                                  </li>
                                  <li>                                      
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-400' />                                    
                                  </li>
                                  <li>                                      
                                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                              fill="currentColor"
                                              className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                              viewBox="0 0 16 16">
                                              <path
                                                  d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                          </svg>                                   
                                  </li>
                  </ul>
                </div>
                <div className="text-end">
                  {wishlist.map((wishlistItem) => {
                      const isInWishlist = wishlistItem.items.some((item) => item.product_id === product.id);

                      return (
                        (isInWishlist ? (                          
                          <FontAwesomeIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => deleteProductFromWishlist(wishlistItem.items.map((item) => item.item_id))}
                            title='Remove from wishlist'
                            icon={faHeart}                      
                            className="text-black mr-1  border text-end bg-green-100 text-lg border-green-400 rounded-full p-2"
                            />                                           
                        ) : (
                          <Link href='#' key={wishlistItem.wishlist_id}>
                          <FontAwesomeIcon
                            onClick={() => addProductToWishlist(product.id, product.sale_price)}
                            style={{ cursor: 'pointer' }}
                            icon={faHeart}                      
                            className="text-orange-500 mr-1  border text-end bg-green-100 text-lg border-green-400 rounded-full p-2"
                            />
                        </Link> 
                        )
                      )
                        )
                    })  
                }
                  {cart.map((cartItem) => {
                      const isInCart = cartItem.items.some((item) => item.product_id === product.id);

                      return (
                        (isInCart ? (

                          <FontAwesomeIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => deleteProductFromCart(cartItem.items.map((item) => item.item_id))}
                            title='Remove from cart'
                            icon={faCartShopping}                      
                            className="text-black mr-1  border text-end bg-green-100 text-lg border-green-400 rounded-full p-2"
                            />                                           
                        ) : (
                          <Link href='/cart' key={cartItem.cart_id}>
                          <FontAwesomeIcon
                            onClick={() => addProductToCart(product.id, product.sale_price)}
                            style={{ cursor: 'pointer' }}
                            icon={faCartShopping}                      
                            className="text-orange-500 mr-1  border text-end bg-green-100 text-lg border-green-400 rounded-full p-2"
                            />
                        </Link> 
                        )
                      )
                        )
                    })}
                </div>
              </div>                                                    
              
          </div>            
        </div>
       
      ))}
    </Slider>
  </div>
  );
}