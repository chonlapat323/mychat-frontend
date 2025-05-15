"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { logoutRequest } from "@/services/auth.service";

export default function UserSection() {
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    await logoutRequest();
    window.location.href = "/signin";
  };

  if (!user) return null;
  return (
    <div className="relative group text-center mb-2">
      <div className="w-12 h-12 bg-gray-700 rounded-full mx-auto overflow-hidden">
        {user.image_url ? (
          <img
            src={user.image_url}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-xl flex items-center justify-center h-full">
            {user.email[0].toUpperCase()}
          </span>
        )}
      </div>
      {/* 👇 Tooltip Email */}
      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-[10px] text-white bg-gray-800 rounded shadow opacity-0 group-hover:opacity-100 transition pointer-events-none z-10 whitespace-nowrap">
        {user.email}
      </div>
      <button
        onClick={handleLogout}
        className="text-xs mt-1 text-red-400 hover:underline"
      >
        Logout
      </button>
    </div>
  );
}
