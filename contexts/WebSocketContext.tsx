import { SafeUser } from "@/types/message";
import React, { createContext, useContext, useEffect, useRef } from "react";

export type WebSocketMessage =
  | {
      type: "message";
      id?: string;
      room_id: string;
      sender_id: string;
      content?: string;
      text: string;
      created_at: string;
      sender: SafeUser;
    }
  | {
      type: "system";
      message: string;
    };

type WebSocketContextType = {
  sendMessage: (msg: WebSocketMessage) => void;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const WebSocketProvider: React.FC<{
  children: React.ReactNode;
  onMessage: (msg: WebSocketMessage) => void;
}> = ({ children, onMessage }) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4001/ws");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch (err) {
        console.error("❌ Failed to parse WebSocket message:", event.data);
      }
    };

    socket.onclose = () => {
      console.log("🔌 WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, [onMessage]);

  const sendMessage = (msg: WebSocketMessage) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      console.warn("WebSocket not open");
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context)
    throw new Error(
      "useWebSocketContext must be used inside WebSocketProvider"
    );
  return context;
};
