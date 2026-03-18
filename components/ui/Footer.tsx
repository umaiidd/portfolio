"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F7] border-t border-[#D2D2D7] py-10">
      <div className="wrap max-w-[980px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-gray font-light">
        <div className="font-bold text-dark text-[15px] tracking-tight">Umaid<span className="text-blue">.</span></div>
        <div className="flex gap-6">
          {[{l:"GitHub",h:"https://github.com/umaiidd"},{l:"LinkedIn",h:"https://www.linkedin.com/in/umaid-imtiyaz-517b6b379/"}].map(x=>(
            <a key={x.l} href={x.h} target="_blank" rel="noopener noreferrer" className="hover:text-blue transition-colors duration-200">{x.l}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
          <span>© {new Date().getFullYear()} · Available for work</span>
        </div>
      </div>
    </footer>
  );
}
