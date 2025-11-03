"use client";
import { useCart } from "@/context/CartContext";
import "./cart.css";
import Image from "next/image";

export default function CartPage() {
  const { cart = [], removeFromCart, updateQuantity, total = 0 } = useCart();

  const formatPrice = (value: unknown): string => {
    const num = Number(value);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  return (
    <div className="cart-page">
      <h1>Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-grid">
          <table className="cart-table">
            <thead>
              <tr>
                <th></th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const product = item.productId;
                const productId = product?._id;
                const price = Number(product?.price) || 0;
                const name = product?.name || "Unnamed";
                const image = product?.image || "/placeholder.png";
                const qty = item.quantity || 1;

                return (
                  <tr key={productId}>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(String(productId))}
                      >
                        ✕
                      </button>
                    </td>
                    <td className="product-cell">
                      <Image src={image} alt={name} width={50} height={50} />
                      <span>{name}</span>
                    </td>
                    <td>${formatPrice(price)}</td>
                    <td>
                      <div className="qty-box">
                        <button onClick={() => updateQuantity(String(productId), qty - 1)}>
                          -
                        </button>
                        <span>{qty}</span>
                        <button onClick={() => updateQuantity(String(productId), qty + 1)}>
                          +
                        </button>
                      </div>
                    </td>
                    <td>${formatPrice(price * qty)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Cart Totals</h3>
            <p>Subtotal: ${formatPrice(total)}</p>
            <p>Total: ${formatPrice(total)}</p>
            <button className="checkout-btn">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      )}
    </div>
  );
}
