"use client";

import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Github, Chrome, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "@/lib/firebase";

import Dashboard from "@/components/Dashboard";

export default function Collaborate() {
  const { signInWithGoogle, user, loading: authLoading, logout, sendVerification } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  if (authLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-foreground opacity-20" />
      </div>
    );
  }


  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          setError("Verification pending: Please confirm your identity via the link sent to your inbox.");
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await sendVerification();
        setVerificationSent(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user && !user.emailVerified) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden page-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass p-10 rounded-[40px] shadow-premium text-center relative z-10 border border-glass-border"
        >
          <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Verify Identity</h1>
          
          {verificationSent && (
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 p-3 rounded-xl text-xs mb-6 text-center justify-center">
              <CheckCircle size={14} /> Verification link dispatched!
            </div>
          )}

          <p className="text-muted-foreground mb-8">
            Your Collaboration ID <span className="text-foreground font-bold">{user.email}</span> is pending verification. 
            Access is restricted until your email is confirmed.
          </p>
          <div className="space-y-4">
            <button 
              onClick={async () => {
                await sendVerification();
                setVerificationSent(true);
              }}
              className="w-full premium-gradient text-background font-bold py-4 rounded-2xl shadow-premium hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Resend Verification Link
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="w-full glass py-4 rounded-2xl font-bold border border-primary/20 hover:bg-primary/10 transition-colors text-primary"
            >
              Refresh Verification Status
            </button>
            <button 
              onClick={logout}
              className="w-full glass py-4 rounded-2xl font-bold border border-glass-border hover:bg-glass-border transition-colors text-muted-foreground"
            >
              Use Different Account
            </button>

          </div>
        </motion.div>
      </div>
    );
  }

  if (user && user.emailVerified) {
    return <Dashboard />;
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden page-container">

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[100px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[100px] -ml-64 -mb-64" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass p-10 rounded-[40px] shadow-premium relative z-10 border border-glass-border"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">{isLogin ? "Welcome Back" : "Join the Pulse"}</h1>
          <p className="text-muted-foreground">{isLogin ? "Ready to collaborate?" : "Start your digital journey with us."}</p>
        </div>

        {error && <p className="bg-red-500/10 text-red-500 p-3 rounded-xl text-sm mb-6 text-center">{error}</p>}

        <form className="space-y-6" onSubmit={handleAuth}>
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Full Name</label>
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-background/50 border border-glass-border rounded-2xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">Collaboration ID</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" 
                placeholder="Enter your email"
                className="w-full bg-background/50 border border-glass-border rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
               <label className="text-sm font-medium">Collaboration Code</label>
               {isLogin && <button type="button" className="text-xs text-primary hover:underline">Forgot code?</button>}
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                placeholder="••••••••"
                className="w-full bg-background/50 border border-glass-border rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full premium-gradient text-background font-bold py-4 rounded-2xl shadow-premium hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin text-background" /> : (isLogin ? "Collaborate" : "Sign Up")}
          </button>
        </form>

        <div className="mt-10">
          <div className="relative flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-glass-border"></div>
            <span className="text-sm text-muted-foreground">Or continue with</span>
            <div className="h-[1px] flex-1 bg-glass-border"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button className="flex items-center justify-center gap-3 py-3 rounded-2xl glass border border-glass-border hover:bg-glass-border transition-colors">
                <Github size={20} /> <span className="text-sm font-medium">GitHub</span>
             </button>
             <button 
                onClick={signInWithGoogle}
                className="flex items-center justify-center gap-3 py-3 rounded-2xl glass border border-glass-border hover:bg-glass-border transition-colors"
              >
                <Chrome size={20} /> <span className="text-sm font-medium">Google</span>
             </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          {isLogin ? "Yet to join Collaboration Group?" : "Already have an account?"}{" "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-bold hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
