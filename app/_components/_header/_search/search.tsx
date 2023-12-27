// search/page.jsx
'use client';
import React,{useState,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart, faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { UserButton } from "@clerk/nextjs";
import { useAuth,useUser } from "@clerk/nextjs";

interface cartItem
{
  items: { item_id: string | null }[];
}
interface WishlistItem
{
  items: { item_id: string | null }[];
}
const Search = () => {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<cartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const {  userId, sessionId, getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

console.log('user',user);
const getShopignCart = () => {
  fetch('https://bachen-eco.onrender.com/api/shoppingCart')
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data: cartItem[]) => {
      console.log(data);  
      const hasNullItem = data.some((cartItem:cartItem) => cartItem.items.some((item) => item.item_id === null));
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

  const getShopignWishlist =  () => {
    fetch('https://bachen-eco.onrender.com/api/wishlist')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
  
        // Check if any item has a null item_id
        const hasNullItem = data.some((cartItem:cartItem) => cartItem.items.some((item) => item.item_id === null));
  
        // Set cart state accordingly
        if (hasNullItem) {
          setWishlist([]);
        } else {
          setWishlist(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching shopping cart:', error);
      });
  };

  const handleSearchChange = (e:any) => {
    const query = e.target.value;
    setSearchQuery(query);
  }
  useEffect(() => {
    getShopignCart();
  } , []);
  useEffect(() => {
    getShopignWishlist();
  } , []);


  return (
    <div className="bg-gray-100 text-black p-4 flex justify-between items-center h-20">  
      <div>       
        <span className="text-xl font-bold text-black">Logo</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-full px-52 py-3 focus:outline-none focus:border-orange-700"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <span className="absolute right-2 top-2 text-gray-500">
            <Link href={`/search/${searchQuery}`} >
              <button>
                <FontAwesomeIcon icon={faSearch} className="text-2xl text-orange-500" />
              </button>
            </Link>
          </span>
        </div>
      </div>

      {/* Right side: Icons for user, cart, and wishlist */}
      <div className="flex items-center space-x-4">
        {/* Add your user icon */}
        
          {userId ? <span className="-top-5 "><UserButton afterSignOutUrl="/"   /> </span>
          :(
            <span className="-top-5 ">
            <Link href="/sign-in">
            <button className="submit-button  rounded-md bg-orange-500 text-black focus:ring focus:outline-none  text-lg w-16 mr-2 h-10 ">
              Sign in
            </button>
            </Link>
            <Link href="/sign-up">
            <button className="submit-button  rounded-md bg-orange-500 text-black focus:ring focus:outline-none  text-lg w-16 mr-2 h-10 ">
              Login
            </button>
            </Link>
            </span>
            )  
        }

        
        <Link href="/cart">
        <span className="relative">          
          <FontAwesomeIcon icon={faShoppingCart} className="text-3xl" />          
          <span className="absolute -top-5 -right-2 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
          {cart.length > 0 ? cart.reduce((total, cartItem) => total + cartItem.items.length, 0) : 0}
          </span>
        </span>
        </Link>
        {/* Add your wishlist icon with number */}
        <Link href="/wishlist">
        <span className="relative">
          <FontAwesomeIcon icon={faHeart} className='text-3xl text-black' />
          <span className="absolute -top-5 -right-2 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
          {wishlist.length > 0 ? wishlist.reduce((total, cartItem) => total + cartItem.items.length, 0) : 0}
          </span>
        </span>
        </Link>
      </div>
    </div>
  );
};

export default Search;
