"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./Shop.css";
import { products } from "@/components/data/product";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ShopPage() {
  const router = useRouter();

  const handleProductClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="shop-page">
      {/* Top banner / title + breadcrumb */}
      <div className="shop-topbar">
        <h1 className="shop-title">Shop</h1>
        <div className="shop-breadcrumb">
          <Link href="/">🏠 Home</Link>
          <span>›</span>
          <span>Shop</span>
        </div>
      </div>

      {/* Controls: view icons, sorting dropdown and view count */}
      <div className="controls-row">
        <div className="controls-left">
          <button className="view-btn active" title="grid view">▦</button>
          <button className="view-btn" title="list view">≡</button>

          <div className="sort-wrap">
            <select className="sort-dropdown" defaultValue="default">
              <option value="default">Default sorting</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>

        <div className="controls-right">
          <span className="view-count">VIEW: <strong>12</strong> / 24 / <u>ALL</u></span>
        </div>
      </div>

      {/* Product grid */}
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product.id)}
            role="button"
          >
            <div className="card-img">
              <img src={product.image} alt={product.name} className="product-img" />
              <div className="hover-overlay" onClick={(e) => e.stopPropagation()}>
                <div className="hover-thumbs">
                  <img src={product.image} alt="thumb1" />
                  <img src={product.image} alt="thumb2" />
                  <img src={product.image} alt="thumb3" />
                </div>

                <div className="hover-icons">
                  <button className="icon-btn" title="Quick view">
                    <VisibilityIcon />
                  </button>
                  <button className="icon-btn" title="Add to wishlist">
                    <FavoriteBorderIcon />
                  </button>
                </div>

                <button
                  className="add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    // placeholder add to cart action
                    alert(`Add ${product.name} to cart`);
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>

            <p className="product-tag">{product.tag}</p>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <div className="product-rating">⭐⭐⭐⭐⭐</div>
          </div>
        ))}
      </div>
    </div>
  );
}
