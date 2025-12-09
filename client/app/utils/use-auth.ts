"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="));

    if (!userCookie) {
      router.push("/auth/login");
    } else {
      try {
        const userValue = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
        setUser(userValue);
      } catch {
        router.push("/auth/login");
      }
    }
  }, [router]);

  return { user };
}
