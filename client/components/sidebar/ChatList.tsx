"use client";

type Chat = {
    id: string;
    title: string;
    messages: any[];
};

type Props = {
    chats: Chat[];
    currentChatId: string | null;
    setCurrentChatId: (id: string) => void;
    createNewChat: () => void;
    deleteChat: (id: string) => void;
};

export default function ChatList({ chats, currentChatId, setCurrentChatId, deleteChat }: Props) {
  return (
    <div className="flex-1 overflow-y-auto px-2">
      {chats.map((chat) => {
        const isActive = chat.id === currentChatId;

        return (
          <div 
            key={chat.id}
            className={`flex items-center justify-between group ${isActive 
                  ? "bg-(--bg-tertiary)" 
                  : "hover:bg-(--bg-tertiary)"
            }`}
          >

            <div
              onClick={() => setCurrentChatId(chat.id)}
              className={`
                p-2 rounded-lg cursor-pointer truncate
              `}
            >
              {chat.title || "New Chat"}
            </div>

            {/* delete button */}
            <button
              onClick={() => deleteChat(chat.id)}
              className="p-2 opacity-0 group-hover:opacity-100 text-red-400 ml-2"
            >
              ❌
            </button>
            
          </div>
        );
      })}
    </div>
  );
}