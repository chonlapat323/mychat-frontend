"use client";

import { useState, useEffect } from "react";

export type CreateRoomModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, type: "public" | "private") => void;
};

export default function CreateRoomModal({
  open,
  onClose,
  onCreate,
}: CreateRoomModalProps) {
  const [name, setName] = useState("");
  const [roomType, setRoomType] = useState<"public" | "private">("public");

  useEffect(() => {
    if (open) {
      setName("");
      setRoomType("public");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">สร้างห้องใหม่</h2>

        <div className="space-y-4 mb-4">
          <input
            type="text"
            placeholder="ชื่อห้อง"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <select
            value={roomType}
            onChange={(e) =>
              setRoomType(e.target.value as "public" | "private")
            }
            className="w-full p-2 border rounded"
          >
            <option value="public">สาธารณะ (Public)</option>
            <option value="private">ส่วนตัว (Private)</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            ยกเลิก
          </button>
          <button
            onClick={() => name && onCreate(name, roomType)}
            disabled={!name.trim()}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            สร้างห้อง
          </button>
        </div>
      </div>
    </div>
  );
}
