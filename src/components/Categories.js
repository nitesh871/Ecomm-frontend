import React from 'react'
import { categories } from '../data'
import CategoryItem from './CategoryItem'

const Categories = () => {
  return (
    <div className='flex flex-col p-1 md:flex-row md:p-10'>
        {categories.map(item=>{
            return <CategoryItem key={item.id} item={item} />;
        })}
    </div>
  )
}

export default Categories