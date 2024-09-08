import { firestore, auth, provider } from './config';
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  getDoc,
  doc,
  serverTimestamp,
  setDoc,
  orderBy,
} from 'firebase/firestore';
import { signInWithPopup, onAuthStateChanged, getAuth } from 'firebase/auth';

interface IUser {
  uid: string | null;
  username: string | null;
  online: boolean | null;
  email: string | null;
  avatar: string | null;
  name: string | null;
  friends: string[] | null;
}

export const addMessage = async (chatId: string, message: any) => {
  if (!chatId) {
    console.error('Invalid chat ID for adding message');
    return;
  }

  const chatRef = collection(firestore, 'chats', chatId, 'messages');
  await addDoc(chatRef, message);
};

// Xabarlarni jonli kuzatish funksiyasi (snapshot)
export const getMessages = (chatId: string, callback: (messages: any[]) => void) => {
  if (!chatId) {
    console.error('Invalid chat ID for getting messages');
    return;
  }

  const chatRef = collection(firestore, 'chats', chatId, 'messages');
  const q = query(chatRef, orderBy('timestamp'));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => doc.data());
    callback(messages);
  });

  return unsubscribe;
};

export const setUserToCollection = async (user: IUser) => {
  try {
    await addDoc(collection(firestore, 'users'), user);
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const getUsersByQuery = async (searchTerm: string): Promise<any[]> => {
  if (!searchTerm) return [];
  const usersRef = collection(firestore, 'users');
  const q = query(usersRef);

  try {
    const querySnapshot = await getDocs(q);
    const allUsers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return allUsers.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
  } catch (error) {
    console.error('Error fetching users by query:', error);
    throw error;
  }
};

export const getFriendsData = (friends: string[], callback: (users: any[]) => void) => {
  if (friends.length === 0) {
    callback([]);
    return;
  }

  const usersRef = collection(firestore, 'users');
  const q = query(usersRef, where('uid', 'in', friends));

  try {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      callback(users);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error fetching friends data:', error);
    throw error;
  }
};

const checkUserExists = async (email: string | null) => {
  const usersRef = collection(firestore, 'users');
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size > 0;
};

export const signInWithGoogle = async () => {
  try {
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();
    localStorage.setItem('token', token);

    const userData: IUser = {
      uid: user.uid,
      online: true,
      email: user.email,
      name: user.displayName,
      username: user.uid,
      avatar: user.photoURL,
      friends: [],
    };

    if (!(await checkUserExists(userData.email))) {
      await setUserToCollection(userData);
    }

    return result;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const checkAuth = async () => {
  const auth = getAuth();

  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(!!user);
    });
  });
};

export const getUserData = async (uid: string | null | undefined) => {
  if (!uid) throw new Error('User ID is not provided.');

  try {
    const usersRef = collection(firestore, 'users');
    const q = query(usersRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      window.location.href = '/register';
      throw new Error('User not found.');
    }

    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

const createChatId = (userId1: string, userId2: string): string => {
  return [userId1, userId2].sort().join('_');
};

export const createOrGetChat = async (userId1: string, userId2: string) => {
  const chatId = createChatId(userId1, userId2);
  const chatRef = doc(firestore, 'chats', chatId);

  try {
    const chatDoc = await getDoc(chatRef);

    if (!chatDoc.exists()) {
      const data = {
        users: [userId1, userId2].filter(Boolean),
        createdAt: serverTimestamp(),
      };

      await setDoc(chatRef, data);
    }

    return chatId;
  } catch (error) {
    console.error('Error creating or getting chat:', error);
    throw error;
  }
};
