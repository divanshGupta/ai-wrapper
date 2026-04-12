"use client";
import MainChat from "@/components/layout/MainChat";
import Sidebar from "@/components/layout/Sidebar"
import useChat from "@/hooks/useChat";

export default function Home() {
  const {chats, currentChat, currentChatId, setCurrentChatId, createNewChat, loading, sendMessage, deleteChat} = useChat();
  return (
    <div className="flex h-screen bg-(--bg-primary) text-(--text-primary)">

      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar 
          chats={chats}
          currentChatId={currentChatId}
          setCurrentChatId={setCurrentChatId}
          createNewChat={createNewChat}
          deleteChat={deleteChat}
        />
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        <MainChat 
          currentChat={currentChat}
          loading={loading}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}
