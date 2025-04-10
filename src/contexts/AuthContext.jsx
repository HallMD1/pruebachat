import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
        setRole(snap.exists() ? snap.data().role : "guest");
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, role, login, logout };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
