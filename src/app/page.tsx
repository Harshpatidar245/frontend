"use client";

import BestCustomer from "@/components/best-customer/BestCustomer";
import Footer from "@/components/footer/Footer";
import HeroBanner from "@/components/Hero-Banner/HeroBanner";
import Navbar from "@/components/navbar/Navbar";
import NewItems from "@/components/new-item/NewItem";
import NewsFromBlog from "@/components/news/NewsFromBlog";
import Poster from "@/components/poster/Poster";
import Services from "@/components/services/Services";
import TrendyItem from "@/components/trendy-item/TrendyItem";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Poster />
      <Services />
      <TrendyItem />
      <HeroBanner />
      <NewItems />
      <BestCustomer />
      <NewsFromBlog />
      {/* <Footer /> */}
    </>
  );
}
