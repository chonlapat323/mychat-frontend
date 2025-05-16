export type Message = {
  id: string;
  room_id: string;
  sender_id: string;
  sender: SafeUser;
  content: string;
  created_at: string;
  type: "message";
};

export interface SafeUser {
  id: string; // MongoDB ObjectID → string
  email: string;
  image_url?: string; // อาจไม่มีรูป (optional)
}
