"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLink } from "@/components/ui/ArrowLink";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const root = useRef<HTMLElement>(null); const media = useRef<HTMLVideoElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline();
      tl.fromTo(media.current, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1.05, duration: 1.4, ease: "power2.out" })
        .from(".hero-line > span", { yPercent: 110, duration: 1.1, stagger: 0.11, ease: "power4.out" }, .25)
        .from(".hero-meta, .hero-actions, .scroll-cue", { opacity: 0, y: 18, duration: .7, stagger: .08 }, .7);
      gsap.to(media.current, { yPercent: 11, scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: .8 } });
      gsap.to(".hero-copy", { yPercent: 18, opacity: .18, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 20%", scrub: .8 } });
    });
    return () => mm.revert();
  }, { scope: root });
  return <section ref={root} className="hero">
    <div className="hero-media"><video ref={media} src="/media/dubai-cityscape.mp4" autoPlay muted loop playsInline preload="auto" aria-label="Cinematic view across Dubai Marina" /><div className="hero-shade" /></div>
    <div className="hero-meta"><span>Ali &amp; Associates</span><span>Dubai / UAE</span></div>
    <div className="hero-copy"><h1><span className="hero-line"><span>Dubai property.</span></span><span className="hero-line hero-offset"><span><b>Personally</b> <b>advised.</b></span></span></h1><p className="hero-intro">A boutique brokerage helping investors, homeowners and landlords make considered property decisions in Dubai.</p></div>
    <div className="hero-actions"><ArrowLink href="/properties">Explore properties</ArrowLink><ArrowLink href="/contact">Speak to an advisor</ArrowLink></div>
    <div className="scroll-cue"><span>Scroll to explore</span><i /></div>
  </section>;
}
