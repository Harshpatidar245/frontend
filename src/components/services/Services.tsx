import React from "react";
import "./services.css";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PaymentsIcon from "@mui/icons-material/Payments";
import DiscountIcon from "@mui/icons-material/Discount";

const Services = () => {
  const data = [
    {
      icon: <AirplanemodeActiveIcon />,
      title: "FREE SHIPPING",
      text: "Free Shipping for all US order",
    },
    {
      icon: <HeadsetMicIcon />,
      title: "SUPPORT 24/7",
      text: "We support 24h a day",
    },
    {
      icon: <CurrencyRupeeIcon />,
      title: "100% MONEY BACK",
      text: "You have 14 days to Return",
    },
    {
      icon: <PaymentsIcon />,
      title: "PAYMENT SECURE",
      text: "We ensure secure payment",
    },
    {
      icon: <DiscountIcon />,
      title: "DISCOUNT",
      text: "Up to 30% for member",
    },
  ];

  return (
    <div className="services">
      {data.map((service, index) => (
        <div className="service-card" key={index}>
          <div className="service-icon">{service.icon}</div>
          <h3>{service.title}</h3>
          <p>{service.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;
