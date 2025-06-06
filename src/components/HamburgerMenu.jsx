import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();

  
  if (!currentUser) return null;

  return (
    <>
      {/* 漢堡按鈕 */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-30 left-4 z-50 p-2 bg-transparent border-none focus:outline-none"
      >
        {!open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect y="4" width="24" height="2" rx="1" fill="#2B5659" />
            <rect y="11" width="24" height="2" rx="1" fill="#2B5659" />
            <rect y="18" width="24" height="2" rx="1" fill="#2B5659" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <line x1="4.5" y1="4.5" x2="19.5" y2="19.5" stroke="#2B5659" strokeWidth="2" strokeLinecap="round" />
            <line x1="4.5" y1="19.5" x2="19.5" y2="4.5" stroke="#2B5659" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* 側邊選單 */}
     <div
  className={`fixed top-15 left-0 h-screen w-64 max-sm:w-full bg-[#2B5659] text-white z-40 transition-transform duration-300 ${
    open ? 'translate-x-0' : '-translate-x-full'
  }`}
>
        <ul className="flex flex-col p-6 space-y-6 pt-35 text-left max-sm:items-center max-sm:text-center">

          <li>
            <Link
              to="/calendar"
              onClick={() => setOpen(false)}
              className="text-white hover:text-yellow-300 no-underline"
            >
              行事曆
            </Link>
          </li>
          <li>
            <Link
              to="/students"
              onClick={() => setOpen(false)}
              className="text-white hover:text-yellow-300 no-underline"
            >
              學生列表
            </Link>
          </li>
        </ul>
      </div>

      {/* 背景遮罩 */}
      {open && (
        <div
          className="fixed inset-0 top-15 backdrop-blur-md bg-black/10 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}