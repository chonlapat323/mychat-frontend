import { fetchWithAuth } from "@/libs/fetchWithAuth";
import { MESSAGE_API_URL } from "@/libs/config";
import { Message } from "@/types/message";

export function fetchMessages(roomId: string): Promise<Message[]> {
  return fetchWithAuth<Message[]>(
    `${MESSAGE_API_URL}/messages?room_id=${roomId}`
  );
}
