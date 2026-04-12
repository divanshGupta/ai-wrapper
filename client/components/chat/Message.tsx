type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function Message({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      
      <div
        className={`max-w-[70%] px-4 py-2 rounded-xl ${
          isUser
            ? "bg-(--accent) text-black"
            : "bg-(--bg-tertiary) text-(--text-primary)"
        }`}
      >
        {content}
        
      </div>

    </div>
  );
}