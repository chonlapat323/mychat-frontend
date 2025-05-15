"use client";

import Spinner from "@/components/ui/Spinner";
import { useAuthLoad } from "@/hook/useAuthLoad";

export default function AuthLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const loading = useAuthLoad();

  if (loading) {
    return <Spinner />;
  }

  return <>{children}</>;
}
