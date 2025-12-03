"use client";

import { NoticeProps } from "@/app/classes/noticeProps";

export default function Notice({ type = "success", message }: NoticeProps) {
  let bgColor = "";
  switch (type) {
    case "success":
      bgColor = "bg-green-700";
      break;
    case "error":
      bgColor = "bg-red-700";
      break;
    case "info":
      bgColor = "bg-blue-700";
      break;
    case "warning":
      bgColor = "bg-yellow-700";
      break;
    default:
      bgColor = "bg-gray-200";
  }

  return (
    <div className={`${bgColor} text-white px-4 py-2 rounded-md mb-4`}>
      {message}
    </div>
  );
}
