import { initializeApp } from "firebase/app"
import { getFirestore, Timestamp } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAcA7hEwgYVzSW0dHlu35KBgPAuSuuo3XM",
  authDomain: "clshare-cc44a.firebaseapp.com",
  projectId: "clshare-cc44a",
  storageBucket: "clshare-cc44a.appspot.com",
  messagingSenderId: "31980976829",
  appId: "1:31980976829:web:26463ab39a6e6de0ed15d4"
};
// app
const app = initializeApp(firebaseConfig)
// services
const db = getFirestore(app)
const storage = getStorage(app)
// utility
const timestamp = Timestamp

export { db, timestamp, storage }
