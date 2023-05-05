// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged,
 } from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,

} from "firebase/firestore";
    

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAxBtdeWRlfH8_K5RTIv6GNtKW_ixRoMQ",
  authDomain: "tunit-8b53c.firebaseapp.com",
  projectId: "tunit-8b53c",
  storageBucket: "tunit-8b53c.appspot.com",
  messagingSenderId: "368395993805",
  appId: "1:368395993805:web:df79dfdc9c18359e6b9f84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Google Sign In
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    return res;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Email Sign In
const logInWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

// Email Sign Up
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

// Reset password
const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  
// Sign Out
const logout = () => {
    signOut(auth);
  };
  
async function updateUserAndAddToCollection(user, accessToken, refreshToken) {
  // Check if the input values are valid
  if (!user || !user.uid || !accessToken || !refreshToken) {
    console.log('Invalid input values.');
    return;
  }
  // Firestore references
  // const userDocRef = doc(db, `users/${documentId}`);

  const usersCollection = collection(db, 'users');
  const q = query(usersCollection, where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Get the document ID of the first document in the query result
    const userDocId = querySnapshot.docs[0].id;

    // Get a reference to the user document
    const userDocRef = doc(db, `users/${userDocId}`);

    // Update user data
    await setDoc(userDocRef, {
      accessToken: accessToken,
      refreshToken: refreshToken
    }, { merge: true });
  } else {
    console.log('UUAATC: User not found.');
  }
}

// This function refreshes the access token using the user's stored refresh token
async function refreshAccessTokenAndSave(user, refreshToken) {
  const clientId = "db991fb76b5e4a74a8dbdaa111fc0520";
  const url = "https://accounts.spotify.com/api/token";
  const params = new URLSearchParams();

  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);
  params.append("client_id", clientId);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (response.ok) {
    const data = await response.json();
    const newAccessToken = data.access_token;

    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    // Check if a user document is found
    if (!querySnapshot.empty) {
      // Get the document ID of the first document in the query result
      const userDocId = querySnapshot.docs[0].id;

      // Get a reference to the user document
      const userDocRef = doc(db, `users/${userDocId}`);

      // Update user data with the new access token
      await setDoc(userDocRef, {
        accessToken: newAccessToken
      }, { merge: true });

      console.log('Access token updated in the Firestore.');
    } else {
      console.log('User not found.');
    }
  } else {
    throw new Error("Failed to refresh access token");
  }
}


  
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  onAuthStateChanged,
  updateUserAndAddToCollection,
  refreshAccessTokenAndSave,
};
  
