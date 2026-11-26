"use client";

import { ShopContext } from "@/context/ShopContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function CartPage() {
  const {
    cartItems,
    products,
    cartHydrated,
    cartError,
    corrency,
    delevery_fee,
    updateCartQuantity,
    removeFromCart,
  } = useContext(ShopContext);

  const cartEntries = Object.entries(cartItems).flatMap(
    ([productId, sizes]) =>
      Object.entries(sizes).map(([size, quantity]) => ({
        productId,
        size,
        quantity,
        product: products.find((item) => item._id === productId),
      })),
  );
  const itemCount = cartEntries.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const subtotal = cartEntries.reduce(
    (total, item) =>
      total + (item.product ? item.product.price * item.quantity : 0),
    0,
  );
  const shipping = cartEntries.length > 0 ? delevery_fee : 0;
  const formatSize = (size) =>
    size === "one-size" ? "One size" : size.toUpperCase();

  if (!cartHydrated) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <p className="text-sm text-slate-500">Loading your cart...</p>
      </main>
    );
  }

  if (cartEntries.length === 0) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-md text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l2.2 11.1a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 2-1.6L21 8H6"
              />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
            Your cart is empty
          </h1>
          {cartError && (
            <p role="alert" className="mt-3 text-sm text-red-700">
              {cartError}
            </p>
          )}
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Browse the collections and add something you love.
          </p>
          <Link
            href="/collections"
            className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-600"
          >
            Browse collections
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
              Your selections
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Shopping cart
            </h1>
          </div>
          <p className="text-sm text-slate-500" aria-live="polite">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
        {cartError && (
          <p
            role="alert"
            className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          >
            {cartError}
          </p>
        )}

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section aria-label="Cart items" className="divide-y divide-slate-200">
            {cartEntries.map((item) => (
              <article
                key={`${item.productId}-${item.size}`}
                className="flex gap-4 py-5 sm:items-center sm:gap-6"
              >
                {item.product?.image?.[0] ? (
                  <Link
                    href={`/product/${item.productId}`}
                    className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:size-28"
                  >
                    <Image
                      src={item.product.image[0]}
                      alt={item.product.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </Link>
                ) : item.product ? (
                  <div className="flex size-24 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-400 sm:size-28">
                    No image
                  </div>
                ) : (
                  <div className="flex size-24 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-400 sm:size-28">
                    Unavailable
                  </div>
                )}

                <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-medium text-slate-900 sm:text-base">
                      {item.product?.name ?? "Unavailable product"}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.product
                        ? `${item.product.category} · ${item.product.subCategory}`
                        : "This product is no longer available"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Size: {formatSize(item.size)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 sm:flex-nowrap sm:justify-end sm:gap-5">
                    <div className="flex shrink-0 items-center rounded-full border border-slate-200">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.product?.name ?? "unavailable product"}`}
                        onClick={() =>
                          updateCartQuantity(
                            item.productId,
                            item.size,
                            item.quantity - 1,
                          )
                        }
                        className="size-9 text-slate-600 transition-colors hover:text-orange-600"
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center text-sm text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.product?.name ?? "unavailable product"}`}
                        onClick={() =>
                          updateCartQuantity(
                            item.productId,
                            item.size,
                            item.quantity + 1,
                          )
                        }
                        className="size-9 text-slate-600 transition-colors hover:text-orange-600"
                      >
                        +
                      </button>
                    </div>

                    <p className="min-w-16 text-right text-sm font-medium text-slate-900">
                      {item.product
                        ? `${corrency}${item.product.price * item.quantity}`
                        : "—"}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.productId, item.size)
                      }
                      className="shrink-0 whitespace-nowrap text-xs text-slate-500 underline underline-offset-4 transition-colors hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-slate-950">
              Order summary
            </h2>
            <div className="mt-5 space-y-4 border-b border-slate-200 pb-5 text-sm">
              <div className="flex justify-between gap-4 text-slate-600">
                <span>Subtotal</span>
                <span>{corrency}{subtotal}</span>
              </div>
              <div className="flex justify-between gap-4 text-slate-600">
                <span>Delivery</span>
                <span>{corrency}{shipping}</span>
              </div>
            </div>
            <div className="flex justify-between gap-4 py-5 text-base font-semibold text-slate-950">
              <span>Total</span>
              <span>{corrency}{subtotal + shipping}</span>
            </div>
            <Link
              href="/place-order"
              className="flex w-full justify-center rounded-full bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Continue to checkout
            </Link>
            <Link
              href="/collections"
              className="mt-4 flex justify-center text-sm text-slate-500 transition-colors hover:text-slate-900"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
