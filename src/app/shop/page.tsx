"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./Shop.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { api } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function ShopPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { user, token } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products using authorized API client
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (id: string) => router.push(`/product/${id}`);

  const handleAddToCart = async (product: any) => {
    try {
      if (!user || !token) {
        router.push("/login");
        return;
      }
      await addToCart(product); // context handles API call + state update
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="shop-page">
      <div className="shop-topbar">
        <h1 className="shop-title">Shop</h1>
        <div className="shop-breadcrumb">
          <Link href="/">🏠 Home</Link>
          <span>›</span>
          <span>Shop</span>
        </div>
      </div>

      <div className="controls-row">
        <div className="controls-left">
          <button className="view-btn active" title="Grid view">▦</button>
          <button className="view-btn" title="List view">≡</button>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product._id || product.id}
            className="product-card"
            onClick={() => handleProductClick(product._id || product.id)}
          >
            <div className="card-img">
              <img src={product.image} alt={product.name} />
              <div className="hover-overlay" onClick={(e) => e.stopPropagation()}>
                <button
                  className="add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  ADD TO CART
                </button>
                <div className="hover-icons">
                  <VisibilityIcon />
                  <FavoriteBorderIcon />
                </div>
              </div>
            </div>
            <p className="product-tag">{product.category}</p>
            <h3>{product.name}</h3>
            <p className="product-price">${product.price?.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
