"use client";

import ChatInput from "../chat/ChatInput";
import MessageList from "../chat/MessageList";

export default function MainChatLayout({currentChat, loading, sendMessage}: any) {

  return (
    <div className="flex flex-col h-full">

      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={currentChat?.messages || []} loading={loading} />
      </div>

      <div className="border-t border-(--border-color) bg-(--bg-secondary)">
        <ChatInput onSend={sendMessage} loading={loading} />
      </div>

    </div>
  );
}