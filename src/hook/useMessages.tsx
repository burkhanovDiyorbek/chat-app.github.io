import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, doc } from 'firebase/firestore';
import { firestore } from '../firebase/config';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: any;
}

// Ma'lum bir chat uchun xabarlarni olish
export const useMessages = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!chatId) return;

    const chatRef = doc(firestore, 'chats', chatId);
    const messagesRef = collection(chatRef, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs: Message[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [chatId]);

  return { messages, loading };
};
