'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck ,faMobileScreenButton,faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@clerk/nextjs';

export default function OrdersPage({params: { orderId }}) {
  const { user } = useUser();
  const [orders, setOrders] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/checkout/${user?.id}/${orderId}`); // add orderId to the URL
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (user?.id) {
      getOrders();
    }
  }, [user?.id]);

  console.log('theis order:', orders);

  return (   
<div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto"> 
    <div>            
  <div className="flex justify-start item-start space-y-2 flex-col">
    <h1 className="text-3xl dark:text-gray-800 lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order #AE12{orders.orderId}</h1>
    <p className="text-base dark:text-gray-600 font-medium leading-6 text-gray-600">{orders.created_at}</p>
  </div>

  <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
             
      <div className="flex flex-col justify-start items-start dark:bg-gray-50 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
        <p className="text-lg md:text-xl dark:text-gray-800 font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
         {orders.items && orders.items.map(item => (
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
          <div className="pb-4 md:pb-8 w-full md:w-40">
            <img className="w-full hidden md:block" src={`http://localhost:5001/images/products/${item.productImage}`} alt={item.productName}  />
            <img className="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
          </div>
          <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
            <div className="w-full flex flex-col justify-start items-start space-y-8">
              <h3 className="text-xl dark:text-gray-800 xl:text-2xl font-semibold leading-6 text-gray-800">{item.productName}</h3>

              <div className="flex justify-start items-start flex-col space-y-2">
              {item.attributes.map((attribute) => (
            <p
              key={attribute.name}
              className="text-sm dark:text-gray-800 leading-none text-gray-800"
            >
              <span className="dark:text-gray-300 text-gray-300">
                {attribute.name}:{' '}
              </span>
              {attribute.values.join(', ')}
            </p>
          ))}
              </div>
            </div>
            <div className="flex justify-between space-x-8 items-start w-full">
              <p className="text-base  xl:text-lg leading-6">{item.productSalePrice}Dh <span className="text-orange-500 line-through"> {item.productRegularPrice}Dh</span></p>
              <p className="text-base dark:text-gray-800 xl:text-lg leading-6 text-gray-800">{item.quantity} Pcs</p>
              <p className="text-base dark:text-gray-800 xl:text-lg font-semibold leading-6 text-gray-800">{item.subtotal}Dh</p>
            </div>
          </div>
        </div>
        ))}  
        
      </div>
      <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-white space-y-6">
          <h3 className="text-xl dark:text-gray-800 font-semibold leading-5 text-gray-800">Summary</h3>
          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
            <div className="flex justify-between w-full">
              <p className="text-base dark:text-gray-800 leading-4 text-gray-800">Subtotal</p>
              <p className="text-base dark:text-gray-600 leading-4 text-gray-600">{orders.subtotal}Dh</p>
            </div>            
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-gray-800 leading-4 text-gray-800">Shipping</p>
              <p className="text-base dark:text-orange-500 leading-4 text-orange-500">Free</p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base dark:text-gray-800 font-semibold leading-4 text-gray-800">Total</p>
            <p className="text-base dark:text-gray-600 font-semibold leading-4 text-gray-600">{orders.subtotal}Dh</p>
          </div>
        </div>
        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-50 space-y-6">
          <h3 className="text-xl dark:text-gray-800 font-semibold leading-5 text-gray-800">Shipping</h3>
          <div className="flex justify-between items-start w-full">
            <div className="flex justify-center items-center space-x-4">
              <div className="w-8 h-8 text-orange-500 text-2xl">
              <FontAwesomeIcon icon={faTruck} />
              </div>
              <div className="flex flex-col justify-start items-center">
                <p className="text-lg leading-6 dark:text-gray-800 font-semibold text-gray-800">DPD Delivery<br /><span className="font-normal">Delivery with 24 Hours</span></p>
              </div>
            </div>
            <p className="text-lg font-semibold leading-6 dark:text-orange-500 text-orange-500">Free</p>
          </div>
          <div className="w-full flex justify-center items-center">
            <button className=" dark:bg-orange-500 dark:text-gray-200  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-gray-200">View Carrier Details</button>
          </div>
        </div>
      </div>
    </div>
    <div className=" dark:bg-white w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
      <h3 className="text-xl dark:text-gray-800 font-semibold leading-5 text-gray-800">Customer</h3>
      <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div className="flex flex-col justify-start items-start flex-shrink-0">
          <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
            <img src={user?.imageUrl} alt={user?.fullName} width={100} height={120} />
            <div className="flex justify-start items-start flex-col space-y-2">
              <p className="text-base dark:text-gray-800 font-semibold leading-4 text-left text-gray-800"> {orders.firstname}  {orders.lastname}</p>
              <p className="text-sm dark:text-gray-600 leading-5 text-gray-600">10 Previous Orders</p>
            </div>
          </div>

          <div className="flex justify-center text-gray-800 dark:text-gray-800 md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
          <p className="cursor-pointer text-xl leading-5 text-orange-500"><FontAwesomeIcon icon={faEnvelope} /></p> 
            <p className="cursor-pointer text-sm leading-5 ">{user?.emailAddresses.map((emailAddress) => (
          <div key={emailAddress.id}>{emailAddress.emailAddress}</div>
        ))}</p>
       <p className="cursor-pointer text-xl leading-5 text-orange-500"><FontAwesomeIcon icon={faMobileScreenButton} /> </p> 
        <p className="cursor-pointer text-sm leading-5 ">{orders.mobile}</p>

          </div>       
        </div>
        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="text-base dark:text-gray-800 font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
              <p className="w-48 lg:w-full dark:text-gray-600 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"> {orders.address}</p>
            </div>
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
              <p className="text-base dark:text-gray-800 font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
              <p className="w-48 lg:w-full dark:text-gray-600 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"> {orders.address}</p>
            </div>
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
              <p className="text-base dark:text-gray-800 font-semibold leading-4 text-center md:text-left text-gray-800">city</p>
              <p className="w-48 lg:w-full dark:text-gray-600 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"> {orders.city}</p>
              </div>
          </div>
          <div className="flex w-full justify-center items-center md:justify-start md:items-start">
            <button className="mt-6 md:mt-0 dark:border-white   py-5  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border bg-orange-500 border-gray-800  w-96 2xl:w-full text-base font-medium leading-4 text-white">Edit Details</button>
          </div>
        </div>
      </div>
    </div>
  </div> 
   </div>               

</div>
   
  );
}
