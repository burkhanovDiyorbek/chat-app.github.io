import { useParams } from 'react-router-dom';
import Chat from '../components/chat/chat';

export default function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>();

  if (!chatId) {
    console.error('No chat ID found in the URL parameters');
    return <div>No chat selected. Please select a chat to start messaging.</div>;
  }

  return (
    <div className="w-full bg-chat-background">
      <Chat chatId={chatId} currentUserId="currentUserId" />
    </div>
  );
}
