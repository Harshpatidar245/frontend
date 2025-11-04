"use client";

import Link from "next/link";
import "./adminHome.css";

export default function AdminHome() {
  return (
    <div className="admin-home">
      <h1>Admin Dashboard</h1>
      <div className="admin-buttons">
        <Link href="/admin/adminHome/addproduct" className="admin-btn">
          Add Product
        </Link>
        <Link href="/admin/adminHome/addblog" className="admin-btn">
          Add Blog
        </Link>
      </div>
    </div>
  );
}
