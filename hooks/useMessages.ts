import useSWR from "swr";
import { fetchMessages } from "@/services/message.service";
import { Message } from "@/types/message";

export function useMessages(roomId?: string) {
  const { data, error, isLoading } = useSWR<Message[]>(
    roomId ? `/rooms/${roomId}/messages` : null,
    () => fetchMessages(roomId!)
  );

  return {
    messages: data ?? [],
    loading: isLoading,
    error,
  };
}
