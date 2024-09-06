import ChatUser from '../chat-user/chat-user';
import ChatInput from '../chat-input/chat-input';
import ChatText from '../chat-text/chat-text';
export default function Chat() {
  return (
    <div className="w-full h-screen flex flex-col bg-chat-background">
      <div className="w-full h-screen">
        <ChatUser />
      </div>
      <div className="w-full flex flex-col p-3 max-w-[700px] mx-auto">
        <ChatText
          message="OMG 😲 do you remember what you did last night at the work night out?"
          sender="other"
          time="18:12"
          isReceived={true}
        />
        <ChatText message="no haha" sender="me" time="18:16" isReceived={false} />
        <ChatInput />
      </div>
    </div>
  );
}
