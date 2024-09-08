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
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import { signInWithPopup } from 'firebase/auth';

interface IUser {
  uid: string | null;
  username: string | null;
  online: boolean | null;
  email: string | null;
  avatar: string | null;
  name: string | null;
  friends: string[] | null;
}

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
  const q = query(
    usersRef,
    where('name', '>=', searchTerm),
    where('name', '<=', searchTerm + '\uf8ff'),
  );

  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
    const result = await signInWithPopup(auth, provider);
    const userData: IUser = {
      uid: result.user.uid,
      online: null,
      email: result.user.email,
      name: result.user.displayName,
      username: result.user.uid,
      avatar: result.user.photoURL,
      friends: [],
    };

    if (!(await checkUserExists(result.user.email))) {
      await setUserToCollection(userData);
    }

    return result;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const checkAuth = async (uid: string | null) => {
  if (!uid) return false;
  try {
    const userRef = doc(firestore, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists();
  } catch (error) {
    console.error('Error checking auth:', error);
    return false;
  }
};

export const getUserData = async (uid: string | null | undefined) => {
  if (!uid) throw new Error('User ID is not provided.');

  try {
    const usersRef = collection(firestore, 'users');
    const q = query(usersRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
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
