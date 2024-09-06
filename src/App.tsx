import ChatList from './components/chat-list/chat-list';
import Search from './components/search/search';
import Chat from './components/chat/chat';
export default function App() {
  return (
    <div className="flex">
      <div className="flex flex-col border-r-2 border-gray-300 h-screen w-full max-w-[364px] p-3">
        <Search />
        <ChatList />
        <ChatList />
      </div>
      <Chat />
    </div>
  );
}
