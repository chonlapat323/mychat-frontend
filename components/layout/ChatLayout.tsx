"use client";

import { useRooms } from "@/hook/useRooms";
import UserSection from "../chat/UserSection";
import { useState } from "react";
import CreateRoomModal from "../modal/CreateRoomModal";
import { useCreateRoom } from "@/hook/useCreateRoom";
import { useMessages } from "@/hook/useMessages";
import MessageBubble from "../chat/MessageBubble";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getUserNameById } from "@/utils/user";
import { joinRoom, Room } from "@/services/room.service";
import { User } from "@/types/user";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState(false);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const { messages, loading: loading_message } = useMessages(activeRoomId!);
  const { rooms, reloadRooms, loading } = useRooms();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);

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

  const handleRoomClick = (room_id: string) => {
    const foundRoom = rooms.find((r) => r.id === room_id);
    if (!foundRoom) return;

    setActiveRoomId(room_id);
    const isMember =
      foundRoom.members.some((u) => {
        return u.id === currentUser?.id;
      }) ?? false;
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

  const currentUser = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}

        <aside className="w-20 bg-gray-900 text-white flex flex-col items-center py-4 space-y-4">
          <div className="mb-2">
            <button
              onClick={() => setShowModal(true)}
              className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white text-2xl font-bold"
              title="Create new room"
            >
              +
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden group relative scroll-area">
            <div className="scroll-on-hover h-full overflow-y-auto group-hover:overflow-y-auto">
              <div className="min-h-[400px] flex flex-col items-center gap-4 py-4">
                {loading ? (
                  <div className="text-xs text-gray-400">Loading...</div>
                ) : (
                  rooms.map((room) => (
                    <button
                      key={room.id}
                      title={room.name}
                      onClick={() => handleRoomClick(room.id)}
                      className="w-12 h-12 bg-gray-700 rounded-full hover:bg-gray-600 flex items-center justify-center text-sm font-bold"
                    >
                      {room.name.charAt(0).toUpperCase()}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="mb-2">
            <UserSection />
          </div>
        </aside>

        {/* Main Panel */}
        <main className="flex-1 flex bg-gray-800">
          {/* Friend / Room List */}
          {/* <section className="w-64 bg-gray-850 border-r border-gray-700 text-white p-4 space-y-4">
            <div className="font-semibold text-lg">Friends</div>
            <div className="space-y-2 overflow-y-auto flex-1">
              <div className="p-2 bg-gray-700 rounded hover:bg-gray-600">
                User #1
              </div>
              <div className="p-2 bg-gray-700 rounded hover:bg-gray-600">
                User #2
              </div>
            </div>
          </section> */}

          {/* Chat Window */}
          <section className="flex-1 flex flex-col text-white">
            {/* Chat Header */}
            <div className="h-14 px-4 bg-gray-900 border-b border-gray-700 flex items-center">
              <h2 className="font-semibold">
                {rooms.find((r) => r.id === activeRoomId)?.name ||
                  "Select a room"}
              </h2>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {!activeRoom ? (
                <div className="text-gray-400">No room selected</div>
              ) : !isMember ? (
                <div className="text-gray-400">
                  <p>You are not a member of this room.</p>
                  <button
                    onClick={() => handleJoinRoom(activeRoom.id)}
                    className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 rounded mt-2"
                  >
                    Join Room
                  </button>
                </div>
              ) : loading_message ? (
                <div className="text-gray-400">Loading messages...</div>
              ) : messages.length ? (
                messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isOwnMessage={msg.sender_id === currentUser?.id}
                    senderName={getUserNameById(allUsers, msg.sender_id)}
                  />
                ))
              ) : (
                <div className="text-gray-400">No messages</div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-700">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
          </section>
        </main>
      </div>
      <CreateRoomModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateRoom}
      />
    </>
  );
}
