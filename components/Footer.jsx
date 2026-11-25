import React from "react";
import Image from "next/image";
import Link from "next/link";
 
import { Copyright, Mail, Phone } from "lucide-react";
import { assets } from "@/public/frontend_assets/assets";

const Footer = () => {
  const year = 2026;

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-10 lg:gap-16 py-14">

          {/* Brand Section */}
          <div>
            <Link href="/">
              <Image
                src={assets.logo}
                alt="Forever Logo"
                width={130}
                height={50}
                className="w-32 h-auto mb-5"
              />
            </Link>

            <p className="text-sm leading-7 text-gray-500 max-w-md">
              Discover quality products at amazing prices.
              We are committed to providing the best shopping
              experience with excellent customer service.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-gray-900">
              Company
            </h3>

            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-black transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-black transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:text-black transition">
                  Delivery
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-black transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-gray-900">
              Get in Touch
            </h3>

            <ul className="flex flex-col gap-4 text-sm text-gray-500">
              <li className="flex items-center gap-3">
                <Phone size={17} />
                <a href="tel:+3216549875" className="hover:text-black">
                  +91 3216549875
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={17} />
                <a
                  href="mailto:32165416549564@gmail.com"
                  className="hover:text-black break-all"
                >
                  3265498745@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 py-5">
          <p className="text-sm text-gray-500 flex justify-center items-center gap-1 text-center">
            <Copyright size={15} />
            {year} Forever.com. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
