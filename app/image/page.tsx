// pages/ImagePage.js
'use client';
import React, { useState, useEffect } from 'react';

const ImagePage = () => {
  const [image, setImage] = useState('');
  const [products, setProducts] = useState([]);

  const handelImage = () => {
    fetch('http://localhost:5001/images/product-7-2.jpg')
  .then(response => response.blob())
  .then(blob => {
    const imageUrl = URL.createObjectURL(blob);
    setImage(imageUrl);
  })
  .catch(error => {
    console.error('Error fetching image:', error);
  });
}
// const handelImage = () => {
//     fetch('http://localhost:5001/images/product-7-2.jpg')
//   .then(response => response.url)
//     .then(data => {
//         setImage(data);
//     });
// }
const fetchProducts = () => {
    fetch("http://localhost:5001/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };     
useEffect(() => {
handelImage();
fetchProducts();    
}, []);

return (
<div>
  <p>Image Page</p>
  {products.map((item, index) => (
    <div key={index}>
        {<img src={'http://localhost:5001/images/' + item.image} width={100} alt="Product Image" />}

        <p>name: {item.name}</p>                
        <p>description:   {item.description}</p>
        image: <img src={item.image}        
        alt="" />
    </div>
))}

</div>
);
};

export default ImagePage;
