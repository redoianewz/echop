'use client';
// searchResults.js
import React, { useState, useEffect } from 'react';
import CategoryFilter from '@/app/_components/filterShop';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart ,faStar} from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Product {
  id: number;
  name: string;
  description: string;
  regular_price: number;
  sale_price: number;
  category_name: string;
  image: string;
  images: string;
}

interface wishlist {
  wishlist_id: number;
  user_id: number;
  items: {
    item_id: number;
    product_id: number;
    quantity: number;
    price: number;
  }[];
}

interface cart {
  cart_id: number;
  user_id: number;
  items: {
    item_id: number;
    product_id: number;
    quantity: number;
    price: number;
  }[];
}

export default function SearchResults({ params: { searchQuery }} : { params: { searchQuery: string }} ) {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [hoveredProducts, setHoveredProducts] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
    const [cart, setCart] = useState<cart[]>([]);
    const [wishlist, setWishlist] = useState<wishlist[]>([]);
    const settings = {  
      dots: true ,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      rows: 1,
      autoplaySpeed: 2000,
      autoplay: true,                 
    };
  const fetchData = () => {
    // Fetch data based on searchQuery
    fetch(`http://localhost:5001/api/search/${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.result);
        // Initialize hover state for each product
        const initialHoverState = data.result.reduce((acc: any, product: any) => {
          acc[product.id] = false;
          return acc;
        }, {});
        setHoveredProducts(initialHoverState);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);
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

  
  const handleProductHover = (productId:number) => {
    setHoveredProducts((prevHoveredProducts) => ({
      ...prevHoveredProducts,
      [productId]: true,
    }));
  };

  const handleProductLeave = (productId:number) => {
    setHoveredProducts((prevHoveredProducts) => ({
      ...prevHoveredProducts,
      [productId]: false,
    }));
  };


  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  const addProductToCart = (productId:number,price:number) => {
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
    const addProductToWishlist = (productId:number,price:number) => {
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
    // const deleteProductFromWishlist = (idshopcartItem:number) => {
    //   fetch(`http://localhost:5001/api/wishlist/${idshopcartItem}`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       userId: 'yourUserId', // Replace with the actual user ID or identifier
    //     }),
    //   })
    //     .then((res) => {
    //       if (!res.ok) {
    //         throw new Error(`HTTP error! Status: ${res.status}`);
    //       }
    //       return res.json();
    //     })
    //     .then((data) => {       
    //       getShopignWishlist();
    //       window.location.reload();
    //       // Refresh the shopping cart after deletion
    //     })
    //     .catch((error) => {
    //       console.error('Error deleting product from cart:', error);
    //     });
    // };
    const deleteProductFromWishlist = (itemIds: number[]) => {
      // Assuming you want to delete multiple items at once
      // Modify the API call accordingly
      Promise.all(
        itemIds.map((id) =>
          fetch(`http://localhost:5001/api/wishlist/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: 'yourUserId', // Replace with the actual user ID or identifier
            }),
          })
        )
      )
        .then((responses) =>
          Promise.all(responses.map((res) => (res.ok ? res.json() : Promise.reject(res))))
        )
        .then((data) => {
          getShopignWishlist();
          window.location.reload();
          // Refresh the shopping cart after deletion
        })
        .catch((error) => {
          console.error('Error deleting product from wishlist:', error);
        });
    };
    
    // const deleteProductFromCart = (idshopcartItem:number) => {
    //   fetch(`http://localhost:5001/api/shoppingCart/${idshopcartItem}`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       userId: 'yourUserId', // Replace with the actual user ID or identifier
    //     }),
    //   })
    //     .then((res) => {
    //       if (!res.ok) {
    //         throw new Error(`HTTP error! Status: ${res.status}`);
    //       }
    //       return res.json();
    //     })
    //     .then((data) => {       
    //       getShopignCart();
    //       window.location.reload();
    //       // Refresh the shopping cart after deletion
    //     })
    //     .catch((error) => {
    //       console.error('Error deleting product from cart:', error);
    //     });
    // };   
    const deleteProductFromCart = (itemIds: number[]) => {
      fetch('http://localhost:5001/api/shoppingCart/batch-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemIds,
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
  <div className="relative mx-auto py-8 sm:py-16 px-4 w-full max-w-7xl">
    <div className="grid grid-cols-4 gap-y-8 gap-x-4">
        <CategoryFilter />      
      <div className=" col-span-full lg:col-span-3 w-full max-w-9xl">    
      <div className="my-8">
        <Slider {...settings}>
      {searchResults.map((product, index) => (
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
      </div>
    </div>
  </div>
  );
}
