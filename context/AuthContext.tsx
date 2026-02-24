"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  User, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  sendEmailVerification
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  sendVerification: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Ensure user document exists in Firestore
          const userRef = doc(db, "users", user.uid);
          
          // Use getDoc with no options (defaults to cache then server)
          // If we fail here, we still want the user to be logged in
          const userSnap = await getDoc(userRef).catch(() => null);

          if (userSnap && !userSnap.exists()) {
            await setDoc(userRef, {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified,
              providerId: user.providerData[0]?.providerId || "unknown",
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp(),
              metadata: {
                creationTime: user.metadata.creationTime,
                lastSignInTime: user.metadata.lastSignInTime,
              },
              role: user.email === "lalithebinezer26@gmail.com" ? "admin" : "collaborator"
            }, { merge: true }).catch(e => console.warn("Could not create user doc (offline):", e));
          } else if (userSnap) {
            await setDoc(userRef, { 
              lastLogin: serverTimestamp(),
              emailVerified: user.emailVerified,
              metadata: {
                lastSignInTime: user.metadata.lastSignInTime,
              }
            }, { merge: true })
              .catch(e => console.warn("Could not update user metadata (offline):", e));
          }
        } catch (dbError) {
          console.warn("User data sync skipped (offline or error):", dbError);
        }
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);

    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const sendVerification = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  const isAdmin = user?.email === "lalithebinezer26@gmail.com";

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signInWithGoogle, logout, sendVerification }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
