import { User, onAuthStateChanged } from "firebase/auth";
import React, { SetStateAction, useEffect } from "react";
import { createContext, useState } from "react";
import {
  auth,
  createUserDocFromAuth,
  onAuthStateChangedListener,
} from "utils/firebase";

type UserProviderProps = {
  children: React.ReactNode;
};
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: (user: any) => null,
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const value: any = { currentUser, setCurrentUser };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      console.log('dddddddddddddddddddddddddddddddddddddddddddd user=',user)
      if (user) {
        createUserDocFromAuth(user);
      }
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
