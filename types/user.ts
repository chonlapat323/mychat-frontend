export interface User {
  id: string; // Go ส่ง ObjectID เป็น string ผ่าน JSON
  email: string;
  image_url: string;
  created_at?: string; // หรือใช้ Date ถ้าแปลงแล้ว
}
