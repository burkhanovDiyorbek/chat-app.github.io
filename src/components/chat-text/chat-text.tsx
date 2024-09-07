interface IChatProps {
  message: string;
  sender: string;
  time: string;
  isReceived: boolean;
}
export default function ChatText({ message, time, isReceived }: IChatProps) {
  return (
    <div className={`flex ${isReceived ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
          isReceived ? 'bg-white text-gray-900' : 'bg-green-400 text-white'
        } relative`}>
        <p className="flex items-center">{message}</p>

        <div className="text-xs text-gray-500 mt-1 flex items-center">
          {time}
          {/* {!isReceived && <span className="ml-1 text-green-500">✓</span>} */}
        </div>
      </div>
    </div>
  );
}
