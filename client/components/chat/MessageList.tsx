"use client";
import { useEffect, useRef } from "react";
import Message from "./Message";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Props = {
  messages: Message[];
  loading: boolean;
};

export default function MessageList({ messages, loading }: Props) {
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

  return (
    <div className="flex flex-col gap-4">
      
      {messages.map((msg: any, index) => {
        const isLast = index === messages.length - 1;
        return (
          <Message 
            key={msg.id} 
            role={msg.role} 
            content={msg.content} 
            isStreaming={loading && msg.role === "assistant" && isLast}
          />
        )
      })}

      {loading && (
        <div className="text-(--text-secondary)">Thinking...</div>
      )}

      <div ref={bottomRef} />

    </div>
  );
}