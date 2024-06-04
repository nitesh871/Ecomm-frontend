import React, { useEffect, useState } from "react";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import { publicRequest, userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const Products = ({ cat, filters, sort }) => {
  // console.log(cat,filters,sort)

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const accessToken = useSelector((state)=>state.user.currentUser.accessToken)
  // console.log('token',accessToken)

  // Fetch products on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await userRequest.get(
          cat ? `/api/products?category=${cat}` : "/api/products",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setProducts(res.data);
        console.log("products", res.data);
      } catch (err) {
        console.log("Error fetching products", err);
      }
    };

    getProducts();
  }, [cat,accessToken]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt));
    } else if (sort === "asc") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else if (sort === "desc") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <div className="flex flex-wrap m-1 p-2 md:p-10 items-center justify-center">
      {cat ? filteredProducts.map((item) => {
        return <Product item={item} key={item.id} />;
      }) : products.map((item) => {
        return <Product item={item} key={item.id} />;
      })}
    </div>
  );
};

export default Products;
