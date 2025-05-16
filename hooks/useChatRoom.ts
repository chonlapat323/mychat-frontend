import { useEffect, useState } from "react";
import { useMessages } from "@/hooks/useMessages";
import { useRooms } from "@/hooks/useRooms";
import { useCreateRoom } from "@/hooks/useCreateRoom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { joinRoom, Room } from "@/services/room.service";
import { useWebSocket } from "@/hooks/useWebSocket";
import { WebSocketMessage } from "@/contexts/WebSocketContext";
import { Message } from "@/types/message";
import { User } from "@/types/user";

export const useChatRoom = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [isMember, setIsMember] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const { messages: initialMessages, loading: loadingMessages } = useMessages(
    activeRoomId!
  );
  const { rooms, reloadRooms, loading } = useRooms();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const { sendMessage } = useWebSocket((msg) => {
    if (msg.type === "message") {
      setMessages((prev) => [
        ...prev,
        {
          ...msg,
          id: msg.id!,
          content: msg.content!,
          type: "message",
        },
      ]);
    }
  });

  useEffect(() => {
    if (initialMessages.length) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  const {
    createRoom,
    loading: creating,
    error,
  } = useCreateRoom(() => {
    reloadRooms();
    setShowModal(false);
  });

  const handleCreateRoom = (name: string, type: "public" | "private") => {
    createRoom(name, type);
  };

  const handleRoomClick = (roomId: string) => {
    const foundRoom = rooms.find((r) => r.id === roomId);
    if (!foundRoom) return;

    setActiveRoomId(roomId);
    const isMember = foundRoom.members.some((u) => u.id === currentUser?.id);
    setIsMember(isMember);
    setActiveRoom(foundRoom);
    setAllUsers(foundRoom.members);
  };

  const handleJoinRoom = async (roomId: string) => {
    try {
      await joinRoom(roomId);
      await reloadRooms();
    } catch (err) {
      console.error("Join room error:", err);
    }
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !currentUser || !activeRoomId) return;

    const msg: WebSocketMessage = {
      type: "message",
      room_id: activeRoomId,
      text: messageInput,
      sender_id: currentUser.id,
      created_at: new Date().toISOString(),
      sender: currentUser,
    };

    sendMessage(msg);
    setMessageInput("");
  };

  return {
    showModal,
    setShowModal,
    rooms,
    reloadRooms,
    loadingRooms: loading,
    createRoom,
    creating,
    error,
    activeRoom,
    activeRoomId,
    isMember,
    allUsers,
    messages,
    messageInput,
    setMessageInput,
    loadingMessages,
    handleRoomClick,
    handleSendMessage,
    handleCreateRoom,
    handleJoinRoom,
  };
};
