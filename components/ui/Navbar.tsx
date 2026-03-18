"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const links = [
  {label:"About",href:"#about"},
  {label:"Skills",href:"#skills"},
  {label:"Projects",href:"#projects"},
  {label:"Contact",href:"#contact"},
];

function MagLink({ label, href, onClick }: { label:string; href:string; onClick?:()=>void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e:React.MouseEvent)=>{
    const el = ref.current; if(!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX-r.left-r.width/2)*.25;
    const y = (e.clientY-r.top-r.height/2)*.25;
    gsap.to(el,{ x, y, duration:.4, ease:"power3.out" });
  };
  const onLeave = ()=>{ gsap.to(ref.current,{ x:0, y:0, duration:.6, ease:"elastic.out(1,.4)" }); };

  return (
    <a ref={ref} href={href} onClick={onClick}
      onMouseMove={onMove} onMouseLeave={onLeave}
      className="text-[13px] font-normal text-midgray hover:text-dark transition-colors duration-200 inline-block"
    >{label}</a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (<>
    <motion.header
      initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.3}}
      className="nav"
    >
      <div className="wrap w-full flex items-center justify-between">
        <a href="#" className="text-[16px] font-bold text-dark tracking-tight hover:opacity-70 transition-opacity">
          Umaid<span className="text-blue">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l=><MagLink key={l.label} {...l}/>)}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="btn-solid hidden md:inline-flex text-[13px] py-2 px-5">Hire Me</a>
          <button className="md:hidden p-1 flex flex-col gap-1.5" onClick={()=>setOpen(!open)}>
            <motion.span animate={{rotate:open?45:0,y:open?7:0}} className="w-5 h-px bg-dark block origin-center"/>
            <motion.span animate={{opacity:open?0:1}} className="w-5 h-px bg-dark block"/>
            <motion.span animate={{rotate:open?-45:0,y:open?-7:0}} className="w-5 h-px bg-dark block origin-center"/>
          </button>
        </div>
      </div>
    </motion.header>

    <AnimatePresence>
      {open&&(
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.3}} className="mob-menu">
          {links.map((l,i)=>(
            <motion.a key={l.label} href={l.href}
              initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:i*.07}}
              onClick={()=>setOpen(false)}
              className="text-[2.8rem] font-bold text-dark tracking-tight hover:text-blue transition-colors"
            >{l.label}</motion.a>
          ))}
          <motion.a href="#contact"
            initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.35}}
            onClick={()=>setOpen(false)}
            className="btn-solid mt-4"
          >Hire Me</motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  </>);
}