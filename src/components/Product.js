import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";

const Product = ({ item }) => {
  const iconStyle = { width: "40px", height: "40px" }; // Adjust as needed

  return (
    <div className="relative  group ">
      <div className="w-auto md:w-[50vh] md:h-[50vh] gap-2 ">
        <img
          src={item.img}
          className="w-full h-full p-10 object-cover"
          alt={item.title}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
        <div className="flex space-x-1 md:space-x-4 text-gray-500  ">
          <div
            className="cursor-pointer bg-white p-2 rounded-full hover:scale-110 transition-transform duration-200"
            style={iconStyle}
          >
            <ShoppingCartOutlinedIcon
              style={{ width: "100%", height: "100%" }}
            />
          </div>
            <div
              className="cursor-pointer bg-white p-2 rounded-full hover:scale-110 transition-transform duration-200"
              style={iconStyle}
            >
          <Link to={`/product/${item._id}`}>
              <SearchOutlinedIcon style={{ width: "100%", height: "100%" }} />
          </Link>
            </div>
          <div
            className="cursor-pointer bg-white p-2 rounded-full hover:scale-110 transition-transform duration-200"
            style={iconStyle}
          >
            <FavoriteBorderOutlinedIcon
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
