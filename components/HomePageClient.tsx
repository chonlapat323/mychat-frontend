"use client";

import { logoutRequest } from "@/services/auth.service";

export default function HomePageClient() {
  return (
    <>
      <button
        onClick={logoutRequest}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </>
  );
}
