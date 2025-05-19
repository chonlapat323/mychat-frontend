import { Message } from "@/types/message";
import clsx from "clsx";
import { useState } from "react";

type Props = {
  message: Message;
  isOwnMessage: boolean;
  senderName: string;
  senderImageUrl?: string;
};

export default function MessageBubble({
  message,
  isOwnMessage,
  senderName,
  senderImageUrl,
}: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div
      className={clsx("flex mb-2 items-start gap-2", {
        "justify-end": isOwnMessage,
        "justify-start": !isOwnMessage,
      })}
    >
      {!isOwnMessage && senderImageUrl && (
        <div className="relative w-8 h-8">
          {!imageLoaded && (
            <div className="absolute inset-0 rounded-full bg-gray-500 animate-pulse" />
          )}
          <img
            src={senderImageUrl}
            alt={senderName}
            className={clsx(
              "w-8 h-8 rounded-full object-cover transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      )}

      <div
        className={clsx(
          "max-w-xs p-2 rounded-lg text-sm",
          isOwnMessage ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
        )}
      >
        {!isOwnMessage && (
          <div className="text-xs font-semibold text-gray-300 mb-1">
            {senderName}
          </div>
        )}
        <div>{message.content}</div>
      </div>
    </div>
  );
}
