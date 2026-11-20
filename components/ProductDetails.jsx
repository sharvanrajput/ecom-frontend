"use client";

import { ShopContext } from "@/context/ShopContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

export default function ProductDetails({ productId }) {
  const { products, corrency, addToCart } = useContext(ShopContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  if (products.length === 0) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-24">
        <p className="text-sm text-slate-500">Loading product details...</p>
      </main>
    );
  }

  const product = products.find((item) => item._id === productId);

  if (!product) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">
          Product not found
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          This product may have been removed or the link may be incorrect.
        </p>
        <Link
          href="/collections"
          className="mt-6 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-600"
        >
          Browse collections
        </Link>
      </main>
    );
  }

  const sizes = product.sizes ?? [];
  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      return;
    }

    addToCart(product._id, selectedSize);
    setAddedToCart(true);
  };

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Link
          href="/collections"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
        >
          <span aria-hidden="true">&larr;</span>
          Back to collections
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <section
            aria-label="Product images"
            className={`grid gap-3 ${
              product.image.length > 1
                ? "grid-cols-[56px_minmax(0,1fr)] sm:grid-cols-[80px_minmax(0,1fr)]"
                : "grid-cols-1"
            }`}
          >
            {product.image.length > 1 && (
              <div className="flex flex-col gap-3">
                {product.image.map((image, index) => (
                  <button
                    key={`${product._id}-image-${index}`}
                    type="button"
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={selectedImage === index}
                    onClick={() => {
                      setSelectedImage(index);
                      setAddedToCart(false);
                    }}
                    className={`relative aspect-square w-full overflow-hidden rounded-xl border-2 bg-slate-100 ${
                      selectedImage === index
                        ? "border-orange-500"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={product.image[selectedImage]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover"
              />
            </div>
          </section>

          <section className="lg:py-5">
            <p className="text-sm font-medium text-orange-600">
              {product.category} <span className="px-1 text-slate-300">/</span>{" "}
              {product.subCategory}
            </p>
            <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-3xl">
              {product.name}
            </h1>
            <p className="mt-5 text-2xl font-medium text-slate-950">
              {corrency}
              {product.price}
            </p>

            <div className="my-7 border-t border-slate-200" />

            <p className="text-sm leading-7 text-slate-600">
              {product.description}
            </p>

            {sizes.length > 0 && (
              <fieldset className="mt-8">
                <legend className="mb-3 text-sm font-medium text-slate-900">
                  Select size
                </legend>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={selectedSize === size}
                      onClick={() => {
                        setSelectedSize(size);
                        setAddedToCart(false);
                      }}
                      className={`min-w-12 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={sizes.length > 0 && !selectedSize}
              className="mt-8 w-full rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto sm:min-w-56"
            >
              Add to cart
            </button>
            {sizes.length > 0 && !selectedSize && (
              <p className="mt-2 text-xs text-slate-500">
                Choose a size to add this product to your cart.
              </p>
            )}
            {addedToCart && (
              <p
                className="mt-3 text-sm font-medium text-emerald-700"
                role="status"
              >
                Added to cart.
              </p>
            )}

            <div className="mt-8 space-y-3 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
              <p>Category: {product.category}</p>
              <p>Subcategory: {product.subCategory}</p>
              <p>
                Available sizes:{" "}
                {sizes.length > 0 ? sizes.join(", ") : "One size"}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
