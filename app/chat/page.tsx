"use client";

import { logoutRequest } from "@/services/auth.service";
import { useAuthLoad } from "@/hooks/useAuthLoad";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { clearUser } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export default function Chat() {
  useAuthLoad();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      await logoutRequest();
      dispatch(clearUser());
      router.push("/signin");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <div className="p-4 space-y-4">
      {user ? (
        <>
          <div className="bg-white shadow p-4 rounded">
            <p className="text-xl font-semibold">👤 Welcome, {user.email}</p>
            <p className="text-sm text-gray-600">
              Joined: {new Date(user.created_at).toLocaleDateString()}
            </p>
            {user.image_url && (
              <img
                src={user.image_url}
                alt="Profile"
                className="w-16 h-16 rounded-full mt-2"
              />
            )}
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
}
