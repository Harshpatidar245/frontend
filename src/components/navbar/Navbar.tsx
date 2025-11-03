"use client";

import Link from "next/link";
import React, { useState } from "react";
import "./navbar.css";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { cart } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <WaterDropIcon /> ESSENTIAL
      </div>

      <div className={`navbar-right ${menuOpen ? "active" : ""}`}>
        <Link href="/">HOMEPAGE</Link>
        <Link href="/shop">SHOP</Link>
        <Link href="/blog">BLOG</Link>
        <Link href="/contact">CONTACT</Link>
        <Link href="/myaccount">MY ACCOUNT</Link>
        {isAuthenticated ? (
          <button className="logout-btn" onClick={logout}>
            LOGOUT
          </button>
        ) : null}
        <Link href="/cart" className="cart-icon" aria-label="View Cart">
          <ShoppingCartIcon />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
      </div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
    </div>
  );
};

export default Navbar;
