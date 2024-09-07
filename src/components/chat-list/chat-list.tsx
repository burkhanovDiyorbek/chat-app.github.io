import ChatListItem from '../chat-list-item/chat-list-item';
import { createOrGetChat } from '../../firebase/services';

interface ChatListProps {
  friends: { uid: string; name: string; avatar: string }[];
  currentUserId: string;
  onSelectChat: (chatId: string) => void;
}

export default function ChatList({ friends, currentUserId, onSelectChat }: ChatListProps) {
  const handleChatClick = async (friendId: string) => {
    console.log('handleChatClick', friendId);

    try {
      const chatId = await createOrGetChat(currentUserId, friendId);
      console.log('chatId', chatId);

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
          className="chat-item bg-red-600 cursor-pointer"
          onClick={() => {
            console.log('Clicked on:', friend.uid); // Test xabari qo'shing
            handleChatClick(friend.uid);
          }}>   
          <ChatListItem avatar={friend.avatar} name={friend.name} />
        </div>
      ))}
    </div>
  );
}
