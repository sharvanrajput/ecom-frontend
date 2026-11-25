"use client";

import { dummyproducts } from "@/public/frontend_assets/assets";
import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const corrency = "$";
  const delevery_fee = 10;
  const products = dummyproducts;
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedToken) setToken(savedToken);
  }, []);

  const updateToken = (newToken) => {
    setToken(newToken || "");
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

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

  const productCount = () => {
    let sum = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        sum += cartItems[items][item];
      }
    }
    return sum;
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

  const value = {
    products,
    corrency,
    delevery_fee,
    cartItems,
    productCount,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    token,
    setToken: updateToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
