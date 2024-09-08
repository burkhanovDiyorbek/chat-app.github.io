import { Outlet, useNavigate, useParams } from 'react-router-dom';
import ChatList from '../components/chat-list/chat-list';
import Search from '../components/search/search';
import { useQuery } from '@tanstack/react-query';
import { getFriendsData, getUsersByQuery, getUserData } from '../firebase/services';
import { useEffect, useState } from 'react';

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
  const navigate = useNavigate();
  const [friends, setFriends] = useState<FriendData[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChatId, setSelectedChatId] = useState<string>('');
  useEffect(() => {
    if (isSuccess) {
      setFriends(friends);
    }
  });
  const { data: userData, error: userError } = useQuery<UserData | undefined>({
    queryKey: ['userData', uid],
    queryFn: async () => {
      const user = await getUserData(uid);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        friends: user.friends,
      } as UserData;
    },
    enabled: !!uid,
  });

  // Friend data query
  const { error: friendsError, isSuccess } = useQuery<FriendData[]>({
    queryKey: ['friendsData', userData?.friends],
    queryFn: async () => {
      if (!userData?.friends || userData.friends.length === 0) {
        return [];
      }
      return new Promise<FriendData[]>((resolve) => {
        getFriendsData(userData.friends!, (data) => resolve(data));
      });
    },
    enabled: !!userData?.friends && userData.friends.length > 0 && !isSearching,
  });

  const { data: searchData, error: searchError } = useQuery<FriendData[]>({
    queryKey: ['searchResults', searchQuery],
    queryFn: () => getUsersByQuery(searchQuery),
    enabled: !!searchQuery && isSearching,
  });

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    navigate(`/uid/${uid}/chat/${chatId}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(query.trim() !== '');
  };

  if (userError || friendsError || searchError) {
    return <div>Error: {userError?.message || friendsError?.message || searchError?.message}</div>;
  }

  const displayedFriends = isSearching ? searchData : friends;

  return (
    <div className="flex">
      <div className="flex flex-col border-r-2 border-gray-300 h-screen w-full max-w-[364px] p-3">
        <Search onSearch={handleSearch} onFocus={() => {}} onBlur={() => {}} />
        <ChatList
          friends={displayedFriends as any}
          currentUserId={uid as string}
          onSelectChat={handleSelectChat}
        />
      </div>
      {selectedChatId ? <div>{/* Your chat or messages UI for selectedChatId */}</div> : null}
      <Outlet />
    </div>
  );
}
