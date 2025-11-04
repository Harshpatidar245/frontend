"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import "./blogDetail.css";
import { api } from "@/lib/api";

export default function BlogDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const blogId = Array.isArray(id) ? id[0] : id;
        const res = await api.get(`/blogs/${blogId}`);
        setBlog(res.data);

        const all = await api.get("/blogs");
        setRelated(all.data.filter((b: any) => b._id !== blogId).slice(0, 3));
      } catch (err) {
        console.error("Error loading blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog)
    return (
      <main className="blog-container not-found">
        <div className="inner">
          <h2>Blog not found</h2>
          <p>We couldn’t find that post. Try another one.</p>
          <button onClick={() => router.push("/blog")}>Back to blog</button>
        </div>
      </main>
    );

  return (
    <main className="blog-container">
      <div className="breadcrumb-bar">
        <h2 className="page-title">Blog</h2>
        <div className="breadcrumb">
          <Link href="/">Home</Link> <span>›</span>{" "}
          <Link href="/blog">Tips</Link> <span>›</span>{" "}
          <span>{blog.title}</span>
        </div>
      </div>

      <article className="blog-detail">
        <img className="hero-image" src={blog.image} alt={blog.title} />
        <h1 className="post-title">{blog.title}</h1>

        <div className="post-meta">
          <span>✍️ {blog.author || "OceanWP"}</span>
          <span>•</span>
          <span>
            📅 {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>•</span>
          <span>💬 0 Comments</span>
        </div>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="related-section">
          <h3>You Might Also Like</h3>
          <div className="related-grid">
            {related.map((r) => (
              <div
                key={r._id}
                className="related-card"
                onClick={() => router.push(`/blog/${r._id}`)}
              >
                <img src={r.image} alt={r.title} />
                <h5>{r.title}</h5>
                <p className="r-date">
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="reply-section">
          <h4>Leave a Reply</h4>
          <p className="small">You must be logged in to post a comment.</p>
        </div>
      </article>
    </main>
  );
}
