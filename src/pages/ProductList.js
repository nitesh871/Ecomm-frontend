import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Announcements from "../components/Announcements";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import Products from "../components/Products";
import { useLocation } from "react-router-dom";

const ProductList = () => {
  const location = useLocation()
  const cat = location.pathname.split("/")[2]

  const [filters,setFilters] = useState({})
  const [sort,setSort] = useState('newest')

  const handleFilters = (e) =>{
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]:value
    })
  }           

  console.log(filters)

  return (
    <div className="font-custom">
      <Navbar />
      <Announcements />
      <div className="p-8">
        <h1 className="text-4xl font-bold">Dresses</h1>
        <div className=" md:justify-between flex pt-10 ">
          <div className="block md:flex gap-4 items-center justify-center">
            <h3 className="font-bold mb-2 md:mb-0">Filter Products:</h3>

            <form id="filter-form ">
              

              {/* <!-- Color Dropdown --> */}
              <select id="color" name="color" onChange={handleFilters} className="border border-gray-400 mb-2 md:mb-0 p-2 w-28 md:w-20 mr-10 rounded">
                <option value=""> Color</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Gray</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="yellow">Yellow</option>
                <option value="pink">Cream</option>
                <option value="purple">Purple</option>
              </select>

              {/* <!-- Size Dropdown --> */}
              <select id="size" name="size" onChange={handleFilters} className="border border-gray-400 p-2 w-28 md:w-20 mr-10 rounded">
                <option value="">Size</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
              </select>

              {/* <!-- Submit Button --> */}
              {/* <button type="submit" className="bg-blue-500 text-white p-2  mr-5 rounded">Apply Filters</button> */}
            </form>
          </div>

          <div className="block md:flex items-center justify-center gap-2">
          <h3 className="font-bold mb-2 md:mb-0">Short Products:</h3>
          <select id="price" name="price" onChange={(e)=>setSort(e.target.value)} className="border border-gray-400 p-2 w-28 md:w-20 mr-2 md:mr-10 rounded">
                <option value="newest">Newest</option>
                <option value="asc">Price (asc)</option>
                <option value="dasc">Price (dasc)</option>
              </select>
          </div>
        </div>
      </div>
      <Products cat={cat} filters={filters} sort={sort} />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default ProductList;
