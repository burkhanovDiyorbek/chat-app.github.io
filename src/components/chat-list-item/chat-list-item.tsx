export default function ChatListItem({ name, avatar }: { name: string; avatar: string }) {
  return (
    <div className="flex items-center space-x-3 py-4">
      <img src={avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />

      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
          <span className="text-sm text-gray-500">online</span>
        </div>
      </div>
    </div>
  );
}
