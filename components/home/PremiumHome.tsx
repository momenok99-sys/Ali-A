"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BedDouble, Building2, ChevronRight, MapPin, Ruler, Search } from "lucide-react";
import { getPropertyCover, properties } from "@/data/properties";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { SiteIntro } from "./SiteIntro";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  ["Buying", "A disciplined search shaped around your priorities, with context before pressure."],
  ["Selling", "Positioning, presentation and qualified conversations designed around the property."],
  ["Leasing", "Clear representation for landlords and tenants, from shortlist to handover."],
  ["Property management", "Practical oversight and one accountable point of contact after the agreement."],
  ["Investment advisory", "Opportunity review grounded in location, product, timing and your appetite for risk."],
] as const;

export function PremiumHome() {
  const root = useRef<HTMLDivElement>(null);
  const heroVideo = useRef<HTMLVideoElement>(null);
  const [service, setService] = useState(0);
  const featured = properties.slice(0, 4);
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const introSeen = sessionStorage.getItem("ali_intro_seen");
    const introDelay = introSeen === "1" || introSeen === "true" ? .15 : 4.18;
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((node) => gsap.from(node, { y: 42, opacity: 0, duration: 1.15, ease: "power3.out", scrollTrigger: { trigger: node, start: "top 88%", once: true } }));
    gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((node) => gsap.fromTo(node, { yPercent: -4, scale: 1.045 }, { yPercent: 4, scale: 1.01, ease: "none", scrollTrigger: { trigger: node.parentElement, start: "top bottom", end: "bottom top", scrub: .65 } }));
    gsap.fromTo(heroVideo.current, { scale: 1.025, yPercent: 0 }, { scale: 1.005, yPercent: 2.5, ease: "none", scrollTrigger: { trigger: ".studio-hero", start: "top top", end: "bottom top", scrub: .6 } });
    gsap.to(".studio-hero-copy", { yPercent: 3, ease: "none", scrollTrigger: { trigger: ".studio-hero", start: "top top", end: "bottom top", scrub: .6 } });
    gsap.fromTo(".studio-hero-copy > *", { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: .72, stagger: .07, delay: introDelay, ease: "power3.out" });
    gsap.fromTo(".studio-hero-meta, .studio-hero-index", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .5, delay: introDelay + .08, ease: "power3.out" });
  }, { scope: root });
  useEffect(()=>{const video=heroVideo.current;if(!video)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting)void video.play().catch(()=>{});else video.pause()},{rootMargin:"100px",threshold:.05});observer.observe(video);return()=>observer.disconnect()},[]);
  return <div ref={root} className="studio-home">
    <SiteIntro heroVideo={heroVideo}/>
    <section className="studio-hero">
      <video ref={heroVideo} src="/videos/file.mp4" poster="/images/properties/address-jbr/cover.png" autoPlay muted loop playsInline preload="metadata" aria-label="Cinematic Dubai residential architecture" />
      <div className="studio-hero-shade" />
      <div className="studio-hero-meta"><span>Based in — Dubai, UAE</span><span>Focus — Selected Dubai Property</span><span>Advisory — Buy / Sell / Lease / Invest</span></div>
      <div className="studio-hero-copy">
        <h1>Property,<br/><em>personally</em><br/>advised.</h1>
        <p className="studio-deck">Experienced guidance for people buying, selling and investing in Dubai property.</p>
        <div className="studio-actions"><Link className="lux-button is-light" href="/properties">Explore properties <ArrowUpRight/></Link><Link className="text-link" href="/contact">Speak to an advisor <ArrowUpRight/></Link></div>
      </div>
      <p className="studio-hero-index">A&amp;A / Dubai / 2026</p>
    </section>

    <section className="studio-search" aria-labelledby="find-property">
      <div><h2 id="find-property">Start with what matters.</h2></div>
      <form action="/properties">
        <label>Looking to<select name="purpose"><option value="sale">Buy</option><option value="rent">Rent</option></select></label>
        <label>Location<select name="location"><option value="">All locations</option><option>Jumeirah Beach Residence</option><option>Palm Jumeirah</option><option>Downtown Dubai</option><option>Al Furjan</option></select></label>
        <label>Property type<select name="type"><option value="">All types</option><option>Apartment</option><option>Villa</option><option>Townhouse</option></select></label>
        <label>Bedrooms<select name="beds"><option value="">Any</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select></label>
        <button className="lux-icon-button" aria-label="Search properties"><Search/></button>
      </form>
    </section>

    <section className="studio-intro" data-reveal>
      <h2>Not a portal.<br/>Not a sales machine.<br/><em>A considered point of view.</em></h2>
      <p>Ali &amp; Associates is a boutique Dubai brokerage for clients who value context, discretion and continuity. You speak to people who understand the brief—and stay close to the decision.</p>
    </section>

    <section className="studio-properties" data-reveal>
      <header><div><h2>A focused portfolio.</h2></div><Link className="text-link dark" href="/properties">View all properties <ArrowUpRight/></Link></header>
      <div className="property-rail">
        {featured.map((property, index)=><article className="studio-property" key={property.id}>
          <Link href={`/properties/${property.slug}`} className="studio-property-image"><Image data-parallax src={getPropertyCover(property).src} alt={getPropertyCover(property).alt} fill sizes="(max-width: 720px) 88vw, 42vw"/><span>0{index+1}</span></Link>
          <div className="studio-property-info"><div><p>{property.community}</p><h3>{property.title}</h3></div><p className="studio-price">{property.priceLabel}</p></div>
          <div className="studio-property-meta"><span><BedDouble/> {property.bedrooms || "—"} beds</span><span><Ruler/> {property.areaSqFt ? `${property.areaSqFt.toLocaleString()} sq ft` : "Details on request"}</span><span><Building2/> {property.propertyType}</span></div>
        </article>)}
      </div>
    </section>

    <section className="studio-film">
      <video data-parallax src="/videos/Fairmont Residences Solara Tower.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Fairmont Residences Solara Tower"/>
      <div><h2>Good property advice begins before the viewing.</h2><p>It begins with product knowledge, market context and an honest conversation about what the decision needs to achieve.</p></div>
    </section>

    <section className="studio-services">
      <div className="services-copy"><h2>One relationship.<br/>Five ways to help.</h2><p>{services[service][1]}</p><Link className="lux-button" href="/services">Explore our services <ArrowUpRight/></Link></div>
      <div className="services-list">{services.map(([name],i)=><button key={name} className={service===i?"is-active":""} onMouseEnter={()=>setService(i)} onFocus={()=>setService(i)} onClick={()=>setService(i)}><span>0{i+1}</span><strong>{name}</strong><ChevronRight/></button>)}</div>
    </section>

    <section className="studio-founder">
      <div className="founder-image"><Image src="/images/editorial/private-residence-blue-hour.png" alt="Editorial study of contemporary residential architecture at blue hour" fill sizes="(max-width: 800px) 100vw, 50vw"/></div>
      <div className="founder-copy-v2"><h2>Dubai known<br/>from the inside.</h2><p>Syed Wajahat Ali, owner of Ali &amp; Associates, has more than a decade of experience in Dubai real estate. Raised in the city and a resident for over 37 years, he brings practical local context to every conversation.</p><Link className="text-link dark" href="/about">Our story <ArrowUpRight/></Link><small>Editorial architectural study · not a property listing</small></div>
    </section>

    <section className="studio-insights"><div><h2>Know the market<br/>before you enter it.</h2><p>Area context, buying guidance and investment notes are being prepared. Until then, ask us the question behind your search.</p><Link className="text-link dark" href="/contact">Ask a market question <ArrowUpRight/></Link></div></section>

    <section className="studio-conversion"><h2>Your next property decision<br/><em>starts with a conversation.</em></h2><nav>{[["buy","I want to buy"],["sell","I want to sell"],["rent","I want to rent"],["investment","I want investment advice"]].map(([intent,label])=><Link href={`/contact?intent=${intent}`} key={intent}><span>{label}</span><ArrowUpRight/></Link>)}</nav><p className="conversion-location"><MapPin/> Dubai, United Arab Emirates</p></section>
  </div>;
}
