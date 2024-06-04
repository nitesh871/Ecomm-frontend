import React from "react";
import Search from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../redux/apiCalls";

const Navbar = ({userId}) => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation();
  const quantity = useSelector((state) => state.cart.quantity);
  const id = location.pathname.split("/")[3];


  // console.log(quantity);

  
  const handleLogout = async() => {
    console.log('userId:', id); // Check if userId is undefined

    // Implement logout functionality here, e.g., clearing user session, local storage, etc.
    if (userId) {
      await dispatch(logOut(userId));
      console.log(userId)
      navigate('/register'); // Redirect to home page after logout
    } else {
      console.error('User ID is not defined');
    }
  };

  return (
    <div className="h-[60px] flex items-center justify-center">
      <div className="w-full px-5 flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <div className="text-base cursor-pointer hidden md:flex  items-center">
            En
          </div>
          <div className="flex items-center rounded-lg md:ml-6 border border-gray-300 p-1">
            <input className="border-none outline-none flex-grow w-full md:w-auto" />
            <Search style={{ color: "gray", fontSize: 18 }} />
          </div>
        </div>
        <div className="flex-1 text-center">
          <h1 className="font-bold text-3xl">N.k</h1>
        </div>
        <div className="flex-1 flex items-center justify-end">
        {!user && !user.isAdmin ?(
        <>
          <div className="text-base cursor-pointer ml-2 md:ml-6">
            
          <Link to="/register" className="text-base cursor-pointer ml-2 md:ml-6" onClick={handleLogout}>LogOut</Link>
            {/* Implement logout functionality here */}
          </div>
          {/* Redirect to the home page after logging out */}
        </>
     ) : (
        <> 
          <div className="text-base cursor-pointer ml-2 md:ml-6">
            <Link to="/register">Register</Link>
          </div>
          <div className="text-base cursor-pointer ml-2 md:ml-6">
            <Link to="/login">Login</Link>
          </div>
        </>
      )}
          <div className="text-base cursor-pointer ml-2 md:ml-6">
            <Link to="/cart">
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon color="action" />
              </Badge>
            </Link>
          </div>
        </div>
      </div>
     </div>
  );
};

export default Navbar;
