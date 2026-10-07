"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "@/Logo.webp";
import { startActiveSmoothScroll, stopActiveSmoothScroll } from "@/components/motion/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

const SESSION_KEY = "ali_intro_seen";
const WATCHDOG_MS = 6800;
type IntroState = "idle" | "preparing" | "playing" | "handoff" | "complete";
type ScrollSnapshot = {
  bodyOverflow: string;
  bodyOverscrollBehavior: string;
  htmlOverflow: string;
  htmlOverscrollBehavior: string;
};

export function SiteIntro({ heroVideo }: { heroVideo: React.RefObject<HTMLVideoElement | null> }) {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const maskVideo = useRef<HTMLVideoElement>(null);
  const portalVideo = useRef<HTMLVideoElement>(null);
  const deferredUnmount = useRef<number | null>(null);
  const [introState, setIntroState] = useState<IntroState>("idle");

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    if (deferredUnmount.current !== null) {
      cancelAnimationFrame(deferredUnmount.current);
      deferredUnmount.current = null;
    }
    const header = document.querySelector<HTMLElement>(".site-header");

    let alive = true;
    let finished = false;
    let started = false;
    let timeline: gsap.core.Timeline | null = null;
    let watchdog: ReturnType<typeof setTimeout> | null = null;
    let scrollSnapshot: ScrollSnapshot | null = null;

    const lockIntroScroll = () => {
      if (scrollSnapshot) return;
      scrollSnapshot = {
        bodyOverflow: document.body.style.overflow,
        bodyOverscrollBehavior: document.body.style.overscrollBehavior,
        htmlOverflow: document.documentElement.style.overflow,
        htmlOverscrollBehavior: document.documentElement.style.overscrollBehavior,
      };
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overscrollBehavior = "none";
      document.documentElement.classList.add("ali-intro-running");
      stopActiveSmoothScroll();
    };

    const unlockIntroScroll = () => {
      if (scrollSnapshot) {
        document.body.style.overflow = scrollSnapshot.bodyOverflow;
        document.body.style.overscrollBehavior = scrollSnapshot.bodyOverscrollBehavior;
        document.documentElement.style.overflow = scrollSnapshot.htmlOverflow;
        document.documentElement.style.overscrollBehavior = scrollSnapshot.htmlOverscrollBehavior;
        scrollSnapshot = null;
      }
      document.documentElement.classList.remove("ali-intro-running");
      startActiveSmoothScroll();
      requestAnimationFrame(() => {
        startActiveSmoothScroll();
        ScrollTrigger.refresh();
      });
    };

    const syncVideo = (from: HTMLVideoElement | null, to: HTMLVideoElement | null) => {
      if (!from || !to || from.readyState < HTMLMediaElement.HAVE_METADATA) return;
      try { to.currentTime = from.currentTime; } catch { /* The poster remains the visual fallback. */ }
      void to.play().catch(() => {});
    };

    const finishIntro = ({ markSeen = true, updateState = true } = {}) => {
      if (finished) return;
      finished = true;
      if (watchdog) clearTimeout(watchdog);
      timeline?.kill();
      syncVideo(portalVideo.current, heroVideo.current);
      if (header) gsap.set(header, { clearProps: "opacity,visibility,transform" });
      element.style.display = "none";
      element.style.pointerEvents = "none";
      unlockIntroScroll();
      if (markSeen) {
        try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* Storage privacy modes must not block cleanup. */ }
        document.documentElement.classList.add("ali-intro-seen");
      }
      if (updateState && alive) setIntroState("complete");
      window.dispatchEvent(new CustomEvent("ali:intro-complete"));
    };

    let seen = false;
    try {
      const value = sessionStorage.getItem(SESSION_KEY);
      seen = value === "1" || value === "true";
    } catch { /* Continue safely when session storage is unavailable. */ }

    if (pathname !== "/" || seen) {
      finishIntro({ markSeen: false });
      return () => { alive = false; finishIntro({ markSeen: false, updateState: false }); };
    }

    setIntroState("preparing");
    lockIntroScroll();

    const context = gsap.context(() => {
      gsap.set(element, { display: "block", pointerEvents: "auto", autoAlpha: 1 });
      gsap.set(".intro-logo", { autoAlpha: 0, scale: .985, clipPath: "inset(0 50% 0 50%)" });
      gsap.set(".intro-mask-copy", { autoAlpha: 1, clipPath: "inset(100% 0 0 0)", yPercent: 7, scale: 1 });
      gsap.set(".intro-portal", {
        autoAlpha: 0,
        clipPath: "inset(42% 43% 42% 43% round 2px)",
        scale: .94,
        transformOrigin: "50% 50%",
      });
      if (header) gsap.set(header, { autoAlpha: 0, y: -8 });
    }, element);

    [maskVideo.current, portalVideo.current, heroVideo.current]
      .forEach((video) => void video?.play().catch(() => {}));
    watchdog = setTimeout(() => finishIntro(), WATCHDOG_MS);

    const startTimeline = () => {
      if (!alive || finished || started) return;
      started = true;
      setIntroState("playing");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      context.add(() => {
        if (reduceMotion) {
          timeline = gsap.timeline({ onComplete: () => finishIntro() })
            .to(".intro-logo", { autoAlpha: 1, scale: 1, clipPath: "inset(0 0% 0 0%)", duration: .24, ease: "power2.out" })
            .to(".intro-logo", { autoAlpha: 0, duration: .2, ease: "power2.in" }, .32)
            .to(element, { autoAlpha: 0, duration: .12 }, .43);
          return;
        }

        timeline = gsap.timeline({ defaults: { force3D: true }, onComplete: () => finishIntro() })
          .to(".intro-logo", { autoAlpha: 1, scale: 1, clipPath: "inset(0 0% 0 0%)", duration: .45, ease: "power3.out" }, .35)
          .to(".intro-logo", { autoAlpha: 0, scale: .99, duration: .3, ease: "power2.in" }, 1.48)
          .to(".intro-mask-copy", { clipPath: "inset(0% 0 0 0)", yPercent: 0, duration: .92, ease: "power4.out" }, 1.92)
          .fromTo(maskVideo.current, { scale: 1.12, yPercent: -2 }, { scale: 1.045, yPercent: 0, duration: 1.05, ease: "power4.out" }, 1.92)
          .call(() => syncVideo(maskVideo.current, portalVideo.current), [], 3.12)
          .call(() => { if (alive) setIntroState("handoff"); }, [], 3.17)
          .fromTo(".intro-portal", {
            autoAlpha: 0,
            clipPath: "inset(42% 43% 42% 43% round 2px)",
            scale: .94,
            transformOrigin: "50% 50%",
          }, {
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            scale: 1,
            transformOrigin: "50% 50%",
            duration: 1.43,
            ease: "power3.inOut",
            immediateRender: false,
          }, 3.17)
          .to(".intro-mask-copy", { autoAlpha: 0, scale: 1.035, duration: .48, ease: "power2.in" }, 3.28)
          .to(header, { autoAlpha: 1, y: 0, duration: .45, ease: "power3.out" }, 4.26)
          .call(() => syncVideo(portalVideo.current, heroVideo.current), [], 4.48)
          .to(element, { autoAlpha: 0, duration: .22, ease: "power2.out" }, 4.56);

        if (window.matchMedia("(max-width: 640px)").matches) timeline.timeScale(1.11);
      });
    };

    const fontReady = document.fonts?.ready ?? Promise.resolve();
    const fontFallback = new Promise<void>((resolve) => window.setTimeout(resolve, 240));
    void Promise.race([fontReady, fontFallback]).then(startTimeline).catch(() => startTimeline());
    void fontReady.then(() => {
      if (!alive || finished) return;
      ScrollTrigger.refresh();
    }).catch(() => {});

    return () => {
      alive = false;
      finishIntro({ markSeen: false, updateState: false });
      context.revert();
      deferredUnmount.current = requestAnimationFrame(() => {
        try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* Cleanup remains safe without storage. */ }
        document.documentElement.classList.add("ali-intro-seen");
        deferredUnmount.current = null;
      });
    };
  }, [heroVideo, pathname]);

  if (introState === "complete") return null;

  return <div ref={root} className="site-intro" data-intro-state={introState} aria-hidden="true">
    <div className="intro-logo"><Image src={logo} alt="" priority /></div>
    <div className="intro-mask-copy">
      <svg className="intro-mask-svg intro-mask-desktop" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet">
        <defs><mask id="intro-type-mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900"><rect width="1600" height="900" fill="black"/><g fill="white"><text x="800" y="315">PROPERTY,</text><text x="800" y="505">PERSONALLY</text><text x="800" y="695">ADVISED.</text></g></mask></defs>
        <foreignObject width="1600" height="900" mask="url(#intro-type-mask)"><video ref={maskVideo} src="/videos/file.mp4" poster="/images/properties/address-jbr/cover.png" muted loop playsInline preload="auto" /></foreignObject>
      </svg>
      <svg className="intro-mask-svg intro-mask-mobile" viewBox="0 0 900 1200" preserveAspectRatio="xMidYMid meet">
        <defs><mask id="intro-type-mask-mobile" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="0" width="900" height="1200"><rect width="900" height="1200" fill="black"/><g fill="white"><text x="450" y="420">PROPERTY,</text><text x="450" y="620">PERSONALLY</text><text x="450" y="820">ADVISED.</text></g></mask></defs>
        <foreignObject width="900" height="1200" mask="url(#intro-type-mask-mobile)"><video src="/videos/file.mp4" poster="/images/properties/address-jbr/cover.png" muted loop playsInline preload="auto" /></foreignObject>
      </svg>
    </div>
    <div className="intro-portal"><video ref={portalVideo} src="/videos/file.mp4" poster="/images/properties/address-jbr/cover.png" muted loop playsInline preload="auto" /></div>
  </div>;
}
