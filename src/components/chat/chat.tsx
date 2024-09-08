import { useState, useEffect } from 'react';
import { addMessage, getMessages } from '../../firebase/services';
import ChatInput from '../chat-input/chat-input';
import ChatText from '../chat-text/chat-text';

interface ChatProps {
  chatId: string | undefined;
  currentUserId: string;
}

export default function Chat({ chatId, currentUserId }: ChatProps) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!chatId) {
      console.error('Chat ID is undefined or invalid');
      return;
    }

    const unsubscribe = getMessages(chatId, setMessages);

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [chatId]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    if (!chatId) {
      console.error('Cannot send message: Chat ID is undefined or invalid');
      return;
    }

    await addMessage(chatId, {
      senderId: currentUserId, // Yuboruvchi foydalanuvchi identifikatori
      content: message,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="w-full h-screen flex flex-col bg-chat-background">
      <div className="w-full h-screen overflow-auto p-4">
        {messages.map((msg, index) => (
          <ChatText
            key={index}
            message={msg.content}
            sender={msg.senderId === currentUserId ? 'me' : 'other'} // `senderId` orqali yuboruvchini aniqlash
            time={new Date(msg.timestamp).toLocaleTimeString()}
            isReceived={msg.senderId !== currentUserId}
          />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
