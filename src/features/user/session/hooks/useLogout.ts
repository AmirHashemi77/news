"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchData } from "@/shared/api/fetchData";

interface LogoutResponse {
  status: string;
  message: string;
}

export function useLogout(onSuccess?: () => void) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const response = await fetchData<LogoutResponse, LogoutResponse, null>("/api/logout", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
      });

      if (!response.ok) {
        toast.error(response.error.message || "خروج از حساب کاربری انجام نشد.");
        return;
      }

      onSuccess?.();
      toast.success("با موفقیت از حساب کاربری خارج شدید.");

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout request failed:", error);
      toast.error("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { handleLogout, isLoggingOut };
}
