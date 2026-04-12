"use client";
import { useState, useEffect } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Chat = {
  id: string;
  title: string;
  messages: Message[];
};

export default function useChat() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const currentChat = chats.find((c) => c.id === currentChatId);

  // ✅ Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chats");
    if (saved) {
      setChats(JSON.parse(saved));
    }
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);
  useEffect(() => {
    if (chats.length > 0 && currentChatId === null) {
      setCurrentChatId(chats[0].id);
    }
  }, [chats, currentChatId]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const sendMessage = async (input: string) => {
    if (!input.trim() || loading) return;

    let chatId = currentChatId;

    let updatedMessages: Message[] = [];

    setChats((prev) => {
      let updatedChats = [...prev];

      // ✅ Create chat if none exists
      if (!chatId) {
        const newChat: Chat = {
          id: crypto.randomUUID(),
          title: "New Chat",
          messages: [],
        };

        updatedChats = [newChat, ...updatedChats];
        chatId = newChat.id;
        setCurrentChatId(chatId);
      }

      // ✅ Update correct chat
      updatedChats = updatedChats.map((chat) => {
        if (chat.id === chatId) {
          updatedMessages = [...chat.messages, {
            id: crypto.randomUUID(),
            role: "user",
            content: input,
          }];

          return {
            ...chat,
            messages: updatedMessages,
            title:
              chat.messages.length === 0
                ? input.slice(0, 20)
                : chat.title,
          };
        }
        return chat;
      });

      return updatedChats;
    });

    setLoading(true);

    const history = updatedMessages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history,
        }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      let aiText = "";
      const aiId = crypto.randomUUID();

      // add empty assistant message first
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { id: aiId, role: "assistant", content: "" },
                ],
              }
            : chat
        )
      );

      // stream chunks
      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value);

        const lines = chunk.split("\n").filter(Boolean);

        for (const line of lines) {
          try {
            const parsed = JSON.parse(line);
            aiText += parsed.response || "";
          } catch {
            // ignore malformed chunks
          }
        }

        // update UI live
        setChats((prev) =>
          prev.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: chat.messages.map((msg) =>
                    msg.id === aiId
                      ? { ...msg, content: aiText }
                      : msg
                  ),
                }
              : chat
          )
        );
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const deleteChat = (id: string) => {
    setChats((prev) => {
      const updated = prev.filter((chat) => chat.id !== id);

      // handle active chat 
      if (id === currentChatId) {
        if (updated.length > 0) {
          setCurrentChatId(updated[0].id);
        } else {
          setCurrentChatId(null);
        }
      }

      return updated;
    });
  };

  return {
    chats,
    currentChat,
    currentChatId,
    setCurrentChatId,
    createNewChat,
    sendMessage,
    deleteChat,
    loading,
  };
}