import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User,
  UserInfo,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

const facebookProvider = new FacebookAuthProvider();

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const signInWithFacebookPopup = () =>
  signInWithPopup(auth, facebookProvider);

export const db = getFirestore(app);

export const getUserDocFromAuth = async (
  userAuth: any,
  // aditionalInfo = {}
): Promise<any | null> => {
  if (userAuth) {
    const userDocRef = doc(db, "users", userAuth.uid);
    const userData = await getDoc(userDocRef);
    return (userData as any)?._document?.data?.value?.mapValue
      ?.fields as UserInfo;
  } else return null;
};

export const createUserDocFromAuth = async (
  userAuth: any,
  aditionalInfo = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userData = await getDoc(userDocRef);

  if (!userData.exists()) {
    const { email, displayName } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        name: displayName,
        email,
        createdAt,
        ...aditionalInfo,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  return userDocRef;
};

export const createAuthenticatedUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthenticatedUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);
