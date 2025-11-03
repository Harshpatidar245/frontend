"use client";
import React, { useEffect, useState } from "react";
import "./newitem.css";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { api } from "@/lib/api";

const NewItems = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { user, token } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNewItems = async () => {
      try {
        const res = await api.get("/products");
        setItems(res.data);
      } catch (err) {
        console.error("Error loading new items:", err);
      } finally {
        setLoading(false);
      }
    };
    loadNewItems();
  }, []);

  const handleAddToCart = async (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user || !token) {
      router.push("/login");
      return;
    }
    await addToCart(item);
  };

  const handleItemClick = (id: string | number) => router.push(`/product/${id}`);

  return (
    <section className="new-items">
      <h2 className="section-title">New Items</h2>
      <div className="divider">
        {Array(10)
          .fill("♦")
          .map((_, i) => (
            <span key={i} />
          ))}
      </div>

      <div className="items-grid">
        {loading ? (
          <p>Loading items...</p>
        ) : (
          items.map((item) => (
            <div
              className="item-card"
              key={item._id || item.id}
              onClick={() => handleItemClick(item._id || item.id)}
            >
              {item.stock === 0 && <span className="tag">OUT OF STOCK</span>}
              <div className="img-container">
                <img src={item.image} alt={item.name} className="main-img" />
                <div className="hover-overlay">
                  {item.stock > 0 && (
                    <button
                      className="add-btn"
                      onClick={(e) => handleAddToCart(item, e)}
                    >
                      ADD TO CART
                    </button>
                  )}
                  <div className="hover-icons">
                    <VisibilityIcon />
                    <FavoriteBorderIcon />
                  </div>
                </div>
              </div>
              <p className="item-category">{item.category || "essential"}</p>
              <h4 className="item-name">{item.name}</h4>
              <p className="item-price">${item.price?.toFixed(2) || "0.00"}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default NewItems;
