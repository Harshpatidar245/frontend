"use client";
import React from "react";
import "./NewsFromBlog.css";
import { useRouter } from "next/navigation";

const blogPosts = [
  {
    id: 1,
    title: "Duis Sagittis Ipsum Praesent",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus.",
    img: "https://essential.oceanwp.org/wp-content/uploads/2017/02/Sans-titre-1_0005_shutterstock_1915964188-600x417.png",
  },
  {
    id: 2,
    title: "Tortor Neque Adipiscing Diam",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus.",
    img: "https://essential.oceanwp.org/wp-content/uploads/2017/02/Sans-titre-1_0002_shutterstock_1932934118-300x208.png",
  },
  {
    id: 3,
    title: "Vestibulum Sapin Prin Quam",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus.",
    img: "https://essential.oceanwp.org/wp-content/uploads/2017/02/Sans-titre-1_0007_shutterstock_1857772774-300x208.png",
  },
];

const NewsFromBlog = () => {
  const router = useRouter();

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

      <div className="blog-container">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="blog-card"
            onClick={() => router.push(`/blog/${post.id}`)}
          >
            <div className="blog-image">
              <img src={post.img} alt={post.title} />
            </div>
            <div className="blog-content">
              <h3>{post.title}</h3>
              <p>{post.desc}</p>
              <button className="learn-btn">LEARN MORE</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-dots">
        <span className="active"></span>
        <span></span>
      </div>
    </section>
  );
};

export default NewsFromBlog;
