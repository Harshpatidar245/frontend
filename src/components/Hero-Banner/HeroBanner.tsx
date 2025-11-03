"use client";
import React from "react";
import "./herobanner.css";

const HeroBanner = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-img">
          <img src="https://essential.oceanwp.org/wp-content/uploads/2017/02/Sans-titre-1_0002_shutterstock_1932934118-300x208.png" alt="Hair oil" />
        </div>
        <div className="hero-text">
          <p className="promo">BIG SUMMER PROMOTION</p>
          <h1>
            BEST OILS <span>YOU CAN FIND</span>
          </h1>
          <p className="desc">
            Etiam nisi neque, cursus in augue molestie, auctor iaculis ligula.
            Duis vitae volutpat nibh, ac vestibulum dolor. Ut sodales fringilla
            neque et mollis. Quisque vitae enim velit. Integer non consectetur
            dui. Etiam eget turpis et erat malesuada venenatis. Nam augue lorem,
            aliquet ut tellus vitae.
          </p>
          <div className="hero-btns">
            <button className="btn primary">SHOP NOW →</button>
            <button className="btn secondary">LEARN MORE</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
