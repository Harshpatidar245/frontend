"use client";
import React, { useEffect, useState } from "react";
import "./NewsFromBlog.css";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api"; // assuming you already have axios instance here

type Blog = {
  _id: string;
  title: string;
  description: string;
  image: string;
};

const NewsFromBlog = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs"); // backend route: /api/blogs
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="news-blog">
      <h2 className="title">News From The Blog</h2>
      <div className="divider">
        {Array(10)
          .fill("♦")
          .map((_, i) => (
            <span key={i} />
          ))}
      </div>

      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div className="blog-container">
          {blogs.map((post) => (
            <div
              key={post._id}
              className="blog-card"
              onClick={() => router.push(`/blog/${post._id}`)}
            >
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="blog-content">
                <h3>{post.title}</h3>
                <p>{post.description?.slice(0, 100)}...</p>
                <button className="learn-btn">LEARN MORE</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination-dots">
        <span className="active"></span>
        <span></span>
      </div>
    </section>
  );
};

export default NewsFromBlog;
