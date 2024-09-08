import { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage(''); // Xabar yuborilgandan keyin inputni tozalash
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex p-3 border-t">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow border p-2 rounded"
      />
      <button onClick={handleSend} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
        Send
      </button>
    </div>
  );
}
