"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let activeLenis: Lenis | null = null;

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (activeLenis) return;
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      anchors: true,
      autoRaf: false,
      autoToggle: true,
      allowNestedScroll: true,
      prevent: (node) => node instanceof HTMLElement && Boolean(node.closest("[data-lenis-prevent]")),
    });
    activeLenis = lenis;
    const update = () => ScrollTrigger.update();
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", update);
      lenis.destroy();
      if (activeLenis === lenis) activeLenis = null;
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
