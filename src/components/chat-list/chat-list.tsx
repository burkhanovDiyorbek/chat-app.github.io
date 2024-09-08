import ChatListItem from '../chat-list-item/chat-list-item';
import { createOrGetChat } from '../../firebase/services';

interface ChatListProps {
  friends: { uid: string; name: string; avatar: string }[];
  currentUserId: string;
  onSelectChat: (chatId: string) => void;
}

export default function ChatList({ friends, currentUserId, onSelectChat }: ChatListProps) {
  const handleChatClick = async (friendId: string) => {
    try {
      const chatId = await createOrGetChat(currentUserId, friendId);
      onSelectChat(chatId);
    } catch (error) {
      console.error('Error while selecting chat:', error);
    }
  };

  return (
    <div className="chat-list">
      {friends?.map((friend) => (
        <div
          key={friend.uid}
          className="chat-item cursor-pointer"
          onClick={() => handleChatClick(friend.uid)}>
          <ChatListItem avatar={friend.avatar} name={friend.name} />
        </div>
      ))}
    </div>
  );
}
