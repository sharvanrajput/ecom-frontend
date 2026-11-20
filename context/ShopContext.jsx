// import { products } from "@/assets/assets";
"use client";
import { dummyproducts } from "@/public/frontend_assets/assets";
import { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const corrency = "$";
  const delevery_fee = 10;
  const products = dummyproducts;
  const [cartItems, setCartItems] = useState({});

  const addToCart = (productId, size) => {
    const sizeKey = size ? size.toLowerCase() : "one-size";

    setCartItems((currentItems) => {
      const productItems = currentItems[productId] ?? {};

      return {
        ...currentItems,
        [productId]: {
          ...productItems,
          [sizeKey]: (productItems[sizeKey] ?? 0) + 1,
        },
      };
    });
  };

  const updateCartQuantity = (productId, size, quantity) => {
    const sizeKey = size ? size.toLowerCase() : "one-size";

    setCartItems((currentItems) => {
      const productItems = currentItems[productId];
      if (!productItems || productItems[sizeKey] === undefined) {
        return currentItems;
      }

      const updatedProductItems = { ...productItems };
      if (quantity <= 0) {
        delete updatedProductItems[sizeKey];
      } else {
        updatedProductItems[sizeKey] = quantity;
      }

      const updatedCart = { ...currentItems };
      if (Object.keys(updatedProductItems).length === 0) {
        delete updatedCart[productId];
      } else {
        updatedCart[productId] = updatedProductItems;
      }

      return updatedCart;
    });
  };

  const removeFromCart = (productId, size) =>
    updateCartQuantity(productId, size, 0);

  console.log(cartItems);

  const value = {
    products,
    corrency,
    delevery_fee,
    cartItems,
    addToCart,
    updateCartQuantity,
    removeFromCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
