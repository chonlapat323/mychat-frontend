import { useState } from "react";
import { createRoom, RoomType, Room } from "@/services/room.service";
import { AuthError } from "@/libs/error/AuthError";

export function useCreateRoom(onSuccess?: (room: Room) => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (name: string, type: RoomType) => {
    setLoading(true);
    setError(null);
    try {
      const newRoom = await createRoom(name, type);
      onSuccess?.(newRoom);
    } catch (err: unknown) {
      if (err instanceof AuthError) {
        setError("Session expired. Please sign in again.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    createRoom: handleCreate,
    loading,
    error,
  };
}
