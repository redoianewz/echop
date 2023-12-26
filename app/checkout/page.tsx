'use client';
import React, { useState, useEffect } from 'react';
import { useAuth ,useUser} from "@clerk/nextjs";
import Link from 'next/link';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const { isSignedIn, user, isLoaded } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    phone: '',
  });
console.log('hhh',user)

  const getShopignCart = () => {
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

  useEffect(() => {
    // Fetch the shopping cart data when the component mounts
    getShopignCart();
  }, []); // Removed the condition from the dependency array

  const calculateSubtotal = () => {
    let total = 0;
    cart.forEach((cartItem) => {
      cartItem.items.forEach((item) => {
        total += item.quantity * item.price;
      });
    });
    return total.toFixed(2); // Assuming you want to display the subtotal with two decimal places
  };
  const submitOrder = () => {
    const orderData = {
      userId: user?.id || null,
      subtotal: calculateSubtotal(),
      firstname: formData.name || user?.firstName || '',
      lastname: formData.name ? '' : user?.lastName || '',
      mobile: formData.phone || '',
      address: formData.address || '',
      adinformation: formData.additionalInfo || '',
      city: formData.city || '',
      status: 'pending',
      items: cart.flatMap((cartItem) => cartItem.items.map((item) => ({
        productId: item.product_id,
        quantity: item.quantity,
        price: item.price,
        attributes: item.attributes,
      }))),
    };

    fetch('http://localhost:5001/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Order submitted successfully:', data);        
      })
      .catch((error) => {
        console.error('Error submitting order:', error);
      });  
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  return (
    <div>  
    <div className="h-full grid grid-cols-3">
        <div className="lg:col-span-2 col-span-3  space-y-8 px-12">
            <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                    <div className="text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 sm:w-5 h-6 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium ml-3">Checkout</div>
                </div>
                <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">Complete your shipping and payment details below.</div>
                <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
            </div>
            <div className="rounded-md">
                <form id="payment-form" method="POST" action="">
                    <section>
                        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Shipping & Billing Information</h2>
                        <fieldset className="mb-9 bg-white shadow-lg rounded text-gray-600 ">
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2" >Name</span>
                                <input name="name" className="focus:outline-none px-3" placeholder="Try Odinsson"   required  defaultValue={user?.fullName || ''} />
                            </label>
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">Email</span>
                                <input name="email" type="email" className="focus:outline-none px-3 w-full" placeholder="try@example.com"  required  defaultValue={user?.emailAddresses?.length > 0 ? user.emailAddresses[0].emailAddress : ''}/>
                            </label>
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">Address</span>
                                <input name="address" className="focus:outline-none px-3 w-full" placeholder="10 Street XYZ 654"
                                onChange={handleInputChange}
                                value={formData.address}
                                />
                            </label>
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">City</span>
                                <input name="city" className="focus:outline-none px-3" placeholder="San Francisco"
                                onChange={handleInputChange}  
                                value={formData.city}
                                />
                            </label>
                            {/*  number phone */}
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">Phone</span>
                                <input name="phone" className="focus:outline-none px-3" placeholder="San Francisco"
                                onChange={handleInputChange}
                                value={formData.phone}
                                />
                            </label>
                            {/* additional information */}
                            <label className="flex border-b border-gray-200 h-full py-3 items-center">
                                <span className="text-right px-2">Additional Information</span>
                                <input name="additionalInfo" className="focus:outline-none px-3" placeholder="San Francisco" type='textarea'
                                onChange={handleInputChange}
                                value={formData.additionalInfo}
                                />
                            </label>                            
                        </fieldset>
                    </section>
                </form>
            </div>
            <div className="rounded-md">
                <section>
                    <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Payment Method</h2>
                    {/* cash on delivery */}
                    <fieldset className="mb-3   text-gray-600">
                        <label className="flex border-b border-gray-200 h-12 py-3 items-center">                            
                            <input name="payment" type="radio" checked className="focus:outline-none px-3" placeholder="Try Odinsson" required />
                            <span className="text-right px-2">Cash on Delivery</span>
                        </label>
                    </fieldset>
                    {/* credit card */}
                    <fieldset className="mb-3  text-gray-600">
                        <label className="flex border-b border-gray-200 h-12 py-3 items-center">                                                       
                             <input name="payment" type="radio" className="focus:outline-none px-3" placeholder="Try Odinsson" required />
                            <span className="text-right px-2">Credit Card</span>
                         </label>
                     </fieldset>
                    {/* paypal */}
                    <fieldset className="mb-3  text-gray-600">
                        <label className="flex border-b border-gray-200 h-12 py-3 items-center">                            
                            <input name="payment" type="radio" className="focus:outline-none px-3" placeholder="Try Odinsson" required />
                            <span className="text-right px-2">Paypal</span>
                        </label>
                    </fieldset>
                   
                </section>
            </div>
            {calculateSubtotal() > 0 && (
            <Link href="/thankyou">
            <button onClick={submitOrder}
            className="submit-button px-4 py-3 rounded-full bg-orange-500 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
                Pay  {calculateSubtotal()} dh
            </button>
            </Link>
            )}            
        </div>
        <div className="col-span-1 bg-white lg:block hidden mt-2 mr-2 mb-3">
            <div className="flex justify-between items-center border-b py-4 px-8 mb-4">
                <h1 className="font-semibold text-lg">Order Summary</h1>
                <span className="text-sm font-medium">{cart.map((cartItem) => cartItem.items.length) ||0 } items</span>
            </div>
            <ul className="py-6 border-b space-y-6 px-8">
            {  cart.map((cartItem, cartIndex) => (
                    <div key={cartIndex}>
                  <div key={cartIndex}>
                 {
                cartItem.items &&  cartItem.items.map((item ,itemIndex) => (
                    <div key={itemIndex}>
                <li className="grid grid-cols-6 gap-2 border-b-1 mb-2">
                    <div className="col-span-1 self-center">
                        <img src={`http://localhost:5001/images/products/${item.image}`} alt={item.name} className="rounded w-full"/>
                    </div>
                    <div className="flex flex-col col-span-3 pt-2">
                        <span className="text-gray-600 text-md font-semi-bold">{item.name}</span>                        
                    </div>
                    <div className="col-span-2 pt-3">
                        <div className="flex items-center space-x-2 text-sm justify-between">
                            <span className="text-gray-400">{item.quantity} x {item.price}dh</span>
                            <span className="text-orange-500 font-semibold inline-block">{item.quantity * item.price} Dh</span>
                        </div>
                    </div>
                </li> 
                </div>
                ))} 
                </div>  
                </div>
            ))}              
            </ul>
            <div className="px-8 border-b">
                <div className="flex justify-between py-4 text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-orange-500">{calculateSubtotal()} Dh</span>
                </div>
                <div className="flex justify-between py-4 text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-orange-500">Free</span>
                </div>
            </div>            
            <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                <span>Total</span>
                <span>{calculateSubtotal()} Dh</span>
            </div>
        </div>
    </div>
    </div>
  )
}
