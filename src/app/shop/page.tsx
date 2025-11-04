"use client";
import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import "./Shop.css";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="loading">Loading products...</p>;

  return (
    <div className="shop-page">
      <h1 className="shop-title">Shop</h1>
      {products.length === 0 ? (
        <p className="empty">No products available.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="image-wrapper">
                <Image
                  src={product.image || "/placeholder.png"}
                  alt={product.name}
                  width={250}
                  height={250}
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <button
                  className="add-btn"
                  onClick={() => addToCart(product)}
                >
                  {user ? "Add to Cart" : "Login to Add"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
