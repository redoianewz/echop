'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck ,faMobileScreenButton,faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@clerk/nextjs';
import '@/app/orders/global.css';
import Link from 'next/link';

export default function OrdersPage() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/checkout/${user?.id}`);
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
  }, [user?.id]); // add orders to the dependency array
  console.log('theis order:', orders);
  const getStatusColor = (status) => {
    switch (status) {
      case 'orders':
        return 'bg-orange-500 text-gray-50'; // Orange background for 'orders'
      case 'delivered':
        return 'bg-green-400 text-gray-50'; // Green background for 'delivered'
      case 'canceled':
        return 'bg-red-500 text-gray-50'; // Red background for 'canceled'
      default:
        return 'bg-gray-400 text-gray-800'; // Default background color
    }
  };
  
  return (   
<div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">

  {orders.length > 0 ? (
  orders.map(item => (        
    <div>  
      <div className="flex items-center justify-center">
  <div className="col-span-12">
    <div className="overflow-auto lg:overflow-visible">
      <table className="table text-gray-400 border-separate space-y-6 text-sm">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-3">#OrderId</th>
            <th className="p-3 text-left">FullName</th>                        
            <th className="p-3 text-left">mobile</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">City</th>
            <th className="p-3 text-left">Subtotal</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">date created</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {item.orders.map((item) => (
         
          <tr className="bg-blue-200 lg:text-black">
            <td className="p-3 font-medium capitalize">#AE{item.orderId}32</td>
            <td className="p-3">{item.firstname} {item.lastname}</td>         
            <td className="p-3">{item.mobile}</td>            
            <td className="p-3">{item.address}</td>
            <td className="p-3">{item.city}</td>
            <td className="p-3">{item.subtotal}</td>                       
            <td className="p-3">
              <span className={`rounded-md px-2 ${getStatusColor(item.status)}`}>
                {item.status}
              </span> 
            </td>
            <td className="p-3">{item.created_at}</td> 
            <td className="p-3">
              <Link href={`/orders/${item.orderId}`}
               className="text-gray-500 hover:text-gray-100 mr-2">
                <i className="material-icons-outlined text-base">Show Details</i>
              </Link>             
            </td>
          </tr> 
          )) }          
        </tbody>
      </table>
    </div>
  </div>
</div>
  <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">  
    <div className=" dark:bg-white w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
      <h3 className="text-xl dark:text-gray-800 font-semibold leading-5 text-gray-800">Customer</h3>
      <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div className="flex flex-col justify-start items-start flex-shrink-0">
          <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
            <img src={user?.imageUrl} alt={user?.fullName} width={100} height={120} />
            <div className="flex justify-start items-start flex-col space-y-2">
              <p className="text-base dark:text-gray-800 font-semibold leading-4 text-left text-gray-800"> {item.client.firstname}  {item.client.lastname}</p>
              <p className="text-sm dark:text-gray-600 leading-5 text-gray-600">10 Previous Orders</p>
            </div>
          </div>

          <div className="flex justify-center text-gray-800 dark:text-gray-800 md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
          <p className="cursor-pointer text-xl leading-5 text-orange-500"><FontAwesomeIcon icon={faEnvelope} /></p> 
            <p className="cursor-pointer text-sm leading-5 ">{user?.emailAddresses.map((emailAddress) => (
          <div key={emailAddress.id}>{emailAddress.emailAddress}</div>
        ))}</p>
       <p className="cursor-pointer text-xl leading-5 text-orange-500"><FontAwesomeIcon icon={faMobileScreenButton} /> </p> 
        <p className="cursor-pointer text-sm leading-5 ">{item.client.mobile}</p>

          </div>       
        </div>
        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="text-base dark:text-gray-800 font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
              <p className="w-48 lg:w-full dark:text-gray-600 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"> {item.client.adress}</p>
            </div>
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
              <p className="text-base dark:text-gray-800 font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
              <p className="w-48 lg:w-full dark:text-gray-600 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"> {item.client.adress}</p>
            </div>
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
              <p className="text-base dark:text-gray-800 font-semibold leading-4 text-center md:text-left text-gray-800">city</p>
              <p className="w-48 lg:w-full dark:text-gray-600 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"> {item.client.city}</p>
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
        ))) : (
    <div className="flex justify-center items-center w-full h-full">
      <p className="text-2xl font-semibold leading-6 text-gray-800">You have no orders yet</p>
          
      </div>
  )} 
</div>
   
  );
}

{/* <div className="flex items-center justify-center">
  <div className="col-span-12">
    <div className="overflow-auto lg:overflow-visible">
      <table className="table text-gray-400 border-separate space-y-6 text-sm">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-3">#OrderId</th>
            <th className="p-3 text-left">FullName</th>            
            <th className="p-3 text-left">email</th>
            <th className="p-3 text-left">mobile</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">City</th>
            <th className="p-3 text-left">Subtotal</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">date created</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
     
          <tr className="bg-blue-200 lg:text-black">
            <td className="p-3 font-medium capitalize">#AZ12312</td>
            <td className="p-3">AYMEN SAADI</td>
            <td className="p-3">gazi.rahad871@gmail.com</td>
            <td className="p-3">01648349009</td>            
            <td className="p-3 uppercase">DEB SLTAN</td>
            <td className="p-3">CASABLNCA</td>
            <td className="p-3">$100</td>                       
            <td className="p-3">
              <span className="bg-green-400 text-gray-50 rounded-md px-2">ACTIVE</span>
            </td>
            <td className="p-3">December 2023 at 11:36 AM</td> 
            <td className="p-3">
              <a href="#" className="text-gray-500 hover:text-gray-100 mr-2">
                <i className="material-icons-outlined text-base">Show Details</i>
              </a>             
            </td>
          </tr>           
        </tbody>
      </table>
    </div>
  </div>
</div> */}