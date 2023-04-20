import React, { useContext, useState, useEffect } from "react";
import {
  auth,
  fetchUser,
  fetchAdmin,
  getCurrentUserUid,
  checkUserRole,
} from "../utils/firebase/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userRole, setUserRole] = useState(null);

  function logout() {
    return auth.signOut();
  }

  const updateUser = (user) => {
    setCurrentUser(user);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        console.log(userId);

        const getUserData = async () => {
          const userData = await fetchUser(userId);
          if (!userData) {
            const adminData = await fetchAdmin(userId);
            setCurrentUser(adminData);
            console.log(adminData);
          } else {
            console.log(userData);
            setCurrentUser(userData);
          }
        };
        getUserData();
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
    });
    return unsubscribe;
  }, []);
  
  useEffect(() => {
    if (currentUser) {
      const uid = getCurrentUserUid();
      console.log(uid)
      checkUserRole(uid).then((role) => {
        setUserRole(role);
      });
    }
  }, [currentUser]);
  
  const value = {
    currentUser,
    logout,
    userRole,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
