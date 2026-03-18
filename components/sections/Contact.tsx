"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";

const SERVICE_ID  = "service_obqibtv";
const TEMPLATE_ID = "template_f1smr2z";
const PUBLIC_KEY  = "JIkKuLgpQvjkmuH8K";

const socials = [
  { icon:"✉️", label:"Email",    val:"umaidimtiyaz6@gmail.com",     href:"mailto:umaidimtiyaz6@gmail.com" },
  { icon:"🐙", label:"GitHub",   val:"github.com/umaiidd",           href:"https://github.com/umaiidd" },
  { icon:"💼", label:"LinkedIn", val:"linkedin.com/in/umaidimtiyaz", href:"https://linkedin.com/in/umaidimtiyaz" },
  { icon:"📞", label:"Phone",    val:"+91 7006427233",               href:"tel:+917006427233" },
  { icon:"📄", label:"Resume",   val:"View my resume",          href:"/Resume.pdf" },
];
function MagSocial({ s, i, inView }: { s: typeof socials[0]; i: number; inView: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, { x:(e.clientX-r.left-r.width/2)*.2, y:(e.clientY-r.top-r.height/2)*.2, duration:.4, ease:"power3.out" });
  };
  const onLeave = () => gsap.to(ref.current, { x:0, y:0, duration:.7, ease:"elastic.out(1,.4)" });

  return (
    <motion.a ref={ref} href={s.href} target="_blank" rel="noopener noreferrer"
      initial={{ opacity:0, x:-20 }} animate={inView ? { opacity:1, x:0 } : {}}
      transition={{ delay:.2+i*.08, duration:.65 }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      className="group flex items-center justify-between p-5 rounded-2xl bg-[#F5F5F7] hover:bg-blue-50 transition-colors duration-300"
    >
      <div className="flex items-center gap-4">
        <span className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm">{s.icon}</span>
        <div>
          <div className="text-[10px] font-semibold text-gray uppercase tracking-widest mb-0.5">{s.label}</div>
          <div className="text-[14px] font-light text-dark">{s.val}</div>
        </div>
      </div>
      <span className="text-gray group-hover:text-blue transition-colors duration-200 text-xl">›</span>
    </motion.a>
  );
}

export default function Contact() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:"-10%" });
  const [form,   setForm]   = useState({ name:"", email:"", msg:"" });
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  const { scrollYProgress } = useScroll({ target:ref, offset:["start end","end start"] });
  const bgY = useTransform(scrollYProgress, [0,1], ["-5%","5%"]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.msg,
          title:      "Portfolio Contact Form",
        },
        PUBLIC_KEY
      );
      setStatus("sent");
      setForm({ name:"", email:"", msg:"" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const btnLabel = {
    idle:    "Send Message",
    sending: "Sending...",
    sent:    "✓ Sent! I'll be in touch.",
    error:   "❌ Failed — try again",
  }[status];

  const btnColor = {
    idle:    "bg-dark hover:bg-blue",
    sending: "bg-blue opacity-70 cursor-not-allowed",
    sent:    "bg-green-500",
    error:   "bg-red-500",
  }[status];

  return (
    <section id="contact" ref={ref} className="py-28 md:py-40 bg-white overflow-hidden relative">
      <motion.div style={{ y:bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-blue-50/40 to-transparent blur-[80px]"/>
      </motion.div>

      <div className="wrap max-w-[980px] mx-auto relative z-10">
        <motion.p
          initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.6}} className="lbl mb-4"
        >Contact</motion.p>

        <motion.h2
          initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.85,ease:[.16,1,.3,1],delay:.06}}
          style={{fontSize:"clamp(2.2rem,5vw,3.8rem)",fontWeight:700,letterSpacing:"-.03em",lineHeight:1.08}}
          className="mb-6"
        >
          Let's work<br/><span className="g-blue">together.</span>
        </motion.h2>

        <motion.p
          initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.7,delay:.15}}
          className="text-[1.05rem] font-light text-[#424245] max-w-lg mb-14 leading-relaxed"
        >
          Open to freelance projects, full-time roles, and interesting ideas. I respond within 24 hours.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Socials */}
          <div className="flex flex-col gap-3">
            {socials.map((s,i) => <MagSocial key={s.label} s={s} i={i} inView={inView}/>)}
          </div>

          {/* Form */}
          <motion.div
            initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
            transition={{delay:.2,duration:.85,ease:[.16,1,.3,1]}}
          >
            <form onSubmit={submit} className="flex flex-col gap-4">

              {([
                { id:"name",  label:"Name",  type:"text",  ph:"Your name"      },
                { id:"email", label:"Email", type:"email", ph:"your@email.com" },
              ] as const).map(f => (
                <div key={f.id}>
                  <label className="text-[12px] font-medium text-gray mb-1.5 block">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.ph}
                    required
                    value={form[f.id]}
                    onChange={e => setForm(p => ({...p, [f.id]:e.target.value}))}
                    className="a-input"
                    disabled={status === "sending"}
                  />
                </div>
              ))}

              <div>
                <label className="text-[12px] font-medium text-gray mb-1.5 block">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                  value={form.msg}
                  onChange={e => setForm(p => ({...p, msg:e.target.value}))}
                  className="a-input resize-none"
                  disabled={status === "sending"}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={status==="idle" ? {scale:1.01} : {}}
                whileTap={status==="idle" ? {scale:.98} : {}}
                disabled={status === "sending"}
                className={`w-full py-4 rounded-2xl text-[15px] font-semibold text-white transition-all duration-300 ${btnColor}`}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={status}
                    initial={{y:14,opacity:0}}
                    animate={{y:0,opacity:1}}
                    exit={{y:-14,opacity:0}}
                    transition={{duration:.25}}
                    className="block"
                  >{btnLabel}</motion.span>
                </AnimatePresence>
              </motion.button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}