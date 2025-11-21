"use client";

import { NoticeProps } from "@/app/classes/noticeProps";

export default function Notice({ type = "success", message }: NoticeProps) {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className={`${bgColor} text-white px-4 py-2 rounded-md mb-4`}>
      {message}
    </div>
  );
}
