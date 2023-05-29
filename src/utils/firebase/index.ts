import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword, FacebookAuthProvider } from "firebase/auth";
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
googleProvider.setCustomParameters({
  prompt: "select_account",
});

const facebookProvider = new FacebookAuthProvider();

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const signInWithFacebookPopup = () => signInWithPopup(auth, facebookProvider);

export const db = getFirestore(app);

export const createUserDocFromAuth = async (userAuth: any, aditionalInfo = {}) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userData = await getDoc(userDocRef);

  if (!userData.exists()) {
    const { email, displayName } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        name: displayName,
        email,
        createdAt,
        ...aditionalInfo
      })
    }
    catch (error: any) {
      throw new Error(error.message)
    }
  }

  return userDocRef;
}

export const createAuthenticatedUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(auth, email, password);
}
export const signInAuthenticatedUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
}

