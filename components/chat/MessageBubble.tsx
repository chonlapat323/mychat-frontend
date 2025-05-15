import { Message } from "@/types/message";
import clsx from "clsx";

type Props = {
  message: Message;
  isOwnMessage: boolean;
  senderName: string;
};

export default function MessageBubble({
  message,
  isOwnMessage,
  senderName,
}: Props) {
  return (
    <div
      className={clsx("flex mb-2", {
        "justify-end": isOwnMessage,
        "justify-start": !isOwnMessage,
      })}
    >
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
