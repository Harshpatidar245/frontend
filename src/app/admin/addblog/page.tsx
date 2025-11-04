"use client";

import React, { useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import "./addblog.css";

export default function AddBlogPage() {
  const { token, isAdmin } = useAuth();
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!isAdmin) {
      setMessage("Access denied: Admins only.");
      return;
    }

    try {
      const res = await api.post(
        "/admin/blog",
        { ...form },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200 || res.status === 201) {
        setMessage("✅ Blog added successfully!");
        setForm({ title: "", content: "", image: "" });
      }
    } catch (err: any) {
      setMessage(
        err.response?.data?.message || "Failed to add blog. Try again."
      );
    }
  };

  return (
    <div className="add-blog-page">
      <h1>Add New Blog</h1>
      <form onSubmit={handleSubmit} className="add-blog-form">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Blog Content"
          value={form.content}
          onChange={handleChange}
          rows={6}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />
        <button type="submit">ADD BLOG</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
