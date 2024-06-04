import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Announcements from "../components/Announcements";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import { removeItem } from "../redux/cartRedux";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart);
  const [count, setCount] = useState("");

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const handlecontinueshopping = () => {
    navigate("/");
  };

  const KEY = process.env.REACT_APP_STRIPE;
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
    setIsOpen(false)
  };
  console.log(stripeToken)

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true); // Set isOpen state to true when button is clicked
  };

  const handleClose = () => {
    setIsOpen(false); // Set isOpen state to false when modal is closed
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };


  useEffect(()=>{
    const makeRequest = async ()=>{
      try{
          const res = await userRequest.post("/api/checkout/payment",{
            tokenId:stripeToken,
            amount:cart.total*100
          })
          console.log(res.data)
      }catch(err){}
    }
    makeRequest()
  },[stripeToken,cart.total])


  return (
    <div className="font-custom">
      <Navbar />
      <Announcements />

      <div className="m-2 md:m-10">
        <h1 className="text-4xl flex mt-4 mb-4 justify-center items-center text-gray-500">
          Your Bag
        </h1>
        <div className="md:m-4 m-2 justify-between hidden md:flex">
          <button
            type="submit"
            onClick={handlecontinueshopping}
            className="hover:bg-gray-200 border-2 text-sm md:text-md border-green-800 p-2 mr-2 md:mr-5 rounded"
          >
            CONTINUE SHOPPING
          </button>
          <div className="flex gap-4 ">
            <h3 className="text:xl md:text-2xl text-gray-500">
              Shoping bag (2)
            </h3>
            <h3 className="text:xl md:text-2xl text-gray-500">Wishlist (0)</h3>
          </div>
          <button
            type="submit"
            className="bg-black border-2 text-sm md:text-md text-white p-2 mr-2 md:mr-5 rounded"
          >
            CHECKOUT NOW
          </button>
        </div>

        <div className="grid grid-cols-7 ">
          <div className="md:col-span-5 col-span-7 p-2 md:p-2">
            {cart?.products?.map((product) => {
              console.log(product)
              return(
              <div className="block md:flex mb-6" key={product.id}>
               
                <div className=" flex gap-2 md:gap-8">
                  <img
                    src={product.img}
                    className="w-[40%] bg-blue-50 p-4 md:w-[25%] "
                  ></img>

                  <div className="p-4">
                    <div className="flex items-center  space-x-4">
                      <h3 className="font-semibold">Product:</h3>
                      <span>{product.title}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <h3 className="font-semibold">ID:</h3>
                      <span className="flex flex-wrap">{product._id}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <div
                        className={`w-6 h-6 rounded-full cursor-pointer`}
                        style={{ backgroundColor: product.color }}
                      ></div>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <h3 className="font-semibold">Size:</h3>
                      <span>{product.size.toString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center mt-4 justify-center gap-3 h-full">
                  <div className="flex items-center">
                    <button
                      onClick={decrement}
                      className="p-4 rounded-l   focus:outline-none"
                    >
                      <span className="text-2xl font-bold">-</span>
                    </button>
                    <span className="px-4 py-2 text-lg  rounded  bg-gray-200  font-semibold w-16 text-center">
                      {product.quantity}
                    </span>
                    <button
                      onClick={increment}
                      className="p-4 rounded-r   focus:outline-none"
                    >
                      <span className="text-2xl font-bold">+</span>
                    </button>
                  </div>
                  <h3 className="font-light text-4xl ">
                    ${product.price * product.quantity}
                  </h3>
                </div>
                <button 
              onClick={() => handleRemoveItem(product.id)} 
              className="text-red-500 text-end hover:text-red-700"
            >
              Remove
            </button>
                <hr className="my-4 mx-4 border-t-1 border-gray-200" />
              </div>
            ) })}
          </div>

          <div className="col-span-7 md:col-span-2 border-2  rounded-xl">
            <h2 className="text-3xl items-center flex justify-center m-10">
              Order summary
            </h2>
            <div className="m-4 text-xl ">
              <div className="flex gap-2">
                <h3>Subtotal</h3>
                <span>${cart.total}</span>
              </div>
              <div className="flex gap-2">
                <h3>Estimated shipping</h3>
                <span>$5.90</span>
              </div>
              <div className="flex gap-2">
                <h3>Shipping Discount</h3>
                <span>$-5.90</span>
              </div>
              <div className="flex gap-2">
                <h3>Total</h3>
                <span>${cart.total}</span>
              </div>
            </div>
            <div className="m-2">
              <button
                type="submit"
                className="bg-black border-2 text-md w-full text-white p-2  rounded"
                onClick={handleClick} // Call handleClick when button is clicked
              >
                CHECKOUT
              </button>
              {isOpen && (
                <StripeCheckout
                name="N.K Shop"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100} // Amount in cents
                token={onToken}
                stripeKey={KEY} // Your Stripe publishable key
                onClose={handleClose} // Call handleClose when modal is closed
                />
              )}
            </div>
          </div>
          
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
