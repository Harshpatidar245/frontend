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
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <WaterDropIcon className="logo-icon" />
        <span className="logo-text">ESSENTIAL</span>
      </div>

      <div className={`navbar-right ${menuOpen ? "active" : ""}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>
          HOMEPAGE
        </Link>
        <Link href="/shop" onClick={() => setMenuOpen(false)}>
          SHOP
        </Link>
        <Link href="/blog" onClick={() => setMenuOpen(false)}>
          BLOG
        </Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>
          CONTACT
        </Link>

        {/* Show MY ACCOUNT only when NOT logged in */}
        {!isAuthenticated && (
          <Link href="/myaccount" onClick={() => setMenuOpen(false)}>
            MY ACCOUNT
          </Link>
        )}

        {/* Show ADD PRODUCT only for Admin */}
        {isAuthenticated && isAdmin && (
          <Link
            href="/admin"
            className="add-btn"
            onClick={() => setMenuOpen(false)}
          >
            ADD PRODUCT
          </Link>
        )}

        {/* Logout button only for logged-in users */}
        {isAuthenticated && (
          <button className="logout-btn" onClick={handleLogout}>
            LOGOUT
          </button>
        )}

        <Link
          href="/cart"
          className="cart-icon"
          onClick={() => setMenuOpen(false)}
          aria-label="View Cart"
        >
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
