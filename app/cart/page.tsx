"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan,faHeart } from '@fortawesome/free-solid-svg-icons';
import Products from '@/app/_products/products';
import Link from 'next/link';


export default function Page() {
  const [cart, setCart] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [subtotal, setSubtotal] = useState(0);

  const getShopignCart =  () => {
    fetch('http://localhost:5001/api/shoppingCart')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
  
        // Check if any item has a null item_id
        const hasNullItem = data.some((cartItem) => cartItem.items.some((item) => item.item_id === null));
  
        // Set cart state accordingly
        if (hasNullItem) {
          setCart([]);
        } else {
          setCart(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching shopping cart:', error);
      });
  };
  
 

  const showMessage = (message) => {
    setDeleteMessage(message);
    setTimeout(() => {
      setDeleteMessage('');
    }, 3000);
  }; 
  useEffect(() => {
    getShopignCart();
  }, []);


  const updateQuantity = (itemId, newQuantity) => {
    fetch('http://localhost:5001/api/shoppingCart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'yourUserId', // Replace with the actual user ID or identifier
        itemId: itemId,
        quantity: newQuantity,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data); // Log the response from the server
        // Perform any additional actions as needed
      })
      .catch((error) => {
        console.error('Error updating quantity:', error);
      });
  };
  const resetQuantityToOne = (cartIndex, itemIndex) => {
    const updatedCart = [...cart];
    updatedCart[cartIndex].items[itemIndex].quantity = 1;
    setCart(updatedCart);
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
        setDeleteMessage(data.message);
        getShopignCart(); // Refresh the shopping cart after deletion
      })
      .catch((error) => {
        console.error('Error deleting product from cart:', error);
      });
  };
  const incrementQuantity = (cartIndex, itemIndex) => {
    const updatedCart = [...cart];
    updatedCart[cartIndex].items[itemIndex].quantity += 1;
    setCart(updatedCart);
    updateQuantity(updatedCart[cartIndex].items[itemIndex].item_id, updatedCart[cartIndex].items[itemIndex].quantity);
  };

  const decrementQuantity = (cartIndex, itemIndex) => {
    const updatedCart = [...cart];
    const currentQuantity = updatedCart[cartIndex].items[itemIndex].quantity;
    if (currentQuantity > 1) {
      updatedCart[cartIndex].items[itemIndex].quantity -= 1;
      setCart(updatedCart);
      updateQuantity(updatedCart[cartIndex].items[itemIndex].item_id, updatedCart[cartIndex].items[itemIndex].quantity);
    }
  };
  const confirmDelete = () => {
    if (itemToDelete) {
      deleteProductFromCart(itemToDelete.idshopcartItem);
      setItemToDelete(null);
      setShowConfirmation(false);
      window.location.href = '/cart';
    }
  };

  const cancelDelete = () => {
    setItemToDelete(null);
    setShowConfirmation(false);
  };
  const handleDelete = (idshopcartItem) => {
    setItemToDelete({ idshopcartItem });
    setShowConfirmation(true);
  };
  const calculateSubtotal = () => {
    let total = 0;
    cart.forEach((cartItem) => {
      cartItem.items.forEach((item) => {
        total += item.quantity * item.price;
      });
    });
    return total.toFixed(2);    
  };

  useEffect(() => {
    // Recalculate subtotal whenever the cart changes
    const newSubtotal = calculateSubtotal();
    setSubtotal(newSubtotal);
  }, [cart]);


  return (
    <div>
      {deleteMessage && (
        <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-green-500 text-white p-4 rounded-md">
          {deleteMessage}
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <p className="text-lg font-semibold mb-4">Confirm Deletion</p>
            <p className="mb-4">Are you sure you want to delete this item from your cart?</p>
            <div className="flex justify-end">
              <button
                onClick={confirmDelete}
                className="mr-4 px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

                <div className="mx-auto justify-center px-6 md:flex md:space-x-6 xl:px-0 mt-8 mb-8">
                  <div className="rounded-lg md:w-2/3">
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">                
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">

                {<h1 className="text-lg font-bold text-gray-900">
                  Shopping Cart ( {cart.map((cartItem) => cartItem.items.length)>0 ?(cart.map((cartItem) => cartItem.items.length)):(0) } items)
                </h1>
              }
            </div>
          </div>
        </div>
        
        {  cart.map((cartItem, cartIndex) => (
          <div key={cartIndex}>
            {
                cartItem.items &&  cartItem.items.map((item ,itemIndex) => (
                    <div
        key={itemIndex}
        className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
      >
       
        <img
          src={`http://localhost:5001/images/products/${item.image}`}
          alt="product-image"
          className="w-full rounded-lg sm:w-40 h-24"
        /> 
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
            <p className="mt-1 text-xs text-gray-700"><span>{item.price}dh</span>  - <span className='text-base font-normal text-gray-500 line-through dark:text-gray-400'>{item.regular_price}dh</span> </p>
            
                <p className="mt-1 text-xs text-gray-700">
                    {item.attributes.map((attr) => (
                     <div className='flex flex-row'>
                        <span className='mr-2'>{attr.name} : {attr.values}
                        </span><br />
                        </div>
                        ))
                        
                }
                </p> 
            
          </div>
          <div className=" flex  sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">                    
            <div className="flex items-center border-gray-100">                       
              <span   onClick={() => decrementQuantity(cartIndex, itemIndex)}                                             
                className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
              >
                {' '}
                -{' '}
              </span>
              <input
                className="h-8 w-10 border bg-white text-center text-xs outline-none"
                type="number"
                value={item.quantity}
                min="1"
                readOnly
              />
              <span       onClick={() => incrementQuantity(cartIndex, itemIndex)}                  
                className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
              >
                {' '}
                +{' '}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm">{item.quantity * item.price} Dh</p>
              <svg
               onClick={() => resetQuantityToOne(cartIndex, itemIndex)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>    
            <div className="flex items-center space-x-6  ">
          
            <FontAwesomeIcon style={{ cursor: 'pointer' }}  icon={faHeart} className='mr-4 text-2xl text-orange-500'
             
                                           
             />
            
                <FontAwesomeIcon title="delete" 
                style={{ cursor: 'pointer' }}
                 icon={faTrashCan} className='text-orange-500 text-2xl' onClick={() => handleDelete(item.item_id)} />                            
              </div>                
          </div>
        </div>
      </div>
        )) }
          </div>
        ))}
                                        
                    </div>
                    {cart.map((cartItem) => cartItem.items.length) > 0 ? (
                    <div  className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">                 
                        <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">{subtotal}DH
                        </p>
                        </div>
                        <div className="flex justify-between">
                        <p className="text-gray-700">Shipping</p>
                        <p className="text-gray-700">0.00DH</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div className="">
                            <p className="mb-1 text-lg font-bold">{subtotal}DH</p>
                            <p className="text-sm text-gray-700">including VAT</p>
                        </div>
                        </div>
                        <Link href="/checkout">
                        <button className="mt-6 w-full rounded-md bg-orange-500 py-1.5 font-medium text-blue-50 hover:bg-orange-600">
                        Check out
                        </button>
                        </Link>                        
                    </div>   ):(
                        <div></div>
                      )}                                       
                </div>
          <div className='m-5'>
        <Products  slidestoShow={6} />
      </div>
    </div>
  );
}
