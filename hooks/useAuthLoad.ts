import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/store/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { fetchWithAuth } from "@/libs/fetchWithAuth";
import { User } from "@/types/user";
import { API_URL } from "@/libs/config";
import { AuthError } from "@/libs/error/AuthError";

export function useAuthLoad(): boolean {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const loadUser = async () => {
      if (pathname === "/signin") {
        setLoading(false);
        return;
      }
      try {
        const user = await fetchWithAuth<User>(`${API_URL}/me`);
        dispatch(setUser(user));
      } catch (err) {
        if (err instanceof AuthError && err.statusCode === 401) {
          dispatch(clearUser());
          router.push("/signin");
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [dispatch, router]);

  return loading;
}
