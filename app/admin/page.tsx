"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Mail, Calendar, ShieldCheck, ArrowLeft, Download, 
  Search, RefreshCw, Chrome, Clock, FileJson, X 
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  providerId: string;
  createdAt: Timestamp | any;
  lastLogin: Timestamp | any;
  role: string;
  metadata?: {
    creationTime?: string;
    lastSignInTime?: string;
  };
  [key: string]: any; // Catch-all for any other data
}

export default function AdminPanel() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      redirect("/");
    }
  }, [isAdmin, authLoading]);

  const fetchUsers = async () => {
    if (!isAdmin) return;
    setLoading(true);
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, orderBy("lastLogin", "desc"));
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

  useEffect(() => {
    fetchUsers();
  }, [isAdmin]);

  const downloadCSV = () => {
    const headers = ["UID", "Name", "Email", "Provider", "Verified", "Role", "Joined", "Last Login"];
    const rows = userData.map(u => [
      u.uid,
      `"${u.displayName || "N/A"}"`,
      u.email,
      u.providerId || "unknown",
      u.emailVerified ? "YES" : "NO",
      u.role || "collaborator",
      formatDateCSV(u.createdAt),
      formatDateCSV(u.lastLogin)
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `saptas_users_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredUsers = userData.filter(u => 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.uid?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: any) => {
    if (!date) return "N/A";
    const d = date instanceof Timestamp ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatDateCSV = (date: any) => {
    if (!date) return "N/A";
    const d = date instanceof Timestamp ? date.toDate() : new Date(date);
    return d.toISOString();
  };

  if (authLoading || !isAdmin) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
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
              <p className="text-muted-foreground">Real-time intelligence from the Sapta ecosystem.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
             <div className="glass px-6 py-3 rounded-2xl border border-glass-border">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Total Users</p>
                <div className="flex items-center gap-2">
                   <p className="text-2xl font-black text-primary">{userData.length}</p>
                   {loading && <div className="w-2 h-2 bg-primary rounded-full animate-ping" />}
                </div>
             </div>
             <button 
               onClick={downloadCSV}
               title="Download CSV"
               className="p-4 glass rounded-2xl border border-glass-border hover:bg-primary/5 transition-colors text-primary shadow-sm"
             >
                <Download size={20} />
             </button>
             <button 
               onClick={fetchUsers}
               title="Refresh Data"
               className="p-4 glass rounded-2xl border border-glass-border hover:bg-primary/5 transition-colors text-foreground/60 shadow-sm"
             >
                <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
             </button>
        </div>
      </motion.div>

      {/* Search & Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-2 relative">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
             <input 
                type="text"
                placeholder="Search users, email, or UID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full glass py-5 pl-14 pr-6 rounded-[24px] border border-glass-border focus:ring-2 focus:ring-primary/50 transition-all outline-none text-lg"
             />
          </div>
          <div className="glass p-6 rounded-[24px] border border-glass-border flex items-center justify-between">
             <div>
                <p className="text-sm font-bold text-muted-foreground">Google Users</p>
                <p className="text-3xl font-black mt-1">
                   {userData.filter(u => u.providerId === "google.com").length}
                </p>
             </div>
             <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Chrome size={24} />
             </div>
          </div>
          <div className="glass p-6 rounded-[24px] border border-glass-border flex items-center justify-between">
             <div>
                <p className="text-sm font-bold text-muted-foreground">Email Users</p>
                <p className="text-3xl font-black mt-1">
                    {userData.filter(u => u.providerId === "password").length}
                </p>
             </div>
             <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Mail size={24} />
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
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Auth Info</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Lifecycle</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Verified</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && userData.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-8 py-20 text-center text-muted-foreground italic">Fetching the core database...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-8 py-20 text-center text-muted-foreground italic">The search returned zero nodes.</td>
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
                        <div className="w-12 h-12 rounded-full md:rounded-2xl bg-primary/10 overflow-hidden shrink-0 border border-primary/20 shadow-sm group-hover:scale-110 transition-transform">
                          {u.photoURL ? (
                            <img src={u.photoURL} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-primary font-black text-xl">
                              {u.displayName?.[0] || u.email?.[0]}
                            </div>
                          )}
                        </div>
                        <div>
                           <p className="font-bold text-base">{u.displayName || "Anonymous Node"}</p>
                           <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-tighter">{u.uid}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col gap-1">
                         <div className="flex items-center gap-2 text-sm text-foreground/80">
                            <Mail size={14} className="text-muted-foreground" />
                            {u.email}
                         </div>
                         <div className="flex items-center gap-2">
                             <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${u.providerId === 'google.com' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 'bg-foreground/5 text-foreground/60 border border-foreground/10'}`}>
                                {u.providerId === 'google.com' ? 'Google' : u.providerId === 'password' ? 'Email/Pass' : u.providerId}
                             </span>
                             <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase bg-primary/5 text-primary/70 border border-primary/10">
                                {u.role || 'collaborator'}
                             </span>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col gap-1 text-xs">
                         <div className="flex items-center gap-2 text-muted-foreground" title="Created At">
                            <Calendar size={12} />
                            Joined: {formatDate(u.createdAt)}
                         </div>
                         <div className="flex items-center gap-2 text-foreground/70 font-medium" title="Last Seen">
                            <Clock size={12} />
                            Last: {formatDate(u.lastLogin)}
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${u.emailVerified ? 'bg-green-500' : 'bg-amber-500'} shadow-[0_0_8px_currentColor]`} />
                          <span className={`text-[10px] font-bold uppercase ${u.emailVerified ? 'text-green-500' : 'text-amber-500'}`}>
                             {u.emailVerified ? 'Verified' : 'Pending'}
                          </span>
                       </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                       <button 
                         onClick={() => setSelectedUser(u)}
                         className="p-2.5 rounded-xl border border-glass-border hover:bg-foreground/5 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <FileJson size={18} className="text-muted-foreground" />
                       </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raw Data Modal */}
      <AnimatePresence>
         {selectedUser && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass w-full max-w-2xl max-h-[80vh] rounded-[32px] border border-glass-border shadow-2xl flex flex-col overflow-hidden"
              >
                 <div className="p-6 border-b border-glass-border flex items-center justify-between bg-foreground/[0.02]">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <FileJson size={20} />
                       </div>
                       <h2 className="text-xl font-bold">Node Identity Analysis</h2>
                    </div>
                    <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-foreground/5 rounded-full">
                       <X size={24} />
                    </button>
                 </div>
                 <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                    <pre className="text-xs font-mono p-6 bg-black/20 rounded-2xl border border-glass-border text-foreground/80 whitespace-pre-wrap leading-relaxed">
                       {JSON.stringify(selectedUser, null, 2)}
                    </pre>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-foreground/5 border border-glass-border">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Creation Date</p>
                           <p className="text-sm">{selectedUser.metadata?.creationTime || 'N/A'}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-foreground/5 border border-glass-border">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Last Sign In</p>
                           <p className="text-sm">{selectedUser.metadata?.lastSignInTime || 'N/A'}</p>
                        </div>
                    </div>
                 </div>
                 <div className="p-6 border-t border-glass-border flex justify-end">
                    <button 
                      onClick={() => setSelectedUser(null)}
                      className="px-8 py-3 premium-gradient text-background rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                    >
                       Acknowledge
                    </button>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
}
