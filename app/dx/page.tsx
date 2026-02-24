"use client";

import { motion } from "framer-motion";
import { Send, User, Bot, Sparkles } from "lucide-react";
import { useState } from "react";

interface Message {
  role: 'bot' | 'user';
  text: string;
  delay?: number;
}

const INITIAL_MESSAGES: Message[] = [
  { role: 'bot', text: 'Welcome Innovator!', delay: 0.5 },
  { role: 'bot', text: 'Lets explore together your innovative thoughts.', delay: 1.2 },
  { role: 'bot', text: 'Tell us about your ideas.', delay: 2 },
];

const SUGGESTIONS = [
  "I am an Architect with passion in graphic arts",
  "Planning a startup",
  "Looking for digital transformation",
  "Just exploring"
];

export default function DXPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const simulateBotResponse = (userText: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "That sounds like a bold vision! How do you see SaptaDX helping you scale?",
        "Interesting approach. Our engineers are constantly innovating in that space.",
        "Infrastructure and digital-first mindset – that's the perfect combo.",
        "Tell me more. I'm curious about the specific construction challenges you're facing."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'bot', text: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 md:px-6 py-8 page-container relative overflow-hidden">

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 premium-gradient rounded-2xl text-background">
          <Sparkles size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">DX Assistant</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Always ready to innovate
          </p>
        </div>
      </div>

      <div className="flex-1 glass rounded-3xl md:rounded-[32px] overflow-hidden flex flex-col shadow-premium border border-glass-border">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 no-scrollbar">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === 'bot' ? -20 : 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: msg.delay || 0.1 }}
              className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'} items-start gap-4`}
            >
              {msg.role === 'bot' && (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot size={20} className="text-primary" />
                </div>
              )}
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'bot' 
                ? 'bg-foreground/5 text-foreground rounded-tl-none' 
                : 'premium-gradient text-background rounded-tr-none shadow-md'
              }`}>
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <User size={20} className="text-accent" />
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Bot size={20} className="text-primary animate-pulse" />
              </div>
              <div className="bg-foreground/5 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Suggestions */}
        <div className="px-6 md:px-8 pb-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((suggestion, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setMessages([...messages, { role: 'user', text: suggestion }]);
                simulateBotResponse(suggestion);
              }}
              className="text-xs md:text-sm px-4 py-2 rounded-full glass border border-glass-border hover:border-primary transition-colors text-muted-foreground hover:text-primary"
            >
              {suggestion}
            </motion.button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 border-t border-glass-border glass">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (!input || isTyping) return;
              const userText = input;
              setMessages([...messages, { role: 'user', text: userText }]);
              setInput("");
              simulateBotResponse(userText);
            }}
            className="relative"
          >
            <input 
              type="text"
              placeholder="Type your innovative thoughts..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-background/50 border border-glass-border rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <button 
              type="submit"
              disabled={!input || isTyping}
              className="absolute right-2 top-2 bottom-2 px-4 premium-gradient text-background rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
