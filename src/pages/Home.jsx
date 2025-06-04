// src/pages/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserProfileModal from "../components/UserProfileModal";
import CalendarSection from "../components/CalendarSection"; // ⬅️ 新增


function Home() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div>
      <Header />
      <div className="p-8 pt-24">
        <CalendarSection />
      </div>

      <Footer />
    </div>
  );
}

export default Home;