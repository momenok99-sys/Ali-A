"use client";

import Image from "next/image";
import { flushSync } from "react-dom";
import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PropertyImage } from "@/types/property";

gsap.registerPlugin(ScrollTrigger, useGSAP);
type GalleryMode = "detail" | "masonry" | "slider";
type Gesture = { pointerId: number | null; x: number; y: number; dragged: boolean };
const modes: GalleryMode[] = ["detail", "masonry", "slider"];
const DRAG_THRESHOLD = 7;
const number = (value: number) => String(value).padStart(2, "0");

function ModeIcon({ mode }: { mode: GalleryMode }) {
  if (mode === "detail") return <svg viewBox="0 0 16 12" aria-hidden="true"><rect x="1" y="1" width="9" height="6"/><rect x="11" y="1" width="4" height="10"/><rect x="1" y="8" width="9" height="3"/></svg>;
  if (mode === "masonry") return <svg viewBox="0 0 16 12" aria-hidden="true"><rect x="1" y="1" width="6" height="4"/><rect x="9" y="1" width="6" height="7"/><rect x="1" y="7" width="6" height="4"/><rect x="9" y="10" width="6" height="1"/></svg>;
  return <svg viewBox="0 0 16 12" aria-hidden="true"><rect x="1" y="2" width="9" height="8"/><rect x="12" y="2" width="3" height="8"/></svg>;
}

function Viewer({ images, index, onClose }: { images: PropertyImage[]; index: number; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [viewportRef, api] = useEmblaCarousel({ loop: false, containScroll: "trimSnaps", dragFree: false, duration: 24, dragThreshold: DRAG_THRESHOLD, startIndex: index });
  const [selected, setSelected] = useState(index);
  useEffect(() => {
    if (!api) return;
    const select = () => setSelected(api.selectedScrollSnap());
    api.on("select", select); api.scrollTo(index, true); select();
    return () => { api.off("select", select); };
  }, [api, index]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") api?.scrollPrev();
      if (event.key === "ArrowRight") api?.scrollNext();
    };
    window.addEventListener("keydown", key);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = overflow; };
  }, [api, onClose]);
  useEffect(() => {
    if (!root.current) return;
    gsap.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: .58, ease: "power3.inOut" });
    const image = root.current.querySelector(".viewer-slide.is-selected .viewer-image");
    if (image) gsap.fromTo(image, { scale: .94, opacity: .7 }, { scale: 1, opacity: 1, duration: .72, ease: "power3.inOut" });
  }, []);
  const close = () => root.current ? gsap.to(root.current, { autoAlpha: 0, duration: .46, ease: "power3.inOut", onComplete: onClose }) : onClose();
  return <div ref={root} className="gallery-viewer" role="dialog" aria-modal="true" aria-label="Fullscreen property gallery" data-lenis-prevent>
    <button className="viewer-close" type="button" onClick={close} aria-label="Close fullscreen gallery">Close</button>
    <div className="viewer-viewport" ref={viewportRef}><div className="viewer-track">{images.map((media, imageIndex) => <figure className={`viewer-slide ${selected === imageIndex ? "is-selected" : ""}`} key={media.src}><div className="viewer-image">{media.kind === "video" ? <video src={media.src} controls playsInline preload="metadata" draggable={false}/> : <Image src={media.src} alt={media.alt} fill sizes="96vw" preload={imageIndex === index} draggable={false}/>}</div></figure>)}</div></div>
    <div className="viewer-nav"><button type="button" onClick={() => api?.scrollPrev()} disabled={!api?.canScrollPrev()} aria-label="Previous image">←</button><span aria-live="polite">{number(selected + 1)} / {number(images.length)}</span><button type="button" onClick={() => api?.scrollNext()} disabled={!api?.canScrollNext()} aria-label="Next image">→</button></div>
  </div>;
}

function SliderGallery({ images, initialSlide, canvasRef, onSlideChange, onOpen, onReady }: { images: PropertyImage[]; initialSlide: number; canvasRef: React.RefObject<HTMLDivElement | null>; onSlideChange: (index: number) => void; onOpen: (index: number) => void; onReady: () => void }) {
  const gesture = useRef<Gesture>({ pointerId: null, x: 0, y: 0, dragged: false });
  const initialSlideRef = useRef(initialSlide);
  const onSlideChangeRef = useRef(onSlideChange);
  const onReadyRef = useRef(onReady);
  const [activeSlide, setActiveSlide] = useState(initialSlide);
  const [emblaRef, api] = useEmblaCarousel({ align: "start", loop: false, containScroll: "trimSnaps", dragFree: true, duration: 20, dragThreshold: DRAG_THRESHOLD, startIndex: initialSlide, watchDrag: true });
  useEffect(() => {
    if (!api) return;
    const select = () => { const next = api.selectedScrollSnap(); setActiveSlide(next); onSlideChangeRef.current(next); };
    api.on("select", select).on("reInit", select); select();
    let inner = 0;
    const outer = requestAnimationFrame(() => { inner = requestAnimationFrame(() => { api.reInit(); api.scrollTo(initialSlideRef.current, true); onReadyRef.current(); }); });
    return () => { cancelAnimationFrame(outer); if (inner) cancelAnimationFrame(inner); api.off("select", select).off("reInit", select); };
  }, [api]);
  const pointerDown = (event: React.PointerEvent<HTMLDivElement>) => { gesture.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, dragged: false }; };
  const pointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (current.pointerId !== event.pointerId || current.dragged) return;
    const x = Math.abs(event.clientX - current.x); const y = Math.abs(event.clientY - current.y);
    if (x > DRAG_THRESHOLD && x > y) current.dragged = true;
  };
  const open = (event: React.MouseEvent<HTMLButtonElement>, imageIndex: number) => {
    if (gesture.current.dragged) { event.preventDefault(); event.stopPropagation(); gesture.current.dragged = false; return; }
    onOpen(imageIndex);
  };
  return <>
    <div ref={canvasRef} className="gallery-canvas embla" tabIndex={0} aria-label="Draggable property gallery" onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); api?.scrollPrev(); } if (event.key === "ArrowRight") { event.preventDefault(); api?.scrollNext(); } }}>
      <div className="embla-viewport" ref={emblaRef} onPointerDownCapture={pointerDown} onPointerMoveCapture={pointerMove} onPointerCancelCapture={() => { gesture.current.pointerId = null; }}>
        <div className="gallery-track">{images.map((media, imageIndex) => <figure className={`gallery-frame ${imageIndex === activeSlide ? "is-active" : ""}`} style={{ "--media-ratio": media.width && media.height ? `${media.width} / ${media.height}` : "16 / 9" } as React.CSSProperties} key={media.src}>
          <button className="gallery-open" type="button" aria-label={`Open ${media.alt} fullscreen`} onClick={(event) => open(event, imageIndex)}><div className="gallery-visual">{media.kind === "video" ? <video src={media.src} aria-label={media.alt} muted playsInline preload="metadata" draggable={false}/> : <Image src={media.src} alt={media.alt} fill draggable={false} sizes="(max-width: 768px) 86vw, 82vw" preload={imageIndex === 0}/>}</div></button>
          <figcaption>{media.alt}</figcaption>
        </figure>)}</div>
      </div>
    </div>
  </>;
}

export function PropertyGallery({ images }: { images: PropertyImage[] }) {
  const root = useRef<HTMLElement>(null); const canvas = useRef<HTMLDivElement>(null); const control = useRef<HTMLDivElement>(null); const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mode, setMode] = useState<GalleryMode>("detail"); const [transitioning, setTransitioning] = useState(false); const [viewerIndex, setViewerIndex] = useState<number | null>(null); const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => () => { if (hideTimer.current) clearTimeout(hideTimer.current); }, []);
  useGSAP(() => { const mm = gsap.matchMedia(); mm.add("(min-width:769px) and (prefers-reduced-motion:no-preference)", () => { if (mode === "slider") return; gsap.utils.toArray<HTMLElement>(".gallery-frame").forEach((frame, index) => { const visual = frame.querySelector<HTMLElement>(".gallery-visual"); if (visual) gsap.fromTo(visual, { yPercent: index % 2 ? -4 : -6 }, { yPercent: index % 2 ? 4 : 6, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: .55 } }); }); }); return () => mm.revert(); }, { scope: root, dependencies: [mode], revertOnUpdate: true });
  const showControl = () => { if (hideTimer.current) clearTimeout(hideTimer.current); gsap.to(control.current, { autoAlpha: 1, y: 0, scale: 1, duration: .3, ease: "power3.out", overwrite: true }); };
  const scheduleHide = () => { if (transitioning || control.current?.matches(":hover") || control.current?.contains(document.activeElement)) return; hideTimer.current = setTimeout(() => gsap.to(control.current, { autoAlpha: 0, y: 6, duration: .25, ease: "power2.out", overwrite: true }), 180); };
  const changeMode = (next: GalleryMode) => { if (next === mode || transitioning || !canvas.current) return; setTransitioning(true); const top = root.current?.getBoundingClientRect().top ?? 0; gsap.to(canvas.current, { opacity: 0, y: 8, duration: .2, ease: "power2.out", onComplete: () => { flushSync(() => setMode(next)); requestAnimationFrame(() => requestAnimationFrame(() => { const nextTop = root.current?.getBoundingClientRect().top ?? top; if (top < 0 && Math.abs(nextTop - top) > 1) window.scrollBy({ top: nextTop - top, behavior: "auto" }); gsap.fromTo(canvas.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .42, ease: "power3.out", onComplete: () => { ScrollTrigger.refresh(); if (next !== "slider") setTransitioning(false); } }); })); } }); };
  const standardFrames = images.map((media, imageIndex) => <figure className="gallery-frame" style={{ "--media-ratio": media.width && media.height ? `${media.width} / ${media.height}` : undefined } as React.CSSProperties} key={media.src}><button className="gallery-open" type="button" aria-label={`Open ${media.alt} fullscreen`} onClick={() => setViewerIndex(imageIndex)}><div className="gallery-visual">{media.kind === "video" ? <video src={media.src} aria-label={media.alt} muted playsInline preload="metadata"/> : <Image src={media.src} alt={media.alt} fill draggable={false} sizes={mode === "masonry" ? "(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" : "(max-width:768px) 100vw,70vw"} preload={imageIndex === 0}/>}</div></button><figcaption>{media.alt}</figcaption></figure>);
  return <section ref={root} className={`property-gallery mode-${mode} ${transitioning ? "is-transitioning" : ""}`} aria-label="Property gallery" onPointerEnter={showControl} onPointerLeave={scheduleHide}>
    {mode === "slider" ? <SliderGallery images={images} initialSlide={activeSlide} canvasRef={canvas} onSlideChange={setActiveSlide} onOpen={setViewerIndex} onReady={() => { ScrollTrigger.refresh(); setTransitioning(false); }}/> : <div ref={canvas} className="gallery-canvas">{standardFrames}</div>}
    <div ref={control} className="gallery-mode-control" role="group" aria-label="Gallery view" onPointerEnter={showControl} onPointerLeave={scheduleHide} onFocusCapture={showControl} onBlurCapture={scheduleHide}>{modes.map((item) => <button key={item} type="button" className={mode === item ? "is-active" : ""} aria-pressed={mode === item} disabled={transitioning} onClick={() => changeMode(item)}><ModeIcon mode={item}/><span>{item}</span></button>)}</div>
    {viewerIndex !== null && <Viewer images={images} index={viewerIndex} onClose={() => setViewerIndex(null)}/>}
  </section>;
}
