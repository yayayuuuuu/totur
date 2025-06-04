// pages/StudentFormPage.jsx
import React from 'react';
import Header from '../components/Header';
import StudentFormContainer from '../components/StudentFormContainer';
import Footer from '../components/Footer';

export default function StudentFormPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 items-center justify-center pt-20">
        <StudentFormContainer />
      </div>
      <Footer />
    </div>
  );
}
