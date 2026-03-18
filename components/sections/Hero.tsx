"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";

const ROLES = ["Full Stack Developer","React & Node.js Engineer","AWS & Docker Enthusiast","Freelance Builder"];

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement|null)[]>([]);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const ctaRef  = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: section, offset:["start start","end start"] });
  const yHero    = useTransform(scrollYProgress,[0,1],["0%","25%"]);
  const opHero   = useTransform(scrollYProgress,[0,.6],[1,0]);
  const scaleOrb = useTransform(scrollYProgress,[0,1],[1,1.2]);

  // Typewriter effect
  useEffect(()=>{
    let ri=0, ci=0, deleting=false;
    const el = subtitleRef.current; if(!el) return;
    const type = ()=>{
      const word = ROLES[ri];
      if(!deleting){ el.textContent=word.slice(0,ci+1); ci++; if(ci===word.length){ deleting=true; setTimeout(type,1800); return; } }
      else { el.textContent=word.slice(0,ci-1); ci--; if(ci===0){ deleting=false; ri=(ri+1)%ROLES.length; } }
      setTimeout(type, deleting?55:85);
    };
    const t = setTimeout(type,2400);
    return ()=>clearTimeout(t);
  },[]);

  // GSAP hero reveal
  useEffect(()=>{
    const ctx = gsap.context(()=>{
      const tl = gsap.timeline({ delay:.5 });
      tl.fromTo(badgeRef.current,{opacity:0,y:14},{opacity:1,y:0,duration:.6,ease:"power3.out"});
      tl.fromTo(wordRefs.current.filter(Boolean),
        {opacity:0,y:60,filter:"blur(12px)",skewY:4},
        {opacity:1,y:0,filter:"blur(0px)",skewY:0,duration:.9,stagger:.08,ease:"expo.out"},
        "-=.2"
      );
      tl.fromTo(ctaRef.current,{opacity:0,y:20},{opacity:1,y:0,duration:.7,ease:"power3.out"},"-=.2");
      // orbs
      tl.fromTo([orb1.current,orb2.current],{opacity:0,scale:.7},{opacity:1,scale:1,duration:1.4,stagger:.2,ease:"power3.out"},0);
      // float orbs
      gsap.to(orb1.current,{y:-30,duration:4,ease:"sine.inOut",yoyo:true,repeat:-1});
      gsap.to(orb2.current,{y:20,duration:5,ease:"sine.inOut",yoyo:true,repeat:-1,delay:.8});
    });
    return ()=>ctx.revert();
  },[]);

  const words = ["Building","Products","That","Scale."];

  return (
    <section ref={section} className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-white pt-14">

      {/* Parallax orbs */}
      <motion.div style={{scale:scaleOrb}} className="absolute inset-0 pointer-events-none">
        <div ref={orb1} className="absolute top-[12%] left-[8%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-100/70 to-indigo-100/50 blur-[90px] opacity-0"/>
        <div ref={orb2} className="absolute bottom-[8%] right-[6%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-sky-100/60 to-blue-50/40 blur-[70px] opacity-0"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] bg-gradient-to-r from-transparent via-blue-50/20 to-transparent blur-[50px]"/>
      </motion.div>

      <motion.div style={{y:yHero,opacity:opHero}} className="relative z-10 w-full text-center px-5">

      

        {/* Headline */}
        <h1 className="mb-3" style={{fontSize:"clamp(3.2rem,9vw,8rem)",fontWeight:800,letterSpacing:"-0.04em",lineHeight:1.0}}>
          {words.map((w,i)=>(
            <span key={i} className="inline-block mr-[.18em]" style={{overflow:"hidden"}}>
              <span ref={el=>{ wordRefs.current[i]=el; }} className="inline-block opacity-0"
                style={{color: i===words.length-1?"":"#1D1D1F"}}>
                {i===words.length-1 ? <span className="g-blue">{w}</span> : w}
              </span>
            </span>
          ))}
        </h1>

        {/* Typewriter subtitle */}
        <div className="flex items-center justify-center gap-2 mb-8 h-8">
          <span className="text-[1.1rem] md:text-[1.3rem] font-light text-midgray">
            <span ref={subtitleRef} className="font-medium text-dark"></span>
            <span className="animate-pulse text-blue ml-0.5">|</span>
          </span>
        </div>

        <p className="text-[1.05rem] md:text-[1.2rem] font-light text-gray max-w-[560px] mx-auto leading-relaxed mb-10">
          I'm <span className="font-semibold text-dark">Umaid Imtiyaz</span> — crafting distributed systems, real-time apps and cloud-deployed backends with React & Node.js.
        </p>

        {/* Magnetic CTAs */}
        <div ref={ctaRef} className="opacity-0 flex flex-wrap items-center justify-center gap-4">
          <MagBtn href="#projects" solid>See My Work →</MagBtn>
          <MagBtn href="#contact">Get In Touch ›</MagBtn>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.4}}
          className="mt-20 flex flex-col items-center gap-2"
        >
          <motion.div animate={{y:[0,10,0]}} transition={{duration:1.8,repeat:Infinity,ease:"easeInOut"}}
            className="w-px h-10 bg-gradient-to-b from-gray/50 to-transparent"/>
          <span className="text-[10px] font-semibold tracking-[.2em] uppercase text-gray">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function MagBtn({href,children,solid}:{href:string;children:React.ReactNode;solid?:boolean}){
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove=(e:React.MouseEvent)=>{
    const el=ref.current; if(!el) return;
    const r=el.getBoundingClientRect();
    gsap.to(el,{x:(e.clientX-r.left-r.width/2)*.3,y:(e.clientY-r.top-r.height/2)*.3,duration:.4,ease:"power3.out"});
  };
  const onLeave=()=>gsap.to(ref.current,{x:0,y:0,duration:.7,ease:"elastic.out(1,.4)"});
  return (
    <a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={onLeave}
      className={solid?"btn-solid text-[1rem] py-3 px-8":"btn-outline text-[1rem] py-3 px-8"}
    >{children}</a>
  );
}
