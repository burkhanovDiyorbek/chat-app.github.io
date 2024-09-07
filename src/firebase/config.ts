import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBA5b2Ba3U_T6MIoXnA-oEjowTbIgbaC6A',
  authDomain: 'web-chat-a80b3.firebaseapp.com',
  projectId: 'web-chat-a80b3',
  storageBucket: 'web-chat-a80b3.appspot.com',
  messagingSenderId: '314448159397',
  appId: '1:314448159397:web:0dcada5a53fcc28772a34c',
  measurementId: 'G-3L9H4NMVMS',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, db, firestore, auth, provider };
