import { ShopContextProvider } from "@/context/ShopContext";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AdminContextProvider } from "@/context/AdminAuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Forever - E-Commerce",
  description: "Modern E-Commerce platform & Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AdminContextProvider>
          <ShopContextProvider>{children}</ShopContextProvider>
        </AdminContextProvider>
      </body>
    </html>
  );
}
