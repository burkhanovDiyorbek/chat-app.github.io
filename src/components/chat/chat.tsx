import { useState, useEffect } from 'react';
import { addMessage, getMessages, getUserData } from '../../firebase/services';
import ChatInput from '../chat-input/chat-input';
import ChatText from '../chat-text/chat-text';
import ChatUser from '../chat-user/chat-user';

interface ChatProps {
  chatId: string | undefined;
  currentUserId: string;
}

export default function Chat({ chatId, currentUserId }: ChatProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [friendData, setFriendData] = useState<{ name: string; avatar: string | null } | null>(
    null,
  );

  useEffect(() => {
    if (!chatId) {
      console.error('Chat ID is undefined or invalid');
      return;
    }

    const unsubscribe = getMessages(chatId, setMessages);

    const friendId = chatId.split('_').find((id) => id !== currentUserId);

    if (friendId) {
      getUserData(friendId)
        .then((data) => {
          setFriendData({ name: data.name, avatar: data.avatar });
        })
        .catch((error) => {
          console.error('Error fetching friend data:', error);
        });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [chatId, currentUserId]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    if (!chatId) {
      console.error('Cannot send message: Chat ID is undefined or invalid');
      return;
    }

    await addMessage(chatId, {
      senderId: currentUserId,
      content: message,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="w-full h-screen flex flex-col bg-chat-background">
      {friendData && <ChatUser name={friendData.name} avatar={friendData.avatar ?? ''} />}
      <div className="w-full h-full overflow-auto p-4">
        {messages.map((msg, index) => (
          <ChatText
            key={index}
            message={msg.content}
            sender={msg.senderId === currentUserId ? 'me' : 'other'}
            time={new Date(msg.timestamp).toLocaleTimeString()}
            isReceived={msg.senderId !== currentUserId}
          />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
