
"use client";

import { useState } from "react";
import Title from "./Title";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(email);
    setEmail("");
  };

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">

        <Title
          text1=""
          text2="Subscribe Now & Get 20% Off"
        />

        <p className="text-gray-500 text-sm md:text-base mt-3 mb-7">
          Subscribe to our newsletter and stay updated with
          our latest offers, products and exclusive deals.
        </p>

        <form
          onSubmit={submitHandler}
          className="flex flex-col sm:flex-row items-stretch gap-3 max-w-xl mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 min-w-0 px-5 py-4 border border-gray-300
            outline-none text-sm rounded-md focus:border-black
            transition-all"
          />

          <button
            type="submit"
            className="px-8 py-4 bg-black text-white text-sm
            font-medium rounded-md hover:bg-gray-800
            transition-all duration-300 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4">
          By subscribing, you agree to receive our newsletter.
        </p>

      </div>
    </section>
  );
};

export default NewsLetterBox;
