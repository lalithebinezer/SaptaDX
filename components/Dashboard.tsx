"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Settings, Wallet, Moon, Sparkles, HelpCircle, LogOut, 
  BookOpen, Lightbulb, PenTool, Presentation, Calculator, Target,
  FileText, Play, Music, Image as ImageIcon, Briefcase, Globe,
  X, Save, ChevronRight, ChevronLeft
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

type SubView = "dashboard" | "profile" | "planner";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [subView, setSubView] = useState<SubView>("dashboard");

  const resourceTiles = [
    { name: "Document Library", icon: <FileText />, color: "bg-foreground/5", iconColor: "text-foreground/60" },
    { name: "Learning Resources", icon: <BookOpen />, color: "bg-foreground/5", iconColor: "text-foreground/60" },
    { name: "Practice Materials", icon: <PenTool />, color: "bg-foreground/5", iconColor: "text-foreground/60" },
    { name: "Presentation Content", icon: <Presentation />, color: "bg-foreground/5", iconColor: "text-foreground/60" },
    { name: "Calculators & More", icon: <Calculator />, color: "bg-foreground/5", iconColor: "text-foreground/60" },
    { name: "Career Planner", icon: <Target />, color: "bg-foreground/5", iconColor: "text-foreground/60" },
    { name: "Resource 1", icon: <Lightbulb />, color: "bg-foreground/5", iconColor: "text-foreground/40" },
    { name: "Resource 2", icon: <Play />, color: "bg-foreground/5", iconColor: "text-foreground/40" },
    { name: "Resource 3", icon: <ImageIcon />, color: "bg-foreground/5", iconColor: "text-foreground/40" },
    { name: "Resource 4", icon: <Music />, color: "bg-foreground/5", iconColor: "text-foreground/40" },
    { name: "Resource 5", icon: <Briefcase />, color: "bg-foreground/5", iconColor: "text-foreground/40" },
    { name: "Resource 6", icon: <Globe />, color: "bg-foreground/5", iconColor: "text-foreground/40" },
  ];


  return (
    <div className="flex-1 flex w-full max-w-7xl mx-auto px-6 py-4 gap-6 h-full overflow-hidden">
      {/* Sidebar Navigation */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 shrink-0 flex flex-col gap-4"
      >
        {/* User Card */}
        <div className="glass p-5 rounded-[24px] text-center border border-glass-border">
          <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/20">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={32} className="text-primary" />
            )}
          </div>
          <h2 className="text-lg font-bold line-clamp-1">{user?.displayName || "Full Name"}</h2>
          <p className="text-[10px] text-muted-foreground italic">Professional title</p>
        </div>

        {/* Nav Items */}
        <div className="glass p-1 rounded-[24px] border border-glass-border overflow-hidden">
          <NavItem icon={<User size={16} />} label="Edit profile" active={subView === "profile"} onClick={() => setSubView("profile")} />
          <NavItem icon={<Settings size={16} />} label="Preferences" />
          <NavItem icon={<Wallet size={16} />} label="Wallet" badge="₹" />
          
          <NavItem icon={<Sparkles size={16} />} label="SaptaGPT" />
          <NavItem icon={<HelpCircle size={16} />} label="Help center" />
          <NavItem icon={<LogOut size={16} />} label="Sign out" onClick={logout} />
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <AnimatePresence mode="wait">
          {subView === "dashboard" && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pb-8"
            >
              {resourceTiles.map((tile, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (tile.name === "Career Planner") {
                      setSubView("planner");
                    } else {
                      // Generic interaction for other tiles
                      alert(`${tile.name} is coming soon! Our engineers are building this module with excellence.`);
                    }
                  }}
                  className={`aspect-square ${tile.color} rounded-[24px] flex flex-col items-center justify-center p-4 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-all border border-foreground/5 hover:border-foreground/20 group backdrop-blur-sm`}
                >
                  <div className={`mb-3 ${tile.iconColor} group-hover:scale-110 group-hover:text-foreground transition-all duration-300`}>
                    {tile.icon}
                  </div>
                  <span className="text-[11px] font-extrabold text-foreground/60 text-center uppercase tracking-tight leading-tight px-1 group-hover:text-foreground transition-colors">
                    {tile.name}
                  </span>
                </motion.div>
              ))}

            </motion.div>
          )}

          {subView === "profile" && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              className="glass p-8 rounded-[32px] border border-glass-border flex flex-col h-full overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Edit profile</h1>
                <div className="flex gap-2">
                  <button onClick={() => setSubView("dashboard")} className="px-4 py-1.5 text-xs font-medium hover:underline text-muted-foreground">Cancel</button>
                  <button className="px-6 py-1.5 bg-primary text-white rounded-lg text-xs font-bold shadow-premium hover:scale-105 transition-transform">Save profile</button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/4 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-2xl bg-primary/10 mb-3 overflow-hidden relative group">
                    {user?.photoURL ? <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" /> : <User size={32} className="text-primary mt-8 mx-auto" />}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white text-[10px] font-bold">Change</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-[10px] font-bold text-primary border border-primary/20 px-3 py-1.5 rounded-lg bg-primary/5">Choose Image</button>
                    <button className="text-[10px] font-bold text-red-500">Remove</button>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <ProfileField label="Full name" defaultValue={user?.displayName || ""} />
                  <ProfileField label="Email" defaultValue={user?.email || ""} disabled />
                  <ProfileField label="Location" placeholder="Select project" type="select" />
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold ml-1 text-muted-foreground uppercase opacity-70">About me</label>
                    <textarea 
                      className="w-full bg-background/30 border border-glass-border rounded-xl py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary min-h-[60px] text-xs"
                      placeholder="Tell something about yourself"
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/3 grid grid-cols-2 gap-2">
                  {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className="space-y-1 text-left">
                      <label className="text-[10px] font-bold ml-1 text-muted-foreground uppercase opacity-70">Field {i}</label>
                      <input 
                        className="w-full bg-background/30 border border-glass-border rounded-lg py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                        placeholder="Answer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {subView === "planner" && (
            <motion.div 
              key="planner"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass p-8 rounded-[32px] border border-glass-border flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <button onClick={() => setSubView("dashboard")} className="p-1.5 hover:bg-glass-border rounded-full transition-colors"><ChevronLeft size={20} /></button>
                  <h1 className="text-2xl font-bold">Career Planner</h1>
                </div>
                <div className="flex items-center gap-4 scale-90">
                  <div className="text-center">
                    <p className="text-xs font-bold">2026</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <ChevronLeft size={12} className="text-muted-foreground" />
                      <div className="w-6 h-6 rounded-full bg-green-500 shadow-md flex items-center justify-center">
                        <CheckCircle size={12} className="text-white" />
                      </div>
                      <ChevronRight size={12} className="text-muted-foreground" />
                    </div>
                    <p className="text-[9px] font-bold text-primary mt-0.5">Student</p>
                  </div>
                  <div className="h-8 w-[1px] bg-glass-border" />
                  <div>
                    <p className="text-xs font-bold text-red-500">Milestone 2</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">Exploration | Managerial | Brand Image</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center border-2 border-dashed border-glass-border rounded-[24px] text-sm text-muted-foreground italic">
                Development in progress... Planner timeline will appear here.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

}

function NavItem({ icon, label, active = false, onClick, color = "", badge = "" }: { 
  icon: React.ReactNode, 
  label: string, 
  active?: boolean, 
  onClick?: () => void,
  color?: string,
  badge?: string
}) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${active ? 'bg-primary/10 text-primary' : 'hover:bg-glass-border'}`}
    >
      <div className={`flex items-center gap-3 ${color}`}>
        {icon}
        <span>{label}</span>
      </div>
      {badge && <span className="text-xs font-bold text-primary">{badge}</span>}
      {!badge && !active && <ChevronRight size={14} className="text-muted-foreground/30" />}
    </button>
  );
}

function ProfileField({ label, placeholder = "", defaultValue = "", disabled = false, type = "text" }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold ml-1 text-muted-foreground">{label}</label>
      {type === "select" ? (
        <select className="w-full bg-background/50 border border-glass-border rounded-2xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-primary text-sm appearance-none cursor-pointer">
          <option>{placeholder}</option>
        </select>
      ) : (
        <input 
          type={type}
          defaultValue={defaultValue}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full bg-background/50 border border-glass-border rounded-2xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-primary text-sm ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      )}
    </div>
  );
}

function CheckCircle({ size, className }: { size: number, className: string }) {
  return <div className={`rounded-full ${className}`} style={{ width: size, height: size, background: 'currentColor' }} />
}
