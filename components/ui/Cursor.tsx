"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const m    = useRef({ x:0,y:0 });
  const r    = useRef({ x:0,y:0 });

  useEffect(()=>{
    const move = (e:MouseEvent)=>{
      m.current={x:e.clientX,y:e.clientY};
      if(dot.current){ dot.current.style.left=e.clientX+"px"; dot.current.style.top=e.clientY+"px"; }
    };
    const raf = ()=>{
      r.current.x+=(m.current.x-r.current.x)*.1;
      r.current.y+=(m.current.y-r.current.y)*.1;
      if(ring.current){ ring.current.style.left=r.current.x+"px"; ring.current.style.top=r.current.y+"px"; }
      requestAnimationFrame(raf);
    };
    raf();
    const click = ()=>{
      ring.current?.classList.add("clicked");
      setTimeout(()=>ring.current?.classList.remove("clicked"),200);
    };
    document.addEventListener("mousemove",move);
    document.addEventListener("mousedown",click);
    const on  = ()=>ring.current?.classList.add("mag");
    const off = ()=>ring.current?.classList.remove("mag");
    const refresh = ()=>{ document.querySelectorAll("a,button,[data-mag]").forEach(el=>{ el.addEventListener("mouseenter",on); el.addEventListener("mouseleave",off); }); };
    refresh();
    const obs = new MutationObserver(refresh);
    obs.observe(document.body,{childList:true,subtree:true});
    return ()=>{ document.removeEventListener("mousemove",move); document.removeEventListener("mousedown",click); obs.disconnect(); };
  },[]);

  return (<>
    <div ref={dot}  className="c-dot" />
    <div ref={ring} className="c-ring" />
  </>);
}
