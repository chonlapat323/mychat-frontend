import { API_URL } from "@/libs/config";
import { LoginPayload } from "@/types/auth/login-payload";
import { RegisterPayload } from "@/types/auth/register-playload";

export const register = async (payload: RegisterPayload) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  return res.json();
};

export async function login(payload: LoginPayload) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Login failed");
  }

  return res.json();
}

export async function logoutRequest(): Promise<void> {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Logout failed:", text);
    throw new Error("Logout failed");
  }
}
