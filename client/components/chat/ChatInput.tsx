"use client";
import { useState } from "react";

export default function ChatInput({ onSend, loading }: any) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Ignore Shift+Enter for new lines if needed
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 bg-(--bg-tertiary) rounded-xl px-4 py-2">

        <textarea
          className="flex-1 bg-transparent outline-none resize-none text-(--text-primary)"
          placeholder="Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="text-(--accent)"
        >
          {loading ? "..." : "Send"}
        </button>

      </div>
    </div>
  );
}