import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // for authentication
import "firebase/compat/storage"; // for storage
import "firebase/compat/database"; // for realtime database
import "firebase/compat/firestore"; // for cloud firestore

const firebaseConfig = {
  apiKey: "AIzaSyD1ruLBLzKnG-0JYLE1HCLD9wBYTjIz_54",
  authDomain: "message-app-a3e87.firebaseapp.com",
  projectId: "message-app-a3e87",
  storageBucket: "message-app-a3e87.appspot.com",
  messagingSenderId: "672142749632",
  appId: "1:672142749632:web:04ab3dce295284e9716225",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
