"use client";
import "./ProductCard.css";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  const router = useRouter();

  return (
    <div className="product-card" onClick={() => router.push(`/product/${id}`)}>
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">${price.toFixed(2)}</p>
    </div>
  );
}
