import { useState, useCallback } from "react";
import { register } from "@/services/auth.service";
import { RegisterPayload } from "@/types/auth/register-playload";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = useCallback(async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await register(payload);
      return res;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        throw err;
      }

      // fallback
      setError("Unknown error occurred");
      throw new Error("Unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleRegister, loading, error };
}
