export type RegisterForm = {
  image_url: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
