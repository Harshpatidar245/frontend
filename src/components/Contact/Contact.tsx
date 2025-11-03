"use client";
import "./Contact.css";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-left">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19802.1990478284!2d-0.129!3d51.5033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604bf705cfc05%3A0x4a5a6b2a44b3d733!2sLondon%20Eye!5e0!3m2!1sen!2sin!4v1698864324560!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      <div className="contact-right">
        <div className="contact-info">
          <div>
            <h3>Address</h3>
            <p>
              Riverside Building, County Hall,
              <br /> London SE1 7PB
            </p>
          </div>
          <div>
            <h3>Mobile</h3>
            <p>(657) 123-456</p>
            <p>(555) 241-6874</p>
          </div>
          <div>
            <h3>Email</h3>
            <p>contact@website.com</p>
          </div>
          <div>
            <h3>Social</h3>
            <div className="social-icons">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaYoutube />
            </div>
          </div>
        </div>

        <form className="contact-form">
          <div className="name-row">
            <input type="text" placeholder="First Name*" required />
            <input type="text" placeholder="Last Name*" required />
          </div>
          <input type="email" placeholder="Email Address*" required />
          <textarea placeholder="Comment or Message*" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}
