// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore ,} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGdgYkFysb2ysAKwTlTQVRWPR3mCgxtc4",
  authDomain: "gtbloan.firebaseapp.com",
  projectId: "gtbloan",
  storageBucket: "gtbloan.appspot.com",
  messagingSenderId: "82725703751",
  appId: "1:82725703751:web:edb12d4ce4427c58d96162",
  measurementId: "G-72H5MSW7HM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);