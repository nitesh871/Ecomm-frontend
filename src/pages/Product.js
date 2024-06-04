import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Announcements from "../components/Announcements";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest, userRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import axios from "axios";

const Product = () => {
  const navigate = useNavigate();
  const user = useSelector((state)=>state.user.currentUser._id)
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [size, setSize] = useState({});
  const [color, setColor] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get("/api/products/find/" + id);
        setProduct(res.data);
        console.log(res.data);
      } catch (err) {
        console.log("product is not fetching");
      }
    };
    getProduct();
  }, [id]);

  const [count, setCount] = useState(1);

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const handleClick = async () => {
    dispatch(addProduct({ ...product, quantity: count, color, size }));
    try {
      console.log(user)
      // Make an API request to add the product to the cart
      const res = await userRequest.post('/api/carts/', {
        // Pass the product data to the backend
        userId: user,
        productId: product.id,
        quantity: count,
        
      });
      console.log(res.data)
  
      // Handle successful addition to the cart
      console.log('Product added to cart successfully!');
    } catch (error) {
      // Handle error
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="font-custom">
      <Navbar />
      <Announcements />

      <div className="grid grid-cols-2 p-4 md:p-[50px] ">
        <img
          src={product.img}
          className="bg-blue-100 p-4 md:p-10 mb-4 md:mb-0 col-span-2 md:col-span-1 w-[90vw] md:w-[100%] h-[90vw]  md:h-[90vh] object-covers  items-center justify-center flex"
          alt="calling"
        ></img>

        <div className="col-span-2 md:col-span-1 ml-2 md:ml-10">
          <h1 className="text-4xl font-semibold mb-4 md:mb-10">
            {product.title}
          </h1>
          <p className="text-md md:text-lg mb-4 md:mb-10">{product.desc}</p>
          <h3 className="font-light text-4xl">${product.price}</h3>
          <form
            id="filter-form"
            className="block md:flex justify-between w-[50%]  items-center mt-6 md:mt-10 mb-6 md:mb-10"
          >
            {/* <!-- Color Dropdown --> */}
            <div className="flex items-center">
              <label className="font-light text-xl flex mr-2">Color:</label>
              {product.color?.map((c) => {
                // console.log("Color value:", c); // Debugging statement
                return (
                  <div
                  className={`w-6 h-6 rounded-full cursor-pointer ${color === c ? 'border-2 border-black' : ''}`}
                  style={{ backgroundColor: c || "gray" }} // Fallback color
                    key={c}
                    onClick={() => setColor(c)}
                    ></div>
                );
              })}
            </div>
            {/* <!-- Size Dropdown --> */}
            <div className="flex ml-0 md:ml-10 items-center">
              <label
                for="size"
                className="font-light text-xl flex justify-center items-center ml-0 md:ml-2 mr-2"
              >
                Size
              </label>
              <select
                id="size"
                name="size"
                onChange={(e) => setSize(e.target.value)}
                className="border border-gray-400 p-2 w-28 md:w-16 mt-2 md:mt-0 mr-4 md:mr-10 flex items-center rounded"
              >
                {product.size?.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
                {["lg", "m", "s"].map((staticSize) => (
                  <option key={staticSize} value={staticSize}>
                    {staticSize}
                  </option>
                ))}
              </select>
            </div>

            {/* <!-- Submit Button --> */}
            {/* <button
              type="submit"
              className="bg-blue-500 text-white p-2  mr-5 rounded"
            >
              Apply Filters
            </button> */}
          </form>

          <div className="block md:flex items-center">
            <button
              onClick={decrement}
              className="p-2 rounded-l border-2  focus:outline-none"
            >
              <span className="text-2xl font-bold">-</span>
            </button>
            <span className="px-4 py-2 text-lg border rounded border-green-800 bg-gray-200  font-semibold w-16 text-center">
              {count}
            </span>
            <button
              onClick={increment}
              className="p-2 rounded-r border-2  focus:outline-none"
            >
              <span className="text-2xl font-bold">+</span>
            </button>

            <div className="ml-0 md:mt-0 mt-4 md:ml-10  ">
              <button
                type="submit"
                onClick={handleClick}
                className=" border-green-800 border-2 hover:bg-gray-100 p-2 md:p-4  mr-5 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Product;
