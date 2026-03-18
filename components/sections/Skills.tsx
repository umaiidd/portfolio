"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const groups = [
  { title:"Frontend", dot:"#0071E3", skills:["React.js","Next.js","TypeScript","JavaScript ES6+","Tailwind CSS","Redux","HTML5 / CSS3","Bootstrap","Sass"] },
  { title:"Backend",  dot:"#AF52DE", skills:["Node.js","Express.js","REST APIs","JWT Auth","Socket.io","RabbitMQ","Microservices","AWS EC2"] },
  { title:"Databases",dot:"#34C759", skills:["MongoDB","PostgreSQL","MySQL","Redis","Firebase"] },
  { title:"Tools",    dot:"#FF9500", skills:["Git / GitHub","Docker","Postman","Cloudinary","Figma","Razorpay","Resend","Nodemailer","Axios"] },
];

const ticker = ["React","Node.js","TypeScript","AWS","Docker","MongoDB","Socket.io","RabbitMQ","Redis","PostgreSQL","Next.js","Express","JWT","Microservices","Figma","Razorpay"];

export default function Skills() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref,{once:true,margin:"-10%"});
  const { scrollYProgress } = useScroll({target:ref,offset:["start end","end start"]});
  const bgY = useTransform(scrollYProgress,[0,1],["-4%","4%"]);

  return (
    <section id="skills" ref={ref} className="py-28 md:py-40 bg-white relative overflow-hidden">
      <motion.div style={{y:bgY}} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent blur-[100px] rounded-full"/>
      </motion.div>

      <div className="relative z-10 mb-20">
        <div className="overflow-hidden border-y border-[#D2D2D7] py-3 mb-2">
          <div className="mq">
            {[...ticker,...ticker,...ticker,...ticker].map((t,i)=>(
              <span key={i} className={`text-[11px] font-semibold tracking-[.15em] uppercase px-5 whitespace-nowrap ${i%2===0?"text-gray":"text-blue"}`}>{i%2===0?t:"·"}</span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden border-b border-[#D2D2D7] py-3">
          <div className="mq mq-rev">
            {[...ticker,...ticker,...ticker,...ticker].map((t,i)=>(
              <span key={i} className={`text-[11px] font-semibold tracking-[.15em] uppercase px-5 whitespace-nowrap ${i%2===0?"text-blue":"text-gray"}`}>{i%2===0?t:"·"}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap max-w-[980px] mx-auto relative z-10">
        <motion.p initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}} className="lbl mb-4">Skills</motion.p>
        <motion.h2 initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.85,ease:[.16,1,.3,1],delay:.06}}
          style={{fontSize:"clamp(2.2rem,5vw,3.8rem)",fontWeight:700,letterSpacing:"-.03em",lineHeight:1.08}} className="mb-14"
        >Everything I<br/><span className="g-blue">Build With</span></motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {groups.map((g,gi)=>(
            <motion.div key={g.title} initial={{opacity:0,y:32,scale:.97}} animate={inView?{opacity:1,y:0,scale:1}:{}}
              transition={{duration:.75,delay:gi*.11,ease:[.16,1,.3,1]}} className="a-card p-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-3 h-3 rounded-full" style={{background:g.dot}}/>
                <span className="text-[15px] font-semibold text-dark">{g.title}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s,si)=>(
                  <motion.span key={s}
                    initial={{opacity:0,scale:.85}} animate={inView?{opacity:1,scale:1}:{}}
                    transition={{delay:.35+gi*.07+si*.03,duration:.4}}
                    whileHover={{scale:1.08,y:-2}}
                    className="chip text-[11px]" style={{color:g.dot,background:g.dot+"18"}}
                  >{s}</motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
