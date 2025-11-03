"use client";
import "./ProductDetails.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { products } from "@/components/data/product";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const productId = Array.isArray(id) ? id[0] : id;
    const found = products.find((p) => p.id === productId);
    setProduct(found || null);
  }, [id]);

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="product-details">
      <div className="product-container">
        <img src={product.image} alt={product.name} className="details-image" />
        <div className="details-info">
          <h2>{product.name}</h2>
          <p className="details-price">${product.price}</p>
          <button className="add-to-cart">Add to Cart</button>
          <p className="details-description">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
