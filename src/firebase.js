import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYJKKadxKkl3pFDzNjCIY5vsfoOCDC4BM",
  authDomain: "pomeranian-97986.firebaseapp.com",
  projectId: "pomeranian-97986",
  storageBucket: "pomeranian-97986.appspot.com",
  messagingSenderId: "188908952293",
  appId: "1:188908952293:web:3f2110489aff919934d20c",
  measurementId: "G-Y5BW31ZJQG",
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
firebase.analytics();
