"use client";

import { ADMIN_API_URL } from "@/lib/admin-api";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const CART_STORAGE_KEY = "shop-cart";

export const ShopContext = createContext();

function normalizeProduct(product) {
  const image = Array.isArray(product.images)
    ? product.images
        .map((item) => (typeof item === "string" ? item : item?.url))
        .filter(Boolean)
    : Array.isArray(product.image)
      ? product.image
      : [];

  return {
    ...product,
    _id: String(product._id),
    price: Number(product.price ?? product.prise),
    image,
  };
}

function normalizeCart(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value)
      .map(([productId, sizes]) => [
        productId,
        sizes && typeof sizes === "object" && !Array.isArray(sizes)
          ? Object.fromEntries(
              Object.entries(sizes).filter(
                ([, quantity]) => Number.isInteger(quantity) && quantity > 0,
              ),
            )
          : {},
      ])
      .filter(([, sizes]) => Object.keys(sizes).length > 0),
  );
}

export const ShopContextProvider = ({ children }) => {
  const corrency = "$";
  const delevery_fee = 10;
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [productsRefreshKey, setProductsRefreshKey] = useState(0);
  const [cartItems, setCartItems] = useState({});
  const [cartHydrated, setCartHydrated] = useState(false);
  const [cartError, setCartError] = useState("");
  const [token, setToken] = useState("");
  const route = useRouter()

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${ADMIN_API_URL}/api/product/all`, {
          signal: controller.signal,
        });
        const result = await response.json();

        if (
          !response.ok ||
          !result.success ||
          !Array.isArray(result.products)
        ) {
          throw new Error(result.message || "Could not load products.");
        }

        setProducts(result.products.map(normalizeProduct));
        setProductsError("");
      } catch (error) {
        if (!controller.signal.aborted) {
          setProductsError(error.message || "Could not load products.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setProductsLoading(false);
        }
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [productsRefreshKey]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCartItems(normalizeCart(JSON.parse(savedCart)));
      }
    } catch (error) {
      console.error("Could not restore the saved shop session.", error);
      setCartError("Your saved cart could not be restored.");
    } finally {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCartHydrated(true);
    }
  }, []);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setToken(savedToken);
      }
    } catch (error) {
      console.error("Could not restore the saved shop session.", error);
    }
  }, []);

  useEffect(() => {
    if (!cartHydrated) return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Could not persist the shopping cart.", error);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCartError("Cart changes could not be saved in this browser.");
    }
  }, [cartHydrated, cartItems]);

  const refreshProducts = () => {
    setProductsLoading(true);
    setProductsRefreshKey((key) => key + 1);
  };

  const updateToken = (newToken) => {
    const nextToken = newToken || "";
    setToken(nextToken);

    try {
      if (nextToken) {
        localStorage.setItem("token", nextToken);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Could not update the saved shop session.", error);
    }
  };

  const addToCart = (productId, size) => {
    if (!token) {
      alert("Login for Add to cart");
      route.push("/login")
      return;
    }

    const product = products.find((item) => item._id === productId);
    if (!product) {
      setCartError("This product is not available to add to your cart.");
      return false;
    }

    const selectedSize = size
      ? product.sizes?.find(
          (productSize) =>
            productSize.toLowerCase() === String(size).toLowerCase(),
        )
      : undefined;

    if (product.sizes?.length && !selectedSize) {
      setCartError("Choose a valid size before adding this product.");
      return false;
    }

    const sizeKey = selectedSize ? selectedSize.toLowerCase() : "one-size";
    setCartError("");
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

    return true;
  };

  const productCount = () =>
    Object.values(cartItems).reduce(
      (total, sizes) =>
        total +
        Object.values(sizes).reduce(
          (sizeTotal, quantity) => sizeTotal + quantity,
          0,
        ),
      0,
    );

  const updateCartQuantity = (productId, size, quantity) => {
    const nextQuantity = Number(quantity);
    if (!Number.isInteger(nextQuantity)) {
      setCartError("Cart quantity must be a whole number.");
      return;
    }

    const sizeKey = size ? String(size).toLowerCase() : "one-size";
    setCartError("");
    setCartItems((currentItems) => {
      const productItems = currentItems[productId];
      if (!productItems || productItems[sizeKey] === undefined) {
        return currentItems;
      }

      const updatedProductItems = { ...productItems };
      if (nextQuantity <= 0) {
        delete updatedProductItems[sizeKey];
      } else {
        updatedProductItems[sizeKey] = nextQuantity;
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

  const clearCart = () => {
    setCartError("");
    setCartItems({});
  };

  const value = {
    products,
    productsLoading,
    productsError,
    refreshProducts,
    corrency,
    delevery_fee,
    cartItems,
    cartHydrated,
    cartError,
    productCount,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    token,
    setToken: updateToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
