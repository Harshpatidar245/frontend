"use client";
import React, { useEffect, useState } from "react";
import "./trendyitem.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

const TrendyItem = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { user, token } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleProductClick = (id: string | number) =>
    router.push(`/product/${id}`);

  const handleAddToCart = async (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user || !token) {
      router.push("/account");
      return;
    }
    await addToCart(product);
  };

  return (
    <section className="trendy">
      <h2 className="section-title">Trendy Items</h2>

      <div className="trendy-grid">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <div className="trendy-card" key={product._id || product.id}>
              <div
                className="card-img"
                onClick={() => handleProductClick(product._id || product.id)}
              >
                <img src={product.image} alt={product.name} />
                <div className="hover-overlay">
                  <button
                    className="add-btn"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    ADD TO CART
                  </button>
                  <div className="hover-icons">
                    <VisibilityIcon />
                    <FavoriteBorderIcon />
                  </div>
                </div>
              </div>
              <p className="tag">{product.tag || "essential"}</p>
              <h3>{product.name}</h3>
              <p className="price">${product.price?.toFixed(2) || "0.00"}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TrendyItem;
