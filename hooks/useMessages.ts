import useSWR from "swr";
import { fetchMessages } from "@/services/message.service";
import { Message } from "@/types/message";
import { MESSAGE_API_URL } from "@/libs/config";

export function useMessages(roomId?: string) {
  const { data, error, isLoading } = useSWR<Message[]>(
    roomId ? `${MESSAGE_API_URL}/messages?room_id=${roomId}` : null,
    () => fetchMessages(roomId!)
  );

  return {
    messages: data ?? [],
    loading: isLoading,
    error,
  };
}
