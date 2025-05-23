import { WebSocketMessage } from "@/contexts/WebSocketContext";
import { WS_API_URL } from "@/libs/config";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function useWebSocket(onMessage: (data: WebSocketMessage) => void) {
  const socketRef = useRef<WebSocket | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    const publicPages = ["/signin", "/signup"];
    if (publicPages.includes(pathname)) {
      return;
    }
    const socket = new WebSocket(`${WS_API_URL}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data); // callback ล่าสุดจะยังคงใช้ได้ (เว้นแต่คุณเปลี่ยนภายใน)
      } catch (err) {
        console.error("❌ Failed to parse message:", event.data);
      }
    };

    socket.onclose = () => {
      console.log("🔌 WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
    // 👇 ใช้ [] แทน [onMessage] เพื่อป้องกัน reconnect วน
  }, []);

  const sendMessage = (msg: WebSocketMessage) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      console.warn("WebSocket is not open. Message not sent.");
    }
  };

  return { sendMessage };
}
