// pages/StudentListPage.jsx
import React from 'react';
import Header from '../components/Header';
import StudentList from '../components/StudentList';
import Footer from '../components/Footer';

export default function StudentListPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow px-4 py-6">
        <p className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-center mb-6 pt-2">學生列表</p>
        <StudentList />
      </main>
      <Footer />
    </div>
  );
}
