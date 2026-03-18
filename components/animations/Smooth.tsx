"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function Smooth({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const l = new Lenis({ duration: 1.4, easing: (t:number) => Math.min(1,1.001-Math.pow(2,-10*t)), smoothWheel: true });
    const r = (t:number) => { l.raf(t); requestAnimationFrame(r); };
    requestAnimationFrame(r);
    return () => l.destroy();
  }, []);
  return <>{children}</>;
}
