import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useRef, useState } from "react";
import UserProfileModal from "./UserProfileModal"; // 確保路徑正確

function Header() {
  const location = useLocation();
  const { currentUser } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const buttonRef = useRef(); // 👉 加上這行

  const isIntroPage = location.pathname === "/";
  const isSigninPage = location.pathname === "/signin";

  return (
  <header className="fixed top-0 left-0 bg-[#61C6CD] w-full h-20 flex items-center justify-between z-50 shadow-md px-4 sm:px-6">
      {/* 左側 Logo */}
     {!currentUser ? (
      <Link to="/">
        <img
          src="/images/logo-v1.svg"
          className="w-28 sm:w-40 h-auto cursor-pointer"
          alt="Logo"
        />
      </Link>
    ) : (
      <img
        src="/images/logo-v1.svg"
        className="w-28 sm:w-40 h-auto"
        alt="Logo"
      />
    )}

      {/* 右上角按鈕 */}
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        {!currentUser ? (
          <>
            <Link
              to="/signin"
              className="bg-white border-2 rounded-sm px-4 py-1.5 text-black text-sm sm:text-base"
            >
              登入
            </Link>
            <Link
              to="/signup"
              className="bg-white border-2 rounded-sm px-4 py-1.5 text-black text-sm sm:text-base "
            >
              註冊
            </Link>
          </>
        ) : (
          <button
            ref={buttonRef}
            onClick={() => setShowProfile(true)}
            className="border-2 rounded-sm px-4 py-1.5 text-black text-sm sm:text-base hover:!bg-[#FFFFD0] hover:!border-black"
          >
            會員中心
          </button>
        )}
      </div>

      {/* 會員中心 Modal */}
      {showProfile && (
        <UserProfileModal
          onClose={() => setShowProfile(false)}
          buttonRef={buttonRef}
        />
      )}
    </header>

  );
}

export default Header;
