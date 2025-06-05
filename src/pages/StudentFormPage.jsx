// pages/StudentFormPage.jsx
import React from 'react';
import Header from '../components/Header';
import StudentFormContainer from '../components/StudentFormContainer';
import Footer from '../components/Footer';

export default function StudentFormPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <div className="flex flex-1 items-center justify-center pt-24 sm:pt-10">
        <StudentFormContainer />
      </div>
      <Footer />
    </div>
  );
}
