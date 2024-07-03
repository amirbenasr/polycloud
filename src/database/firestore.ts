import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  Firestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

export interface Document {
  id?: string;
  [key: string]: any;
}

const createDocument = async (
  collectionName: string,
  data: Document
): Promise<Document> => {
  const docRef = await addDoc(collection(firestore, collectionName), data);
  return { id: docRef.id, ...data };
};

const readDocument = async (
  collectionName: string,
  id: string
): Promise<Document> => {
  const docRef = doc(firestore, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Document not found");
  }
};

export { createDocument, readDocument };
