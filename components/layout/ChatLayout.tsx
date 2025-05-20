"use client";

import { useChatRoom } from "@/hooks/useChatRoom";
import UserSection from "../chat/UserSection";
import CreateRoomModal from "../modal/CreateRoomModal";
import MessageBubble from "../chat/MessageBubble";
import { getUserImageById, getUserNameById } from "@/utils/user";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Spinner from "../ui/Spinner";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const {
    showModal,
    setShowModal,
    rooms,
    loadingRooms,
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
    messagesContainerRef,
  } = useChatRoom();

  return (
    <>
      <div className="flex h-screen">
        <aside className="w-20 bg-gray-900 text-white flex flex-col items-center py-4 space-y-4">
          {currentUser?.role === "admin" && (
            <div className="mb-2">
              <button
                onClick={() => setShowModal(true)}
                className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white text-2xl font-bold"
                title="Create new room"
              >
                +
              </button>
            </div>
          )}
          <div className="flex-1 min-h-0 overflow-hidden group relative scroll-area">
            <div className="scroll-on-hover h-full overflow-y-auto group-hover:overflow-y-auto">
              <div className="min-h-[400px] flex flex-col items-center gap-4 py-4">
                {loadingRooms ? (
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

        <main className="flex-1 flex bg-gray-800">
          <section className="flex-1 flex flex-col text-white">
            <div className="h-14 px-4 bg-gray-900 border-b border-gray-700 flex items-center">
              <h2 className="font-semibold">
                {rooms.find((r) => r.id === activeRoomId)?.name ||
                  "Select a room"}
              </h2>
            </div>

            <div
              key={activeRoomId}
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col-reverse"
            >
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
              ) : loadingMessages ? (
                <Spinner />
              ) : messages.length ? (
                <>
                  {[...messages].reverse().map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      message={msg}
                      isOwnMessage={msg.sender_id === currentUser?.id}
                      senderName={getUserNameById(allUsers, msg.sender_id)}
                      senderImageUrl={getUserImageById(allUsers, msg.sender_id)}
                    />
                  ))}
                </>
              ) : (
                <div className="text-gray-400">No messages</div>
              )}
            </div>

            <div className="p-4 border-t border-gray-700">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
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
