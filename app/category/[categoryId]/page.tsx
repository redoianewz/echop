'use client';
import React,{useState,useEffect} from 'react'
import CategoryFilter from '@/app/_components/filterShop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';


// ... (previous imports)

// ... (previous imports)
interface Product {
  id: number;
  name: string;
  image: string;
  images: string;
  sale_price: string;
  regular_price: string;
  category_name: string;
}

export default function page({ params: { categoryId }} : { params: { categoryId: string } }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [hoveredProducts, setHoveredProducts] = useState<{ [key: number]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const getDataCategory = () => {
    fetch(`http://localhost:5001/api/categories/${categoryId}`)
      .then((res) => res.json())
      .then((data:Product[]) => {
        setProducts(data);
        // Initialize hover state for each product
        const initialHoverState = data.reduce((acc :any, product) => {
          acc[product.id] = false;
          return acc;
        }, {});
        setHoveredProducts(initialHoverState);
      })
      .catch((error) => {
        console.error('Error fetching Category:', error);
      });
  };

  useEffect(() => {
    console.log('Category ID:', categoryId);
    if (categoryId) {
      getDataCategory();
    }
  }, [categoryId]);

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

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="relative mx-auto py-8 sm:py-16 px-4 w-full max-w-7xl">
      <div className="grid grid-cols-4 gap-y-8 gap-x-4">
        <CategoryFilter />
        <div className=" col-span-full lg:col-span-3 w-full max-w-9xl">
          <div className="mx-auto sm:px-6 sm:py-8 lg:max-w-4xl">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {paginatedProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div
                    className="group relative bg-white p-2 border border-gray-200 rounded-md shadow-md"
                    onMouseEnter={() => handleProductHover(product.id)}
                    onMouseLeave={() => handleProductLeave(product.id)}
                  >
                    <div className="aspect-h-3 h-10 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40 relative">
                      <p className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md">New</p>
                      <Image
                        src={
                          hoveredProducts[ product.id]
                            ? `http://localhost:5001/images/products/${product.image} `
                            : `http://localhost:5001/images/products/${product.images}`
                        }
                        width={180}
                        height={40}
                        alt={product.name}
                      />
                    </div>
                    <div className="mt-4 flex justify-between flex-col h-full">
                      <div className="mb-2">
                        <span className="text-xs text-gray-500">{product.category_name}</span>
                        <h3 className="text-xs text-gray-700">                     
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}                    
                        </h3>
                        <div className="flex items-end justify-between">
                          <p className="text-xs font-medium text-gray-900">{product.sale_price}</p>
                          <p className="text-xs line-through text-gray-500">{product.regular_price}</p>
                          <div className="flex space-x-2">
                            <FontAwesomeIcon
                              icon={faCartShopping}
                              className="text-orange-500 border bg-green-100 text-lg border-green-400 rounded-full p-2"
                            />
                            <FontAwesomeIcon
                              icon={faHeart}
                              className="text-orange-500 border bg-green-100 text-lg border-green-400 rounded-full p-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}