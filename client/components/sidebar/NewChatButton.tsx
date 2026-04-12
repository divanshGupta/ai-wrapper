export default function NewChatButton({createNewChat}: any) {
  return (
    <button
      onClick={createNewChat}
      className="w-full bg-(--accent) text-black py-2 rounded-lg"
    >
      + New Chat
    </button>
  );
}