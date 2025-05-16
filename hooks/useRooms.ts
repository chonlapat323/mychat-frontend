import useSWR, { mutate } from "swr";
import { fetchRooms } from "@/services/room.service";
import { Room } from "@/services/room.service";

export function useRooms() {
  const { data, error, isLoading } = useSWR<Room[]>("/rooms", fetchRooms);

  return {
    rooms: data || [],
    loading: isLoading,
    error,
    reloadRooms: () => mutate("/rooms"),
  };
}
