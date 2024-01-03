"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faMobileScreenButton,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@clerk/nextjs";
import "@/app/orders/global.css";
import Link from "next/link";

interface Order {
  orderId: string;
  firstname: string;
  lastname: string;
  mobile: string;
  address: string;
  city: string;
  subtotal: number;
  status: string;
  created_at: string;
}
interface Client {
  firstname: string;
  lastname: string;
  mobile: string;
  adress: string;
  city: string;
}
interface OrderItem {
  orderId: string;
  firstname: string;
  lastname: string;
  mobile: string;
  address: string;
  city: string;
  subtotal: number;
  status: string;
  created_at: string;
  orders: Order[];
  client: Client;
}
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function OrdersPage() {
  const { user } = useUser();
  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(`${apiURL}/api/checkout/${user?.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user?.id) {
      getOrders();
    }
  }, [user?.id]); // add orders to the dependency array
  console.log("theis order:", orders);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "orders":
        return "bg-orange-500 text-gray-50"; // Orange background for 'orders'
      case "delivered":
        return "bg-green-400 text-gray-50"; // Green background for 'delivered'
      case "canceled":
        return "bg-red-500 text-gray-50"; // Red background for 'canceled'
      default:
        return "bg-gray-400 text-gray-800"; // Default background color
    }
  };
  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      {orders.length > 0 ? (
        orders.map((item) => (
          <div key={item.orderId}>
            <div className="col-span-12">
              <div className="overflow-auto lg:overflow-visible">
                <div className="table-container">
                  <table className="table text-gray-400 border-separate space-y-6 text-sm w-full">
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
                      {item.orders.map((order) => (
                        <tr className="bg-blue-200 lg:text-black">
                          <td className="p-3 font-medium capitalize">
                            #AE{order.orderId}32
                          </td>
                          <td className="p-3">
                            {order.firstname} {order.lastname}
                          </td>
                          <td className="p-3">{order.mobile}</td>
                          <td className="p-3">{order.address}</td>
                          <td className="p-3">{order.city}</td>
                          <td className="p-3">{order.subtotal}</td>
                          <td className="p-3">
                            <span
                              className={`rounded-md px-2 ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="p-3">{order.created_at}</td>
                          <td className="p-3">
                            <Link
                              href={`/orders/${order.orderId}`}
                              className="text-gray-500 hover:text-gray-100 mr-2"
                            >
                              <i className="material-icons-outlined text-base">
                                Show Details
                              </i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
              <div className=" dark:bg-white w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                <h3 className="text-xl dark:text-gray-800 font-semibold leading-5 text-gray-800">
                  Customer
                </h3>
                <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                  <div className="flex flex-col justify-start items-start flex-shrink-0">
                    <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                      <img src={user?.imageUrl} width={100} height={120} />
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-base dark:text-gray-800 font-semibold leading-4 text-left text-gray-800">
                          {" "}
                          {item.client.firstname} {item.client.lastname}
                        </p>
                        <p className="text-sm dark:text-gray-600 leading-5 text-gray-600">
                          10 Previous Orders
                        </p>
                      </div>
                    </div>

                    <div className="block justify-center text-gray-800 dark:text-gray-800 md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                      <p className="flex justify-start">
                        <span className="cursor-pointer text-xl leading-5 text-orange-500">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <span className="cursor-pointer text-sm leading-5 ">
                          {user?.emailAddresses.map((emailAddress) => (
                            <div key={emailAddress.id}>
                              {emailAddress.emailAddress}
                            </div>
                          ))}
                        </span>
                      </p>
                      <p className="flex justify-start">
                        <span className="cursor-pointer text-xl leading-5 text-orange-500">
                          <FontAwesomeIcon icon={faMobileScreenButton} />
                        </span>
                        <span className="cursor-pointer text-sm leading-5 ">
                          {item.client.mobile}
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                        <p className="text-base dark:text-gray-800 font-semibold leading-4 text-center md:text-left text-gray-800">
                          Shipping Address
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-600 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {" "}
                          {item.client.adress}
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                        <p className="text-base dark:text-gray-800 font-semibold leading-4 text-center md:text-left text-gray-800">
                          Billing Address
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-600 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {" "}
                          {item.client.adress}
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                        <p className="text-base dark:text-gray-800 font-semibold leading-4 text-center md:text-left text-gray-800">
                          city
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-600 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {" "}
                          {item.client.city}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                      <button className="mt-6 md:mt-0 dark:border-white   py-5  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border bg-orange-500 border-gray-800  w-96 2xl:w-full text-base font-medium leading-4 text-white">
                        Edit Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-2xl font-semibold leading-6 text-gray-800">
            You have no orders yet
          </p>
        </div>
      )}
    </div>
  );
}
