"use client";

import { ShopContext } from "@/context/ShopContext";
import React, { useContext, useMemo } from "react";
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  const {
    products,
    productsLoading,
    productsError,
    refreshProducts,
  } = useContext(ShopContext);

  const latestProduct = useMemo(
    () => products.slice(0, 10),
    [products]
  );

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center py-8 text-3xl">
          <Title text1={"LATEST"} text2={"COLLECTION"} />
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Explore our newest arrivals and freshest designs for the season.
          </p>
        </div>

        {productsLoading ? (
          <p className="py-10 text-center text-sm text-gray-500">
            Loading products...
          </p>
        ) : productsError ? (
          <div className="py-10 text-center">
            <p role="alert" className="text-sm text-red-700">
              {productsError}
            </p>
            <button
              type="button"
              onClick={refreshProducts}
              className="mt-3 text-sm font-medium text-slate-700 underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {latestProduct.map((item) => (
              <div key={item._id}>
                <ProductItem
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestCollection;
