import React, { useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfileModal = ({ onClose, buttonRef }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const modalRef = useRef();

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
      navigate("/"); // 登出後導回首頁
    } catch (error) {
      console.error("登出失敗：", error);
    }
  };

  // 點擊 Modal 外部會關閉
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !buttonRef.current?.contains(e.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, buttonRef]);

  
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

 
  const modalStyle =
    window.innerWidth >= 768 && buttonRef?.current
      ? {
          position: "absolute",
          top: buttonRef.current.getBoundingClientRect().bottom + 8 + "px",
          left:
            buttonRef.current.getBoundingClientRect().right -
            320 +
            "px", // w-80 = 320px
        }
      : {};

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* ✅ 手機版背景模糊遮罩，桌機不顯示 */}
        <div
          className="absolute inset-0 bg-white/30 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />

        {/* ✅ 單一 Modal，RWD 調整外觀 */}
        <div
          ref={modalRef}
          className="z-50 bg-white rounded-xl shadow-xl w-full max-w-sm md:w-80 border md:absolute"
          style={modalStyle}
        >
          <ModalContent
            handleLogout={handleLogout}
            onClose={onClose}
            currentUser={currentUser}
          />
        </div>
      </div>
    );

};

const ModalContent = ({ handleLogout, onClose, currentUser }) => (
  <div className="p-6 relative">
    <button
      onClick={onClose}
      className="absolute top-3 right-3 text-gray-500 hover:!text-gray-700 text-xl"
    >
      &times;
    </button>
    <div className="text-center mt-6">
      <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center text-3xl">
        👤
      </div>
      <h2 className="text-lg font-semibold">
        {currentUser?.displayName || "會員"}
      </h2>
      <p className="text-sm text-gray-500">{currentUser?.email}</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 border rounded-full text-[#228991] hover:!bg-[#FFFFD0] hover:!border-[#228991]"
      >
        登出
      </button>
    </div>
  </div>
);

export default UserProfileModal;









