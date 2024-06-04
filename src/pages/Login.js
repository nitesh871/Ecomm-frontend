import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo from "../images/logo.png";
import bg from "../images/bg.jpg";
import Navbar from "../components/Navbar";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { isFetching, error } = useSelector((state) => state.user);
  // console.log(data)
  
  const generateError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });

   

  const [redirect, setRedirect] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(dispatch,{email,password})
    navigate('/')
  };

  const bg = "https://cdn.wallpapersafari.com/9/1/AuYUVv.jpg";

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover  bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="flex items-center justify-center md:justify-start min-h-screen  bg-opacity-50">
            <div className="bg-gray-50 p-4 rounded-xl max-w-6xl md:max-w-3xl  mx-4 shadow-2xl">
              <form  className="">
                <div className="grid grid-cols-12">
                  <div className="text-center col-span-12 md:col-span-3 pt-6 md:pt-10 p-4">
                    <img
                      src={logo}
                      alt="Logo"
                      className="mx-auto"
                      style={{ height: "100px", width: "100px" }} // Adjust height and width as needed
                    />
                    <h1 className="text-md sm:text-lg py-4 md:text-2xl  mb-4 bg-gradient-to-br  from-blue-700  to-blue-700 text-transparent bg-clip-text font-bold font-serif">
                      Login Account
                    </h1>
                  </div>
                  <div className="col-span-12 md:col-span-9 pt-0 md:pt-16 p-2 md:p-4">
                  <div className="mb-4 ">
                    <input
                      type="email"
                      id="email"
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder=" Username"
                      className="w-full border rounded-md py-2 px-3"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      id="password"
                      onChange={(e)=>setPassword(e.target.value)}
                      placeholder=" Password"
                      className="w-full border rounded-md py-2 px-3"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-br from-blue-700  to-blue-700 text-white rounded-md py-2 px-3 hover:bg-green-600 transition duration-300"
                    style={{ height: "40px" }}
                    disabled={isFetching}
                  >
                    Login
                  </button>
                  </div>
                </div>
              </form>
              <div className="mt-3 text-center">
                <p>
                  Don't have an account?{" "}
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : "/register"
                    }
                    className="text-blue-500"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
              <ToastContainer className="custom-toast-container" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
