"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef    = useRef<HTMLDivElement>(null);
  const pctRef    = useRef<HTMLSpanElement>(null);
  const u1        = useRef<HTMLSpanElement>(null);
  const u2        = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(()=>{
    if(done) return;
    document.body.style.overflow = "hidden";
    const tl = gsap.timeline();

    // reveal name letters
    tl.fromTo([u1.current,u2.current],
      { y:"100%", opacity:0 },
      { y:"0%", opacity:1, duration:.9, stagger:.12, ease:"expo.out" }
    );

    // count up bar
    tl.to(barRef.current,{ scaleX:1, duration:1.4, ease:"power2.inOut" }, "-=.3");
    tl.to({p:0},{p:100, duration:1.4, ease:"power2.inOut",
      onUpdate: function(){ if(pctRef.current) pctRef.current.textContent = Math.round(this.targets()[0].p)+"%"; }
    },"-=1.4");

    // slide loader up + reveal page
    tl.to(loaderRef.current,{ yPercent:-105, duration:1, ease:"expo.inOut", delay:.15 });
    tl.add(()=>{ document.body.style.overflow=""; setDone(true); });
  },[]);

  if(done) return null;

  return (
    <div ref={loaderRef} className="loader">
      <div style={{textAlign:"center"}}>
        <span className="loader-name" style={{display:"block",overflow:"hidden"}}>
          <span ref={u1} style={{display:"inline-block",transform:"translateY(100%)"}}>Umaid</span>
        </span>
        <span className="loader-name g-blue" style={{display:"block",overflow:"hidden"}}>
          <span ref={u2} style={{display:"inline-block",transform:"translateY(100%)"}}>Imtiyaz</span>
        </span>
      </div>
      <div className="loader-bar-wrap">
        <div ref={barRef} className="loader-bar" style={{transform:"scaleX(0)"}}/>
      </div>
      <span ref={pctRef} className="loader-pct">0%</span>
    </div>
  );
}
