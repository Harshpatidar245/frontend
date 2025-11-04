"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export type Product = {
  _id?: string;
  name: string;
  price: number;
  image: string;
};

type CartItem = {
  productId: Product;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, qty: number) => Promise<void>;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { token, user } = useAuth();
  const router = useRouter();

  // Load cart only if user is logged in AND not admin
  useEffect(() => {
    const fetchCart = async () => {
      if (!token || user?.role === "admin") return; // skip admin
      try {
        const res = await api.get("/cart");
        if (res.data?.items) setCart(res.data.items);
      } catch (err: any) {
        if (err.response?.status !== 401)
          console.error("Failed to load cart:", err);
      }
    };
    fetchCart();
  }, [token, user]);

  const addToCart = async (product: Product) => {
    if (!user || !token) {
      router.push("/myaccount");
      return;
    }
    if (user.role === "admin") return;

    const productId = product._id;
    if (!productId) return;

    try {
      const res = await api.post("/cart/add", { productId, quantity: 1 });
      if (res.data?.items) setCart(res.data.items);
    } catch (err: any) {
      if (err.response?.status === 401) {
        router.push("/myaccount");
      } else {
        console.error("Failed to add item:", err);
      }
    }
  };

  const removeFromCart = async (id: string) => {
    if (!token || user?.role === "admin") return;
    try {
      const res = await api.delete(`/cart/remove/${id}`);
      if (res.data?.items) setCart(res.data.items);
    } catch (err: any) {
      console.error("Failed to remove item:", err);
    }
  };

  const updateQuantity = async (id: string, qty: number) => {
    if (!token || user?.role === "admin") return;
    if (qty < 1) return;
    try {
      const res = await api.put(`/cart/update/${id}`, { quantity: qty });
      if (res.data?.items) setCart(res.data.items);
    } catch (err: any) {
      console.error("Failed to update quantity:", err);
    }
  };

  const total = cart.reduce((sum, item) => {
    const price = item.productId?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, updateQuantity, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
