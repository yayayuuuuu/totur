// pages/StudentListPage.jsx
import React from 'react';
import Header from '../components/Header';
import StudentList from '../components/StudentList';
import Footer from '../components/Footer';

export default function StudentListPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <StudentList />
      </main>
      <Footer />
    </div>
  );
}
