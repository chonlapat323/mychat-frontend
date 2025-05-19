import { WS_API_URL } from "@/libs/config";
import { SafeUser } from "@/types/message";
import React, { createContext, useContext, useEffect, useRef } from "react";

export type WebSocketMessage =
  | {
      type: "message" | "join";
      id?: string;
      room_id: string;
      sender_id: string;
      content?: string;
      text: string;
      created_at: string;
      sender: SafeUser;
    }
  | {
      type: "user_joined";
      payload: {
        id: string;
        email: string;
        image_url: string;
        created_at: string;
      };
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
    const socket = new WebSocket(`${WS_API_URL}`);
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
