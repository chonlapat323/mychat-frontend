"use client";
import { logoutRequest } from "@/services/auth.service";
import { useAuthLoad } from "@/hook/useAuthLoad";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { clearUser } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hook/useAppDispatch";
import ChatLayout from "@/components/layout/ChatLayout";
export default function Home() {
  useAuthLoad();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <ChatLayout>
      <div className="text-white p-4">
        Select a room or friend to start chatting
      </div>
    </ChatLayout>
  );
}
