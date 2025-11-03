"use client";
import React from "react";
import "./bestcustomer.css";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const customers = [
  {
    id: 1,
    name: "LOLA MILES",
    role: "Best products",
    rating: 5,
    img: "https://essential.oceanwp.org/wp-content/uploads/2021/06/t1.png",
    feedback:
      "Aliquam dignissim lacinia tristique nulla lobortis nunc ac eros scelerisque varius suspendisse sit amet urna vitae urna semper quis at ligula.",
  },
  {
    id: 2,
    name: "MIKE KENU",
    role: "5 stars indeed",
    rating: 5,
    img: "https://essential.oceanwp.org/wp-content/uploads/2021/06/t-6.png",
    feedback:
      "Aliquam dignissim lacinia tristique nulla lobortis nunc ac eros scelerisque varius suspendisse sit amet urna vitae urna semper quis at ligula.",
  },
  {
    id: 3,
    name: "SOFIA MILLER",
    role: "Excellent",
    rating: 5,
    img: "https://essential.oceanwp.org/wp-content/uploads/2021/06/t-2.png",
    feedback:
      "Aliquam dignissim lacinia tristique nulla lobortis nunc ac eros scelerisque varius suspendisse sit amet urna vitae urna semper quis at ligula.",
  },
];

const BestCustomer = () => {
  return (
    <section className="best-customer">
      <h2 className="title">Our Best Customers</h2>
      <div className="divider">
        {Array(10)
          .fill("♦")
          .map((_, i) => (
            <span key={i} />
          ))}
      </div>

      <div className="testimonials">
        {customers.map((c) => (
          <div key={c.id} className="testimonial-card">
            <FormatQuoteIcon className="quote-icon" />
            <p className="feedback">“{c.feedback}”</p>
            <div className="customer-info">
              <img src={c.img} alt={c.name} className="avatar" />
              <div>
                <h4>{c.name}</h4>
                <p className="role">{c.role}</p>
                <div className="stars">
                  {Array(c.rating)
                    .fill("★")
                    .map((_, i) => (
                      <span key={i} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestCustomer;
