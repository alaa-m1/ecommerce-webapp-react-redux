import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5NpEnX4xF1toHctG3qtzdvSIu8Pbn_So",
  authDomain: "ecommerceproject-abb33.firebaseapp.com",
  projectId: "ecommerceproject-abb33",
  storageBucket: "ecommerceproject-abb33.appspot.com",
  messagingSenderId: "607618773174",
  appId: "1:607618773174:web:202e0756957f99b826b617",
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
// googleProvider.setCustomParameters({
//   prompt: "select_account",
// });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore(app);

export const createUserDocFromAuth = async (userAuth: any) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userData = await getDoc(userDocRef);
  console.log('userData=', userData);

  if (!userData.exists()) {
    const { email, displayName } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    }
    catch (error: any) {
      throw new Error(error.message)
    }
  }

  return userDocRef;
}

export const createAuthenticatedUserWithEmailAndPassword = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
}