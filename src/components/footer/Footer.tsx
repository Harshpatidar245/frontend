"use client";
import React from "react";
import "./footer.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-col brand">
          <h2 className="logo">
            <span className="icon">💎</span> ESSENTIAL
          </h2>
          <p className="desc">
            Pellentesque id rhoncus augue nec maximus enim nunc commodo purus sit amet.
          </p>
          <ul className="contact-info">
            <li>
              <FaMapMarkerAlt /> London Eye, London, United Kingdom
            </li>
            <li>
              <FaPhoneAlt /> (657) 123-456
            </li>
            <li>
              <FaEnvelope /> contact@website.com
            </li>
            <li>
              <FaClock /> Mon – Fri / 9:00 AM – 6:00 PM
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>INFORMATION</h4>
          <ul>
            <li>About Us</li>
            <li>Store Location</li>
            <Link href="/contact">Contact Us</Link>
            <li>Shipping & Delivery</li>
            <li>Latest News</li>
            <li>Our Sitemap</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>OUR SERVICE</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Sale</li>
            <li>Customer Service</li>
            <li>Delivery Information</li>
            <li>Payments</li>
            <li>Saved Cards</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>MY ACCOUNT</h4>
          <ul>
            <li>Sign In</li>
            <li>Register</li>
            <li>View Cart</li>
            <li>My Wishlist</li>
            <li>Track My Order</li>
            <li>Help & Support</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© COPYRIGHT – OCEANWP</p>
      </div>
    </footer>
  );
};

export default Footer;
