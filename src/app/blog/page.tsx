"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./blogList.css";
import { api } from "@/lib/api";

export default function BlogList() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="blog-container">
      <div className="blog-topbar">
        <h1>Blog</h1>
        <div className="breadcrumb">
          <span>🏠 Home</span> <span>›</span> <span>Blog</span>
        </div>
      </div>

      <div className="blog-items">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-item">
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <span className="blog-category">{blog.category || "TIPS"}</span>
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-desc">{blog.description}</p>
              <div className="blog-meta">
                <span>💬 0 Comments</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
              <Link href={`/blog/${blog._id}`} className="read-more">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
