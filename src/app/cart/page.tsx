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
        <p className="empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-container">
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
                  const id = product?._id;
                  const price = Number(product?.price) || 0;
                  const qty = item.quantity || 1;

                  return (
                    <tr key={id}>
                      <td>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(String(id))}
                        >
                          ✕
                        </button>
                      </td>
                      <td className="product-cell">
                        <Image
                          src={product?.image || "/placeholder.png"}
                          alt={product?.name || "Product"}
                          width={50}
                          height={50}
                        />
                        <span>{product?.name || "Unnamed"}</span>
                      </td>
                      <td>${formatPrice(price)}</td>
                      <td>
                        <div className="qty-control">
                          <button
                            onClick={() => updateQuantity(String(id), qty - 1)}
                          >
                            -
                          </button>
                          <span>{qty}</span>
                          <button
                            onClick={() => updateQuantity(String(id), qty + 1)}
                          >
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

            <div className="cart-bottom">
              <div className="coupon-section">
                <input type="text" placeholder="Coupon code" />
                <button>APPLY COUPON</button>
                <button className="update">UPDATE CART</button>
              </div>

              <div className="summary-section">
                <h3>CART TOTALS</h3>
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>${formatPrice(total)}</span>
                </div>
                <div className="summary-line total">
                  <span>Total</span>
                  <span>${formatPrice(total)}</span>
                </div>
                <button className="checkout">PROCEED TO CHECKOUT</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
