import { useState } from "react";
import { login } from "@/services/auth.service";
import { LoginPayload } from "@/types/auth/login-payload";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(payload);
      return data;
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}
