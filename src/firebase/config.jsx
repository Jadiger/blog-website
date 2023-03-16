import  { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { initializeApp } from "firebase/app";
// import {getStorage} from "firebase/storage";
// import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBjpaRmFYfAKyUlqlBZ5rBA3CAX34uh0V0",
  authDomain: "blog-c894f.firebaseapp.com",
  projectId: "blog-c894f",
  storageBucket: "blog-c894f.appspot.com",
  messagingSenderId: "1023478766445",
  appId: "1:1023478766445:web:22f143c2fcbd885d95d864",
  measurementId: "G-JHCEFBPXS0"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const db = getFirestore(app)

export {storage,db}