"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PropertyImage } from "@/types/property";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ParallaxMedia({ media, className = "", priority = false }: { media: PropertyImage; className?: string; priority?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const visual = useRef<HTMLVideoElement | HTMLImageElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(visual.current, { yPercent: -7, scale: 1.07 }, { yPercent: 7, scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 } });
    });
    return () => mm.revert();
  }, { scope: root });
  return <div ref={root} className={`media-mask ${className}`}>
    {media.kind === "video" ? <video ref={visual as React.RefObject<HTMLVideoElement>} src={media.src} aria-label={media.alt} autoPlay muted loop playsInline preload={priority ? "metadata" : "none"} /> : <Image ref={visual as React.RefObject<HTMLImageElement>} src={media.src} alt={media.alt} fill sizes="(max-width: 768px) 100vw, 80vw" preload={priority} />}
  </div>;
}
