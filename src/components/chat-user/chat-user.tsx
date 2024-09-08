interface ChatUserProps {
  name: string;
  avatar: string;
}

export default function ChatUser({ name, avatar }: ChatUserProps) {
  return (
    <div className="flex items-center p-3 border-b">
      <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-3" />
      <span className="font-bold">{name}</span>
    </div>
  );
}
