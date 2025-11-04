"use client";
import React, { useState } from "react";
import "./admin.css";
import { api } from "@/lib/api";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await api.post("/admin/product", {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image: form.image,
      });

      if (res.data?._id) {
        setMessage("✅ Product added successfully!");
        setForm({ name: "", description: "", price: "", image: "" });
      } else {
        setMessage("⚠️ Failed to add product. Try again.");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      setMessage("❌ Something went wrong.");
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Add New Product</h1>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Product Name"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={form.description}
          placeholder="Product Description"
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="number"
          name="price"
          value={form.price}
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          value={form.image}
          placeholder="Image URL"
          onChange={handleChange}
          required
        />
        <button type="submit" className="admin-btn">Add Product</button>
      </form>
      {message && <p className="admin-message">{message}</p>}
    </div>
  );
}
