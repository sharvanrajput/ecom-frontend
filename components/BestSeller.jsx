"use client";
import React, { useContext, useEffect, useState } from "react";

import ProductItem from "./ProductItem";
import { ShopContext } from "@/context/ShopContext";
import Title from "./Title";

const BestSeller = () => {
  const { products } = useContext(ShopContext);

  const [bestproducts, setBestProducts] = useState([]);
  useEffect(() => {
    const bestproduct = products.filter(
      (product) => product.bestseller == true,
    );
    setBestProducts(bestproduct.slice(0, 5));
  }, [products]);

  return (
    <section className="py-10">
      <div   className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center py-8 ">
          <Title text1={"BEST"} text2={"SELLER"} />
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            enim.
          </p>
        </div>

        {/* <div className="grid"> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {bestproducts.map((item) => (
            <div className="px-2" key={item.id}>
              <ProductItem
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            </div>
          ))}
        </div>
        {/* </div> */}
      </div>
    </section>
  );
};

export default BestSeller;
