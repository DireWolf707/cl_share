import { initializeApp } from "firebase/app"
import { getFirestore, Timestamp } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBVK0Ba04KwLVbOj4bjt1QpcWBEMaZzqYg",
  authDomain: "projectmangement-20012.firebaseapp.com",
  projectId: "projectmangement-20012",
  storageBucket: "projectmangement-20012.appspot.com",
  messagingSenderId: "362165896174",
  appId: "1:362165896174:web:2941395238b4a24b0304ff"
};
// app
const app = initializeApp(firebaseConfig)
// services
const db = getFirestore(app)
const storage = getStorage(app)
// utility
const timestamp = Timestamp

export { db, timestamp, storage }
