"use client";
import "./ProductDetails.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const { addToCart } = useCart();
  const { user, token } = useAuth();

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

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="product-details">
      <div className="product-container">
        <img src={product.image} alt={product.name} className="details-image" />
        <div className="details-info">
          <h2>{product.name}</h2>
          <p className="details-price">${product.price?.toFixed(2) || "0.00"}</p>
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <p className="details-description">
            {product.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
}
