import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
 
  apiKey: "AIzaSyDtqvEpR4UwUfFQ9ZyKZkW969VLooh_YFY",
  authDomain: "taxi-booking-c4a4f.firebaseapp.com",
  databaseURL: "https://taxi-booking-c4a4f-default-rtdb.firebaseio.com",
  projectId: "taxi-booking-c4a4f",
  storageBucket: "taxi-booking-c4a4f.appspot.com",
  messagingSenderId: "54468711414",
  appId: "1:54468711414:web:400b916e05eb0aa4f26dd7"
  };
  
  console.log(process.env)
  const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app);
export const db = getFirestore(app);