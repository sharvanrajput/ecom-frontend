"use client";

import { assets } from "@/public/frontend_assets/assets";
import { ShopContext } from "@/context/ShopContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

const inputClassName =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

const paymentMethods = [
  { id: "razorpay", label: "Razorpay", logo: assets.razorpay_logo },
  { id: "stripe", label: "Stripe", logo: assets.stripe_logo },
  { id: "cod", label: "Cash on delivery" },
];

export default function PlaceOrderPage() {
  const { cartItems, products, corrency, delevery_fee } =
    useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const cartEntries = Object.entries(cartItems).flatMap(
    ([productId, sizes]) =>
      Object.entries(sizes).map(([size, quantity]) => ({
        productId,
        size,
        quantity,
        product: products.find((item) => item._id === productId),
      })),
  );
  const itemCount = cartEntries.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartEntries.reduce(
    (total, item) =>
      total + (item.product ? item.product.price * item.quantity : 0),
    0,
  );
  const shipping = cartEntries.length > 0 ? delevery_fee : 0;
  const total = subtotal + shipping;
  const formatSize = (size) =>
    size === "one-size" ? "One size" : size.toUpperCase();

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
            Your bag is waiting
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Add something you love before heading to checkout.
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmissionMessage(
      "Your details are ready. Order placement and payment processing are not connected yet.",
    );
  };

  return (
    <main className="flex-1 bg-slate-50/70">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
            Almost yours
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Add your delivery details and choose how you would like to pay.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-orange-50 text-sm font-semibold text-orange-600">
                  1
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">
                    Delivery information
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-500">
                    Where should we send your order?
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">
                  First name
                  <input
                    autoComplete="given-name"
                    className={inputClassName}
                    name="firstName"
                    placeholder="Your first name"
                    required
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Last name
                  <input
                    autoComplete="family-name"
                    className={inputClassName}
                    name="lastName"
                    placeholder="Your last name"
                    required
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Email address
                  <input
                    autoComplete="email"
                    className={inputClassName}
                    name="email"
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Phone number
                  <input
                    autoComplete="tel"
                    className={inputClassName}
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    required
                    type="tel"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                  Street address
                  <input
                    autoComplete="street-address"
                    className={inputClassName}
                    name="address"
                    placeholder="House number and street"
                    required
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  City
                  <input
                    autoComplete="address-level2"
                    className={inputClassName}
                    name="city"
                    placeholder="City"
                    required
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  State / Province
                  <input
                    autoComplete="address-level1"
                    className={inputClassName}
                    name="state"
                    placeholder="State or province"
                    required
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  ZIP / Postal code
                  <input
                    autoComplete="postal-code"
                    className={inputClassName}
                    name="postalCode"
                    placeholder="Postal code"
                    required
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Country
                  <input
                    autoComplete="country-name"
                    className={inputClassName}
                    name="country"
                    placeholder="Country"
                    required
                  />
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-orange-50 text-sm font-semibold text-orange-600">
                  2
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">
                    Payment method
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-500">
                    Choose your preferred way to pay.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                      paymentMethod === method.id
                        ? "border-orange-500 bg-orange-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      checked={paymentMethod === method.id}
                      className="size-4 accent-orange-600"
                      name="paymentMethod"
                      onChange={() => {
                        setPaymentMethod(method.id);
                        setSubmissionMessage("");
                      }}
                      type="radio"
                      value={method.id}
                    />
                    <span className="flex-1 text-sm font-medium text-slate-800">
                      {method.label}
                    </span>
                    {method.logo ? (
                      <Image
                        src={method.logo}
                        alt={`${method.label} logo`}
                        className="h-7 w-20 object-contain"
                      />
                    ) : (
                      <span className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                        Pay on delivery
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </section>

            <div className="space-y-3">
              <button
                className="w-full rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                type="submit"
              >
                Place order · {corrency}
                {total}
              </button>
              {submissionMessage && (
                <p
                  aria-live="polite"
                  className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900"
                >
                  {submissionMessage}
                </p>
              )}
              <p className="text-center text-xs text-slate-500">
                Your information is used only to prepare this order.
              </p>
            </div>
          </form>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-950">
                Order summary
              </h2>
              <span className="text-xs text-slate-500">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="mt-5 max-h-72 space-y-4 overflow-y-auto">
              {cartEntries.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-3"
                >
                  {item.product ? (
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={item.product.image[0]}
                        alt={item.product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[10px] text-slate-400">
                      Unavailable
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-slate-800">
                      {item.product?.name ?? "Unavailable product"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {formatSize(item.size)} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-medium text-slate-800">
                    {item.product
                      ? `${corrency}${item.product.price * item.quantity}`
                      : "—"}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3 border-t border-slate-200 pt-5 text-sm">
              <div className="flex justify-between gap-4 text-slate-600">
                <span>Subtotal</span>
                <span>
                  {corrency}
                  {subtotal}
                </span>
              </div>
              <div className="flex justify-between gap-4 text-slate-600">
                <span>Delivery</span>
                <span>
                  {corrency}
                  {shipping}
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-between gap-4 border-t border-slate-200 pt-4 text-base font-semibold text-slate-950">
              <span>Total</span>
              <span>
                {corrency}
                {total}
              </span>
            </div>
            <Link
              href="/cart"
              className="mt-5 block text-center text-sm text-slate-500 transition-colors hover:text-slate-900"
            >
              Edit your bag
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
