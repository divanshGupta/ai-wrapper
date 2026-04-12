import ChatList from "../sidebar/ChatList";
import NewChatButton from "../sidebar/NewChatButton";
import UserSection from "../sidebar/UserSection";

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

export default function Sidebar ({chats, currentChatId, setCurrentChatId, createNewChat, deleteChat}: Props) {
    return(
        <div className="w-64 h-full bg-(--bg-secondary) border-r border-(--border-color) flex flex-col">
            
            <div className="p-4">
                <NewChatButton createNewChat={createNewChat} />
            </div>

            <div className="flex-1 overflow-y-auto px-2">
                <ChatList chats={chats} 
                currentChatId={currentChatId} 
                setCurrentChatId={setCurrentChatId} 
                createNewChat={createNewChat}
                deleteChat={deleteChat}
                />
            </div>

            <div className="p-4 border-t border-(--border-color)">
                <UserSection />
            </div>
        </div>
    )
}