"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const totalItems =
    cart?.reduce((sum, item) => sum + (item?.quantity || 0), 0) || 0;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push("/");
  };

  const handleNavClick = () => setMenuOpen(false);

  return (
    <div className="navbar">
      <div
        className="navbar-left"
        onClick={() => router.push(isAdmin ? "/admin" : "/")}
        style={{ cursor: "pointer" }}
      >
        <WaterDropIcon className="logo-icon" />
        <span className="logo-text">ESSENTIAL</span>
      </div>

      <div className={`navbar-right ${menuOpen ? "active" : ""}`}>
        {/* Non-admin user navigation */}
        {!isAdmin && (
          <>
            <Link href="/" onClick={handleNavClick}>
              HOMEPAGE
            </Link>
            <Link href="/shop" onClick={handleNavClick}>
              SHOP
            </Link>
            <Link href="/blog" onClick={handleNavClick}>
              BLOG
            </Link>
            <Link href="/contact" onClick={handleNavClick}>
              CONTACT
            </Link>

            {/* Show MY ACCOUNT only when NOT logged in */}
            {!isAuthenticated && (
              <Link href="/myaccount" onClick={handleNavClick}>
                MY ACCOUNT
              </Link>
            )}

            {/* Logged-in user options */}
            {isAuthenticated && (
              <>
                <Link
                  href="/cart"
                  className="cart-icon"
                  onClick={handleNavClick}
                  aria-label="View Cart"
                >
                  <ShoppingCartIcon />
                  {totalItems > 0 && (
                    <span className="cart-count">{totalItems}</span>
                  )}
                </Link>
                <button className="logout-btn" onClick={handleLogout}>
                  LOGOUT
                </button>
              </>
            )}
          </>
        )}

        {/* Admin-only navigation */}
        {isAuthenticated && isAdmin && (
          <>
            <Link href="/admin/addproduct" onClick={handleNavClick}>
              ADD PRODUCT
            </Link>
            <Link href="/admin/addblog" onClick={handleNavClick}>
              ADD BLOG
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              LOGOUT
            </button>
          </>
        )}
      </div>

      {/* Mobile menu toggle */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
    </div>
  );
};

export default Navbar;
