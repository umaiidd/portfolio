"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    id:"hazedesk",
    num:"03",
    name:"HazeDesk",
    tagline:"AI Customer Support Chatbot (SaaS)",
    period:"Feb 2026 — Mar 2026",
    color:"#AF52DE",
    gradient:"from-purple-500/10 via-fuchsia-500/5 to-transparent",
    tech:["Next.js","MongoDB","Scalekit","Groq API","Vercel","Multi-Tenant Architecture"],
    github:"https://github.com/umaiidd/HazeDesk",
    live:"https://haze-desk.vercel.app/",
    highlights:[
      "Built a multi-tenant SaaS AI chatbot with embeddable script widget for websites",
      "Implemented organization-based authentication and workspace isolation using Scalekit",
      "Integrated Groq API for ultra-low latency LLM responses with contextual conversations",
      "Designed scalable MongoDB schemas for chats, tenants, and configurations",
      "Developed plug-and-play script integration for external websites",
      "Supports secure multi-tenant data isolation between organizations",
      "Deployed production-ready Next.js application on Vercel",
    ],
  },
  {
    id:"syncly",
    num:"01",
    name:"Syncly",
    tagline:"Real-Time Chat Application",
    period:"Dec 2025 — Feb 2026",
    color:"#0071E3",
    gradient:"from-blue-500/10 via-indigo-500/5 to-transparent",
    tech:["MERN Stack","Socket.io","RabbitMQ","Redis","Docker","AWS EC2"],
    github:"https://github.com/umaiidd/Syncly-ChatFrontend",
    live:"https://syncly-chat.vercel.app/", 
    highlights:[
      "Microservices architecture with RabbitMQ for async service communication",
      "Deployed on AWS EC2 with production-grade reverse proxy routing",
      "Bi-directional real-time messaging via Socket.io with room-based architecture",
      "Redis in-memory caching for sessions, reducing MongoDB query load",
      "OTP email auth with Resend and token expiry logic",
      "Fully responsive React frontend with real-time UI updates on every event",
    ],
  },
  {
    id:"bookmydoc",
    num:"02",
    name:"BookMyDoc",
    tagline:"Doctor Appointment Booking System",
    period:"Oct 2025 — Dec 2025",
    color:"#34C759",
    gradient:"from-green-500/10 via-emerald-500/5 to-transparent",
    tech:["React.js","Node.js","Express.js","MongoDB","Cloudinary","JWT","Razorpay"],
    github:"https://github.com/umaiidd/BookMyDoc",
    live:"https://book-my-doc-liart.vercel.app/",
    highlights:[
      "3-level role-based authentication (Patient, Doctor, Admin) using JWT",
      "Role-specific dashboards with distinct features and access control",
      "Razorpay integration for secure appointment fee payment verification",
      "Cloudinary for doctor profiles with optimized cloud media storage",
      "MongoDB schemas with proper indexing across collections",
      "Middleware-based route protection across all API endpoints",
    ],
  },
];

export default function Projects() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref,{once:true,margin:"-10%"});

  return (
    <section id="projects" ref={ref} className="py-28 md:py-40 bg-[#F5F5F7] overflow-hidden">
      <div className="wrap max-w-[980px] mx-auto">
        <motion.p initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}} className="lbl mb-4">
          Projects
        </motion.p>

        <motion.h2
          initial={{opacity:0,y:28}}
          animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.85,ease:[.16,1,.3,1],delay:.06}}
          style={{fontSize:"clamp(2.2rem,5vw,3.8rem)",fontWeight:700,letterSpacing:"-.03em",lineHeight:1.08}}
          className="mb-14"
        >
          Built with<br/><span className="g-blue">Purpose</span>
        </motion.h2>

        <div className="flex flex-col gap-5">
          {projects.map((p,i)=>(
            <ProjectCard key={p.id} project={p} index={i} inView={inView}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({project:p,index:i,inView}:{project:typeof projects[0];index:number;inView:boolean}){
  const [open,setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({target:ref,offset:["start end","end start"]});
  const y = useTransform(scrollYProgress,[0,1],["3%","-3%"]);

  return (
    <motion.div
      ref={ref}
      initial={{opacity:0,y:40}}
      animate={inView?{opacity:1,y:0}:{}}
      transition={{duration:.85,delay:i*.15,ease:[.16,1,.3,1]}}
      className="a-card bg-white overflow-hidden"
    >
      <div className="h-1 w-full" style={{background:`linear-gradient(90deg,${p.color},${p.color}88)`}}/>

      <motion.div style={{y}} className={`absolute inset-0 bg-gradient-to-br ${p.gradient} pointer-events-none rounded-[20px]`}/>

      <div className="relative p-7 md:p-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-6">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase rounded-full px-3 py-1.5 mb-4"
              style={{background:p.color+"18",color:p.color}}
            >
              {p.tagline}
            </span>

            <h3 className="text-dark mb-3" style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,letterSpacing:"-.04em",lineHeight:1}}>
              {p.name}
            </h3>

            <p className="text-[1rem] font-light text-[#6E6E73] max-w-xl leading-relaxed">
              {
                p.id==="syncly"
                  ? "A distributed real-time chat platform built on microservices. Every component communicates asynchronously via RabbitMQ, deployed on AWS EC2."
                  : p.id==="hazedesk"
                  ? "A multi-tenant AI customer support SaaS with an embeddable chatbot widget, enabling businesses to automate conversations using low-latency LLMs."
                  : "A full-stack healthcare booking platform with 3-level role-based access, Razorpay payments, and Cloudinary media — all deployed and running."
              }
            </p>
          </div>

          <span className="text-[12px] font-medium text-gray bg-[#F5F5F7] rounded-full px-3 py-1.5 whitespace-nowrap">
            {p.period}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
          {p.tech.map(t=>(
            <motion.span
              key={t}
              whileHover={{scale:1.07,y:-2}}
              className="chip text-[11px]"
              style={{color:p.color,background:p.color+"15"}}
            >
              {t}
            </motion.span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            whileHover={{scale:1.03}}
            whileTap={{scale:.97}}
            onClick={()=>setOpen(!open)}
            className="btn-solid text-[13px] py-2.5 px-6"
            style={{background:p.color}}
          >
            {open?"Less ↑":"Details ↓"}
          </motion.button>

          {p.github && (
            <motion.a
              whileHover={{scale:1.03}}
              whileTap={{scale:.97}}
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-[13px] py-2.5 px-6"
            >
              GitHub ↗
            </motion.a>
          )}

          {p.live && (
            <motion.a
              whileHover={{scale:1.03}}
              whileTap={{scale:.97}}
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid text-[13px] py-2.5 px-6"
              style={{background:p.color+"CC"}}
            >
              Live Demo ↗
            </motion.a>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{opacity:0,height:0}}
            animate={{opacity:1,height:"auto"}}
            exit={{opacity:0,height:0}}
            transition={{duration:.45,ease:[.16,1,.3,1]}}
            className="overflow-hidden"
          >
            <div className="border-t border-[#D2D2D7] px-7 md:px-10 py-8">
              <p className="lbl mb-6">What I built</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                {p.highlights.map((h,hi)=>(
                  <motion.div
                    key={hi}
                    initial={{opacity:0,x:-14}}
                    animate={{opacity:1,x:0}}
                    transition={{delay:hi*.06}}
                    className="flex gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{background:p.color}}/>
                    <p className="text-[14px] font-light text-[#6E6E73] leading-relaxed">{h}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}