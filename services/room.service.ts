import { fetchWithAuth } from "@/libs/fetchWithAuth";
import { ROOM_API_URL } from "@/libs/config";
import { User } from "@/types/user";

export type Room = {
  id: string;
  name: string;
  members: User[];
};
export type RoomType = "public" | "private";

export function fetchRooms(): Promise<Room[]> {
  return fetchWithAuth<Room[]>(`${ROOM_API_URL}/rooms`);
}

export function createRoom(name: string, type: RoomType): Promise<Room> {
  return fetchWithAuth<Room>(`${ROOM_API_URL}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, type }),
  });
}

export function joinRoom(roomId: string): Promise<void> {
  return fetchWithAuth<void>(`${ROOM_API_URL}/rooms/${roomId}/join`, {
    method: "POST",
  });
}
