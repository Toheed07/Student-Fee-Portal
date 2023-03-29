import React, { useContext, useState, useEffect } from "react";
import { auth, fetchStudent } from "../utils/firebase/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    if (!email || !password) return;
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    if (!email || !password) return;
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    //console.log(auth);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        // console.log(userId)
        const getUserData = async () => {
          const userData = await fetchStudent(userId);
          setCurrentUser(userData);
        };
        getUserData();
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      { children}
    </AuthContext.Provider>
  );
}
