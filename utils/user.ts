import { User } from "@/types/user";

export function getUserNameById(users: User[], id: string | number): string {
  const user = users.find((u) => u.id === id);
  return user ? user.email : "Unknown User";
}
