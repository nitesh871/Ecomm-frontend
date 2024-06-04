import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import LoaderScreen from "../assests/Loader";
import {
  faUser,
  faEnvelope,
  faLock,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import InputWithIcon from "../components/InputFields";
import axios from "axios";
import Navbar from "../components/Navbar";
// import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleValidation = (values) => {
    const { userName, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error("password and confirmPassword should be same", toastOptions);
      return false;
    }
    if (userName.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    }
    if (password.length < 8) {
      toast.error(
        "password should be equal and greater than 8 characters",
        toastOptions
      );
      return false;
    }
    if (!email) {
      toast.error("email is required ", toastOptions);
      return false;
    }
    return true;
  };

  const generateError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [redirect, setRedirect] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call the handleValidation function and get validation errors
    const validationErrors = handleValidation(values);

    // If there are validation errors, handle them (e.g., display error messages) and exit function
    if (validationErrors){
      try {
        const  data  = await axios.post("http://localhost:5000/register", values, { withCredentials: true });
        console.log("data", data);

        // Optionally, reset the form fields after successful registration
        setValues({
            userName: '',
            email: '',
            password: '',
            confirmPassword:''
        });

        console.log(data);
        setLoading(true);

        if (data) {
            if (data.errors) {
                const { email, password } = data.errors;
                if (email) {
                    generateError(email);
                } else if (password) {
                    generateError(password);
                }
            } else {

              const user = data.data.user
              // Debug: log the entire data object
              console.log('API response data:', user);
              localStorage.setItem("chat-app-user", JSON.stringify(user));

            }
          }
          navigate('/login')
    } catch (err) {
        console.log("Validation failed");
    }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the state object with the new value
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const bg = "https://cdn.wallpapersafari.com/9/1/AuYUVv.jpg";

  return (
    <div className="font-custom">
      <Navbar/>
      <div className="relative min-h-screen">
      <div
        className="absolute inset-0  bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex items-center justify-start min-h-screen  bg-opacity-50">
          <div className=" bg-white rounded-2xl w-full max-w-4xl ml-2 shadow-2xl md:p-16 p-2 ">
            <div className="p-10">
            <h1 className="text-xl md:text-3xl mb-4  bg-gradient-to-br from-blue-700  to-blue-700 text-transparent bg-clip-text font-bold ">
              Register Account
            </h1>
            {/* {message && <Message variant="danger">{message}</Message>}
  {error && <Message variant="danger">{error}</Message>} */}
            {/* {loading && <Loader />} */}
            <form
              className="grid grid-cols-2 md:gap-x-10 gap-1 md:gap-2"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="col-span-2  md:col-span-2">
                <label htmlFor="userName" className="block font-medium ">
                  UserName
                </label>

                <InputWithIcon
                  icon={faUser}
                  id="userName"
                  name="userName" // Add name attribute
                  type="text"
                  placeholder="Enter User Name"
                  onChange={handleChange}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  className="w-full flex-1 border  rounded-md py-2 px-3"
                  required
                />
              </div>

              <div className="col-span-2 sm:col-span-2 md:col-span-2">
                <label htmlFor="email" className="block font-medium">
                  Email Address
                </label>

                <InputWithIcon
                  icon={faEnvelope}
                  id="email"
                  name="email" // Add name attribute
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                  className="w-full border rounded-md py-2 px-3"
                  autoComplete="email" // Add autocomplete attribute for email field
                  required
                />
              </div>

              <div className="col-span-2 sm:col-span-1 md:col-span-1">
                <label htmlFor="password" className="block font-medium">
                  Password
                </label>
                <InputWithIcon
                  icon={faLock}
                  id="password"
                  name="password" // Add name attribute
                  type="password"
                  placeholder="Enter Password"
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3"
                  autoComplete="new-password" // Add autocomplete attribute to disable autofill
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1 md:col-span-1">
                <label htmlFor="password" className="block font-medium">
                  Confirm Password
                </label>
                <InputWithIcon
                  icon={faCheck}
                  id="password"
                  name="confirmPassword" // Add name attribute
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                  className="w-full border rounded-md py-2 px-3"
                  autoComplete="new-password" // Add autocomplete attribute to disable autofill
                  required
                />
              </div>

              <div className="relative text-center col-span-2  bg-gradient-to-br from-blue-700  to-blue-700 text-white  rounded-md py-1 md:py-2 px-3 hover:bg-green-600 transition duration-300">
              <button
                type="submit"
                className=""
                style={{ height: "40px" }}
              >
                {loading ? (
                  <LoaderScreen className="absolute inset-0 m-auto" />
                ) : (
                  "Sign up"
                )}
              </button>
              </div>
            </form>

            <div className="mt-3 text-center">
              <p>
                Already have an account?{" "}
                <Link
                  to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  className="text-blue-500"
                >
                  Sign In
                </Link>
              </p>
            </div>
            <ToastContainer className="custom-toast-container" />
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Register;
