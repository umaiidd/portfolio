"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";

const stats = [
  { end:3,  suffix:"+", label:"Years Coding"         },
  { end:5,  suffix:"+", label:"Projects Shipped"      },
  { end:10, suffix:"+", label:"Technologies Mastered" },
  { end:1,  suffix:"+",  label:"Cloud Deployments"     },
];

const cards = [
  { icon:"⚡", title:"Full Stack",    body:"End-to-end ownership from first wireframe to cloud deployment." },
  { icon:"☁️", title:"Cloud Native",  body:"AWS EC2, Docker, microservices — real production infrastructure." },
  { icon:"🔁", title:"Real-Time",     body:"Socket.io, RabbitMQ, Redis — live, event-driven systems." },
  { icon:"🎯", title:"Freelancer",    body:"Direct client collaboration, clean code, on-time delivery always." },
];

export default function About() {
  const section  = useRef<HTMLElement>(null);
  const inView   = useInView(section, { once:true, margin:"-12%" });
  const counters = useRef<(HTMLSpanElement|null)[]>([]);

  const { scrollYProgress } = useScroll({ target:section, offset:["start end","end start"] });
  const y = useTransform(scrollYProgress, [0,1], ["5%","-5%"]);

  useEffect(()=>{
    if(!inView) return;
    counters.current.forEach((el,i)=>{
      if(!el) return;
      const s = stats[i];
      const obj = { v: 0 };
      gsap.to(obj, {
        v: s.end,
        duration: 1.8,
        ease: "power2.out",
        delay: 0.3 + i * 0.1,
        onUpdate: () => { el.textContent = Math.round(obj.v) + s.suffix; }
      });
    });
  }, [inView]);

  return (
    <section id="about" ref={section} className="py-28 md:py-40 bg-[#F5F5F7] overflow-hidden">
      <div className="wrap max-w-[980px] mx-auto">

        <motion.p initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}} className="lbl mb-4">About</motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start mb-16">
          <div>
            <motion.h2 initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:.85,ease:[.16,1,.3,1],delay:.06}}
              style={{fontSize:"clamp(2.2rem,5vw,3.8rem)",fontWeight:700,letterSpacing:"-.03em",lineHeight:1.08}}
              className="mb-7"
            >
              Developer.<br/><span className="g-blue">Problem Solver.</span>
            </motion.h2>
            <motion.p initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7,delay:.18}}
              className="text-[1.05rem] font-light text-[#424245] leading-relaxed mb-4"
            >
              I'm a Full Stack Developer and BCA student at <strong className="font-semibold text-dark">Saint Joseph's University, Bengaluru</strong>.
            </motion.p>
            <motion.p initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7,delay:.28}}
              className="text-[1.05rem] font-light text-[#424245] leading-relaxed"
            >
              From distributed microservice platforms on AWS to real-time chat with Socket.io and Razorpay integrations — I build things that run in production.
            </motion.p>
          </div>

          <motion.div style={{y}} className="grid grid-cols-2 gap-4">
            {stats.map((s,i)=>(
              <motion.div key={s.label} initial={{opacity:0,scale:.94}} animate={inView?{opacity:1,scale:1}:{}}
                transition={{duration:.6,delay:.1+i*.1,ease:[.16,1,.3,1]}}
                className="a-card p-7 text-center"
              >
                <div style={{fontSize:"clamp(2.2rem,5vw,3.2rem)",fontWeight:800,letterSpacing:"-.04em",color:"#0071E3"}}>
                  <span ref={el=>{ counters.current[i]=el; }}>0</span>
                </div>
                <div className="text-[12px] font-medium text-gray mt-1">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c,i)=>(
            <motion.div key={c.title} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:.7,delay:.25+i*.1,ease:[.16,1,.3,1]}}
              className="a-card p-6"
            >
              <div className="text-2xl mb-3">{c.icon}</div>
              <div className="text-[15px] font-semibold text-dark mb-2">{c.title}</div>
              <div className="text-[13px] text-gray font-light leading-relaxed">{c.body}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}