"use client";

import { useState } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Message } from "@/types/message";

export default function ChatClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState<Message[]>([]);

  useWebSocket((msg) => {
    if (msg.type === "message") {
      const message: Message = {
        id: msg.id!,
        room_id: msg.room_id,
        sender_id: msg.sender_id,
        content: msg.content!,
        created_at: msg.created_at,
        type: "message",
        sender: msg.sender,
      };
      console.log(messages);
      setMessages((prev) => [...prev, message]);
    }
  });

  return <>{children}</>;
}
