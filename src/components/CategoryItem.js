import React from 'react'
import { useNavigate } from 'react-router-dom';


const CategoryItem = ({item}) => {

  const navigate=useNavigate();

  const handleShopNowClick = () => {
    navigate(`/products/${item.cat}`); // Navigate to the ProductList component
  };

  return (
    <div className='relative m-2'>
      <img src={item.img} className='h-[30vh] md:h-[100vh] object-cover w-full' alt={item.title} />
      <div className='absolute inset-0 flex flex-col items-center justify-center  bg-opacity-50 '>
        <h2 className='text-2xl md:text-4xl mb-4 text-white'>{item.title}</h2>
        <button onClick={handleShopNowClick} className='px-2 md:px-6 py-2 text-gray-400 bg-white rounded-md'>Shop Now</button>
      </div>
    </div>
  )
}

export default CategoryItem