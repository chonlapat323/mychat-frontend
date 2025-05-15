import { fetchWithAuth } from "@/libs/fetchWithAuth";
import { API_URL } from "@/libs/config";
import { Message } from "@/types/message";

export function fetchMessages(roomId: string): Promise<Message[]> {
  return fetchWithAuth(`${API_URL}/rooms/${roomId}/messages`);
}
