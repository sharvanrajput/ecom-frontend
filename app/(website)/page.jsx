import Banner from "@/components/Banner";
import BestSeller from "@/components/BestSeller";
import LatestCollection from "@/components/LatestCollection";
import NewsLetterBox from "@/components/NewsLetterBox";
import OurPolicy from "@/components/OurPolicy";
import React from "react";

export default function Home() {
  return (
    <>
      <Banner />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </>
  );
}
