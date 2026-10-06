"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const el = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => gsap.fromTo(el.current, { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 1.05, ease: "power3.out", scrollTrigger: { trigger: el.current, start: "top 88%", once: true } }));
    return () => media.revert();
  }, { scope: el });
  return <div ref={el} className={className}>{children}</div>;
}
