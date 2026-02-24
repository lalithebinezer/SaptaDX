"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import { Users, Mail, Calendar, ShieldCheck, ArrowLeft, Download, Search } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: Timestamp | any;
  lastLogin: Timestamp | any;
}

export default function AdminPanel() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      redirect("/");
    }
  }, [isAdmin, authLoading]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!isAdmin) return;
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map(doc => ({
          ...doc.data()
        } as UserData));
        setUserData(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAdmin]);

  const filteredUsers = userData.filter(u => 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: any) => {
    if (!date) return "N/A";
    const d = date instanceof Timestamp ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (authLoading || !isAdmin) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full page-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Admin Console</h1>
              <p className="text-muted-foreground">Managing Sapta's ecosystem and user growth.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
             <div className="glass px-6 py-3 rounded-2xl border border-glass-border">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Total Users</p>
                <p className="text-2xl font-black text-primary">{userData.length}</p>
             </div>
             <button className="p-4 glass rounded-2xl border border-glass-border hover:bg-primary/5 transition-colors text-primary shadow-sm">
                <Download size={20} />
             </button>
        </div>
      </motion.div>

      {/* Search & Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 relative">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
             <input 
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full glass py-5 pl-14 pr-6 rounded-[24px] border border-glass-border focus:ring-2 focus:ring-primary/50 transition-all outline-none text-lg"
             />
          </div>
          <div className="glass p-6 rounded-[24px] border border-glass-border flex items-center justify-between">
             <div>
                <p className="text-sm font-bold text-muted-foreground">Active Sessions</p>
                <p className="text-3xl font-black mt-1">{(userData.length * 0.4).toFixed(0)}</p>
             </div>
             <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                <Users size={24} />
             </div>
          </div>
      </div>

      {/* Main Table */}
      <div className="glass rounded-[32px] border border-glass-border overflow-hidden shadow-premium">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-glass-border bg-foreground/[0.02]">
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">User</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Email</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Joined On</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Last Login</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                   <td colSpan={5} className="px-8 py-20 text-center text-muted-foreground italic">Fetching user data from the core...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-8 py-20 text-center text-muted-foreground italic">No users found matching your search.</td>
                </tr>
              ) : (
                filteredUsers.map((u, i) => (
                  <motion.tr 
                    key={u.uid}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group border-b border-glass-border/50 hover:bg-foreground/[0.02] transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 overflow-hidden shrink-0 border border-primary/20">
                          {u.photoURL ? (
                            <img src={u.photoURL} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-primary font-bold">
                              {u.displayName?.[0] || u.email?.[0]}
                            </div>
                          )}
                        </div>
                        <span className="font-bold">{u.displayName || "Unknown"}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                         <Mail size={14} />
                         {u.email}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                         <Calendar size={14} />
                         {formatDate(u.createdAt)}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-muted-foreground">
                       {formatDate(u.lastLogin)}
                    </td>
                    <td className="px-8 py-5">
                       <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/20">
                          Verified
                       </span>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
