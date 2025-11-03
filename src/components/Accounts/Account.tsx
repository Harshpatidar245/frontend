// src/components/Account.tsx
"use client";
import "./Account.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

export default function Account() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="account-page">
      {/* topbar with breadcrumb and title */}
      <div className="account-topbar">
        <h1 className="account-top-title">My Account</h1>
        <div className="account-breadcrumb">
          <Link href="/">🏠 Home</Link>
          <span>›</span>
          <span>My Account</span>
        </div>
      </div>

      {/* main centered login area */}
      <div className="account-container">
        <div className="login-box">
          <h2 className="login-header">Login</h2>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>
                Username or email address <span>*</span>
              </label>
              <input type="text" required />
            </div>

            <div className="form-group">
              <label>
                Password <span>*</span>
              </label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="remember-row">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>

            <button type="submit" className="login-btn">
              Log In
            </button>

            <p className="forgot-link">Lost your password?</p>
          </form>
        </div>
      </div>
    </div>
  );
}
