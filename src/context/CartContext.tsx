"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api } from "@/lib/api";

export type Product = {
  _id?: string;
  id?: string | number;
  name: string;
  price: number;
  image: string;
};

type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (id: string | number) => Promise<void>;
  updateQuantity: (id: string | number, qty: number) => Promise<void>;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");
        if (res.data?.items) {
          setCart(res.data.items);
        }
      } catch (err) {
        console.error("Failed to load cart:", err);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (product: Product) => {
    const productId = product._id || product.id;
    if (!productId) return;

    try {
      const res = await api.post("/cart/add", {
        productId,
        quantity: 1,
      });
      if (res.data?.items) setCart(res.data.items);
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  const removeFromCart = async (id: string | number) => {
    try {
      // Some APIs expect id in body, not param
      const res = await api.delete(`/cart/remove/${id}`);
      if (res.data?.items) setCart(res.data.items);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const updateQuantity = async (id: string | number, qty: number) => {
    if (qty < 1) return;

    try {
      // Make sure your backend route matches this path
      const res = await api.put(`/cart/update/${id}`, { quantity: qty });
      if (res.data?.items) setCart(res.data.items);
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, updateQuantity, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used within a CartProvider");
  return context;
};
