"use client";
import "./Account.css";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Account() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login, register, isAuthenticated, user } = useAuth();
  const [message, setMessage] = useState("");
  const router = useRouter();

  // redirect after login based on role
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") router.push("/admin/adminHome");
      else router.push("/");
    }
  }, [isAuthenticated, user, router]);

  // simple email regex
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Frontend validation
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      return setMessage("Please fill in all required fields.");
    }

    if (!validateEmail(form.email)) {
      return setMessage("Enter a valid email address.");
    }

    if (form.password.length < 6) {
      return setMessage("Password must be at least 6 characters long.");
    }

    if (!isLogin && form.name.trim().length < 2) {
      return setMessage("Name must be at least 2 characters.");
    }

    // Backend call
    try {
      if (isLogin) {
        const res = await login(form.email, form.password);
        if (!res.ok) return setMessage(res.message || "Login failed");
      } else {
        const res = await register(form);
        if (!res.ok) return setMessage(res.message || "Signup failed");
      }
    } catch {
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="account-page">
      <div className="account-topbar">
        <h1 className="account-top-title">My Account</h1>
        <div className="account-breadcrumb">
          <Link href="/">🏠 Home</Link>
          <span>›</span>
          <span>My Account</span>
        </div>
      </div>

      <div className="account-container">
        <div className="login-box">
          <h2 className="login-header">{isLogin ? "Login" : "Register"}</h2>
          {isAuthenticated ? (
            <p>You are already logged in.</p>
          ) : (
            <form className="login-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label>
                    Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                </div>
              )}

              <div className="form-group">
                <label>
                  Email address <span>*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  Password <span>*</span>
                </label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
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

              <button type="submit" className="login-btn">
                {isLogin ? "Log In" : "Register"}
              </button>

              {message && <p className="error-msg">{message}</p>}

              <p
                className="switch-link"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setMessage("");
                }}
                style={{ cursor: "pointer" }}
              >
                {isLogin
                  ? "Don't have an account? Register"
                  : "Already have an account? Login"}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
