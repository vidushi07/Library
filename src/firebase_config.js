import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDOLtEPIIfMTspUtlZ2Ed7Yh7kA89RuJy4",
  authDomain: "library-management-syste-9b71c.firebaseapp.com",
  projectId: "library-management-syste-9b71c",
  storageBucket: "library-management-syste-9b71c.appspot.com",
  messagingSenderId: "994955447063",
  appId: "1:994955447063:web:d02a260d7039422e784552"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = app.firestore();
const auth = firebase.auth()

const providerGoogle = new firebase.auth.GoogleAuthProvider()
const providerGitHub = new firebase.auth.GithubAuthProvider();
const providerFacebook = new firebase.auth.FacebookAuthProvider();

export { auth, database, providerGoogle, providerGitHub, providerFacebook }
