"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";

const team = [
  {
    name: "Arunkumar Shambu",
    role: "Founder, SaptaDX",
    bio: "Starting career in design using CAD, moved into BIM adoption during its early adoption in India. Over the years, he had led digital strategies for large-scale projects including airports, IT campuses, metro stations and other international facilities. His journey evolved from delivering projects hands-on to shaping processes, mentoring teams and advocating for industry-wide digital transformation.",
    quote: "Be the change you wish to see in the world",
  },
  {
    name: "Nagarjuna Karupakala",
    role: "Co-Founder, SaptaDX",
    bio: "Starting career in design using CAD, moved into BIM adoption during its early adoption in India. Over the years, he had led digital strategies for large-scale projects including airports, IT campuses, metro stations and other international facilities. His journey evolved from delivering projects hands-on to shaping processes, mentoring teams and advocating for industry-wide digital transformation.",
    quote: "Innovation distinguishes between a leader and a follower",
  }
];

export default function Teamwork() {
  return (
    <div className="flex-1 max-w-6xl mx-auto px-6 py-12 md:py-20 page-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 md:mb-24 mt-12 md:mt-0"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Our Leadership</h1>
        <p className="text-lg md:text-xl text-muted-foreground">The visionaries behind Sapta's digital excellence.</p>
      </motion.div>

      <div className="space-y-20 md:space-y-32 mb-20">
        {team.map((member, i) => (
          <motion.div 
            key={member.name}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
          >
            <div className="w-full lg:w-1/3">
              <div className="aspect-[4/5] glass rounded-[32px] md:rounded-[40px] relative overflow-hidden group border border-glass-border">
                 <div className="absolute inset-0 premium-gradient opacity-10 group-hover:opacity-20 transition-opacity" />
                 <div className="absolute inset-0 flex items-center justify-center text-primary/20 font-bold text-4xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                 </div>
                 <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-4 opacity-0 group-hover:opacity-100 lg:opacity-100 transition-opacity">
                    <button className="p-3 glass rounded-xl hover:bg-primary hover:text-white transition-all"><Linkedin size={20} /></button>
                    <button className="p-3 glass rounded-xl hover:bg-primary hover:text-white transition-all"><Twitter size={20} /></button>
                    <button className="p-3 glass rounded-xl hover:bg-primary hover:text-white transition-all"><Mail size={20} /></button>
                 </div>
              </div>
            </div>

            <div className="w-full lg:w-2/3 space-y-6 text-center lg:text-left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-1">{member.name}</h2>
                <p className="text-primary font-semibold text-base md:text-lg">{member.role}</p>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {member.bio}
              </p>

              <div className="p-8 glass border-l-4 border-primary rounded-r-2xl italic text-xl shadow-sm">
                "{member.quote}"
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

