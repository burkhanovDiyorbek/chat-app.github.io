import { Outlet } from 'react-router-dom';
import ChatList from '../components/chat-list/chat-list';
import Search from '../components/search/search';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFriendsData, getUsersByQuery, getUserData } from '../firebase/services';
import { useState } from 'react';

interface UserData {
  id: string;
  name: string;
  email: string;
  friends?: string[];
}

interface FriendData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export default function Layout() {
  const { uid } = useParams<{ uid: string }>();
  const [friends, setFriends] = useState<FriendData[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChatId, setSelectedChatId] = useState<string>('');

  const { data: userData, error: userError } = useQuery<UserData>({
    queryKey: ['userData', uid],
    queryFn: () => getUserData(uid),
    enabled: !!uid,
  });

  const { data: friendsData, error: friendsError } = useQuery<FriendData[]>({
    queryKey: ['friendsData', userData?.friends],
    queryFn: () => getFriendsData(userData?.friends || [], setFriends),
    enabled: !!userData?.friends && userData?.friends.length > 0 && !isSearching, // `enabled` shartini yangilash
    onSuccess: (data) => {
      if (data) setFriends(data);
    },
  });

  const { data: searchData, error: searchError } = useQuery<FriendData[]>({
    queryKey: ['searchResults', searchQuery],
    queryFn: () => getUsersByQuery(searchQuery),
    enabled: !!searchQuery && isSearching,
  });

  const handleSelectChat = (chatId: string) => {
    console.log('Selected chat ID:', chatId);
    setSelectedChatId(chatId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFocus = () => {
    setIsSearching(true);
  };

  const handleBlur = () => {
    setIsSearching(false);
    setSearchQuery('');
  };

  if (userError || friendsError || searchError) {
    console.error('Xatolik foydalanuvchini olishda:', userError || friendsError || searchError);
    return <div>Error: {userError?.message || friendsError?.message || searchError?.message}</div>;
  }

  const displayedFriends = isSearching ? searchData : friends;

  return (
    <div className="flex">
      <div className="flex flex-col border-r-2 border-gray-300 h-screen w-full max-w-[364px] p-3">
        <Search onSearch={handleSearch} onFocus={handleFocus} onBlur={handleBlur} />
        <ChatList
          friends={displayedFriends || []}
          currentUserId={uid as string}
          onSelectChat={handleSelectChat}
        />
      </div>
      {selectedChatId ? (
        <div>{/* Your Chat component or messages UI for selectedChatId */}</div>
      ) : (
        <div>Select a chat</div>
      )}
      <Outlet />
    </div>
  );
}
