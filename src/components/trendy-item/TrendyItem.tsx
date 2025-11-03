"use client";
import React from "react";
import "./trendyitem.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const products = [
  {
    id: 1,
    name: "Suspendisse id luctus metus",
    tag: "essential",
    price: 6.0,
    image:
      "https://essential.oceanwp.org/wp-content/uploads/2016/08/4-300x300.png",
    thumbs: [
      "https://essential.oceanwp.org/wp-content/uploads/2016/08/4-300x300.png",
      "https://essential.oceanwp.org/wp-content/uploads/2016/08/5-300x300.png",
      "https://essential.oceanwp.org/wp-content/uploads/2016/08/6-300x300.png",
    ],
  },
  {
    id: 2,
    name: "Mauris malesuada odio",
    tag: "essential",
    price: 6.0,
    image:
      "https://essential.oceanwp.org/wp-content/uploads/2016/08/5-300x300.png",
    thumbs: [
      "https://essential.oceanwp.org/wp-content/uploads/2016/08/5-300x300.png",
      "https://essential.oceanwp.org/wp-content/uploads/2016/08/4-300x300.png",
      "https://essential.oceanwp.org/wp-content/uploads/2016/08/6-300x300.png",
    ],
  },
  {
    id: 3,
    name: "Fusce egestas odio",
    tag: "essential",
    price: 6.0,
    image:
      "https://essential.oceanwp.org/wp-content/uploads/2016/08/6-300x300.png",
    thumbs: [
      "https://essential.oceanwp.org/wp-content/uploads/2016/08/6-300x300.png",
      "https://essential.oceanwp.org/wp-content/uploads/2016/08/4-300x300.png",
      "https://essential.oceanwp.org/wp-content/uploads/2016/08/5-300x300.png",
    ],
  },
  {
    id: 4,
    name: "Vitae augue scelerisque",
    tag: "essential",
    price: 6.0,
    image:
      "https://essential.oceanwp.org/wp-content/uploads/2016/08/3-300x300.png",
    thumbs: [
      "https://essential.oceanwp.org/wp-content/uploads/2016/08/3-300x300.png",
      "https://essential.oceanwp.org/wp-content/uploads/2016/08/5-300x300.png",
      "https://essential.oceanwp.org/wp-content/uploads/2016/08/4-300x300.png",
    ],
  },
];

const TrendyItem = () => {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleProductClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <section className="trendy">
      <h2 className="section-title">Trendy Items</h2>

      <div className="trendy-grid">
        {products.map((product) => (
          <div className="trendy-card" key={product.id}>
            <div
              className="card-img"
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.image} alt={product.name} />
              <div className="hover-overlay">
                <div className="hover-thumbs">
                  {product.thumbs.map((thumb, i) => (
                    <img key={i} src={thumb} alt={`thumb-${i}`} />
                  ))}
                </div>

                <button
                  className="add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
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
            <p className="tag">{product.tag}</p>
            <h3>{product.name}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendyItem;
