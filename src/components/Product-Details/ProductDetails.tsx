"use client";
import "./ProductDetails.css";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const { addToCart } = useCart();
  const { user, token } = useAuth();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    const productId = Array.isArray(id) ? id[0] : id;
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${productId}`);
        setProduct(res.data);
      } catch {
        setProduct(null);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user || !token) {
      router.push("/login");
      return;
    }
    await addToCart(product);
  };

  if (!product) return <div className="loading">Product not found.</div>;

  return (
    <div className="product-details">
      <h1 className="page-title">{product.name}</h1>

      <div className="product-main">
        <div className="product-image-section">
          <img
            src={product.image}
            alt={product.name}
            className="main-image"
          />

          <div className="thumbnail-row">
            <img src={product.image} alt="thumb1" className="thumb" />
            <img src={product.image} alt="thumb2" className="thumb" />
            <img src={product.image} alt="thumb3" className="thumb" />
          </div>
        </div>

        <div className="product-info-section">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-price">${product.price?.toFixed(2) || "0.00"}</p>
          <p className="product-short-desc">
            {product.description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."}
          </p>

          <div className="quantity-row">
            <button
              className="qty-btn"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <input
              type="number"
              className="quantity-input"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Number(e.target.value) || 1))
              }
            />
            <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>
              +
            </button>
            <button className="add-btn" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          </div>

          <p className="wishlist">♡ Add to Wishlist</p>
          <p className="category">
            <b>Category:</b> {product.category || "General"}
          </p>
        </div>
      </div>

      <div className="product-description-section">
        <h3>Description</h3>
        <p>
          {product.description ||
            "Aenean lectus elit, fermentum non, convallis id, sagittis at, neque. Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula."}
        </p>
      </div>
    </div>
  );
}
