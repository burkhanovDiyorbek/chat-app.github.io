import ChatListItem from '../chat-list-item/chat-list-item';
export default function ChatList() {
  const data = [
    {
      id: 1,
      name: 'Greg James',
      avatar: 'https://via.placeholder.com/40',
      online: true,
    },
    {
      id: 2,
      name: 'Greg James',
      avatar: 'https://via.placeholder.com/40',
      online: true,
    },
    {
      id: 3,
      name: 'Greg James',
      avatar: 'https://via.placeholder.com/40',
      online: true,
    },
    {
      id: 4,
      name: 'Greg James',
      avatar: 'https://via.placeholder.com/40',
      online: true,
    },
  ];
  return (
    <div>
      {data.map((item) => (
        <ChatListItem key={item.id} {...item} />
      ))}
    </div>
  );
}
