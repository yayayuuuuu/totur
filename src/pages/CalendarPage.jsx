import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CalendarSection from "../components/CalendarSection";

const CalendarPage = () => {
  return (
    <div>
      <Header />
      <main className="p-8 pt-20">
        <h1 className="text-3xl font-bold mb-6"></h1>
        <CalendarSection />
      </main>
      <Footer />
    </div>
  );
};

export default CalendarPage;