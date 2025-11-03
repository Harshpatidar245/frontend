"use client";

import ProductDetails from "@/components/Product-Details/ProductDetails";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { id } = useParams();

  const key = Array.isArray(id) ? id[0] : id; // normalize id

  return (
    <div>
      <ProductDetails key={key} />
    </div>
  );
}
