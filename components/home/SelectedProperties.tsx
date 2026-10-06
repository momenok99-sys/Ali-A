"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getPropertyCover, properties } from "@/data/properties";
import { PropertyMeta } from "@/components/properties/PropertyMeta";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function SelectedProperties() {
  const items = properties.filter(p => p.featured).slice(0, 3); const root = useRef<HTMLElement>(null); const [active, setActive] = useState(0);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(".selected-step");
      ScrollTrigger.create({ trigger: root.current, start: "top top", end: `+=${panels.length * 80}%`, pin: true, scrub: true, onUpdate: self => setActive(Math.min(panels.length - 1, Math.floor(self.progress * panels.length))) });
    });
    return () => mm.revert();
  }, { scope: root });
  return <section ref={root} className="selected-section">
    <div className="section-kicker"><span>Selected properties</span></div>
    <div className="selected-stage">
      <div className="selected-visuals">{items.map((p, i) => {const media=getPropertyCover(p);return <div key={p.id} className={`selected-media ${i === active ? "is-active" : ""}`}><Image src={media.src} alt={media.alt} fill sizes="(max-width: 899px) 100vw, 58vw" preload={i === 0}/></div>})}</div>
      <div className="selected-copy">{items.map((p,i) => <article className={`selected-step ${i === active ? "is-active" : ""}`} key={p.id}><span>{p.community}</span><h2>{p.title}</h2><p className="price">{p.priceLabel}</p><PropertyMeta property={p}/><Link href={`/properties/${p.slug}`} className="arrow-link"><span>View residence</span><ArrowUpRight /></Link></article>)}</div>
    </div>
  </section>;
}
