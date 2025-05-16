"use client";
import { useAuthLoad } from "@/hooks/useAuthLoad";
import ChatLayout from "@/components/layout/ChatLayout";
export default function Home() {
  useAuthLoad();
  return (
    <ChatLayout>
      <div className="text-white p-4">Select a room to start chatting</div>
    </ChatLayout>
  );
}
