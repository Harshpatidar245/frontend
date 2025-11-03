"use client";
import React from "react";
import "./newitem.css";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const items = [
  {
    id: 1,
    name: "Class aptent taciti socios",
    price: 6.0,
    img: "https://essential.oceanwp.org/wp-content/uploads/2016/08/3-300x300.png",
    tag: "",
  },
  {
    id: 2,
    name: "Maecenas varius maximus",
    price: 6.0,
    img: "https://essential.oceanwp.org/wp-content/uploads/2016/08/4-300x300.png",
    tag: "",
  },
  {
    id: 3,
    name: "Vestibulum dolor eleifend",
    price: 6.0,
    img: "https://essential.oceanwp.org/wp-content/uploads/2016/08/6-300x300.png",
    tag: "OUT OF STOCK",
  },
  {
    id: 4,
    name: "Sit amet lorem rutrum",
    price: 6.0,
    img: "https://essential.oceanwp.org/wp-content/uploads/2016/08/5-300x300.png",
    tag: "",
  },
];

const NewItems = () => {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleItemClick = (id: number) => {
    router.push(`/product/${id}`);
  };

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
        {items.map((item) => (
          <div
            className="item-card"
            key={item.id}
            onClick={() => handleItemClick(item.id)}
          >
            {item.tag && <span className="tag">{item.tag}</span>}
            <div className="img-container">
              <img src={item.img} alt={item.name} className="main-img" />
              <div className="hover-overlay">
                <div className="hover-thumbs">
                  <img src={item.img} alt="thumb1" />
                  <img src={item.img} alt="thumb2" />
                  <img src={item.img} alt="thumb3" />
                </div>

                {!item.tag && (
                  <button
                    className="add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.img,
                      });
                    }}
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
            <p className="item-category">essential</p>
            <h4 className="item-name">{item.name}</h4>
            <p className="item-price">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewItems;
