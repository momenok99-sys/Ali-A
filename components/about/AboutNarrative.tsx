"use client";
import Image,{type StaticImageData} from "next/image";
import Link from "next/link";
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ArrowUpRight} from "@/components/ui/ArrowUpRight";
import aliPortrait from "@/ali.png";
import aliWordsPortrait from "@/Aliwords.png";
gsap.registerPlugin(ScrollTrigger,useGSAP);

type MediaProps={src:StaticImageData|string;alt:string;className?:string;priority?:boolean;sizes:string;travel?:number;position?:string};
function ParallaxMedia({src,alt,className="",priority=false,sizes,travel=6,position="50% 50%"}:MediaProps){
 const frame=useRef<HTMLDivElement>(null),media=useRef<HTMLImageElement>(null);
 useGSAP(()=>{const mm=gsap.matchMedia();const make=(n:number)=>gsap.fromTo(media.current,{yPercent:-n,scale:1.1},{yPercent:n,scale:1.1,ease:"none",scrollTrigger:{trigger:frame.current,start:"top bottom",end:"bottom top",scrub:.8,invalidateOnRefresh:true}});mm.add("(min-width:1101px) and (prefers-reduced-motion:no-preference)",()=>make(travel));mm.add("(min-width:769px) and (max-width:1100px) and (prefers-reduced-motion:no-preference)",()=>make(travel*.65));mm.add("(max-width:768px) and (prefers-reduced-motion:no-preference)",()=>make(travel<0?-2.5:2.5));return()=>mm.revert()},{scope:frame,dependencies:[travel]});
 return <div ref={frame} className={`about-media-frame ${className}`}><Image ref={media} className="about-media-inner" src={src} alt={alt} fill sizes={sizes} priority={priority} style={{objectPosition:position}}/></div>
}
const perspectives=[
 {label:"On advice",title:"Understand first. Advise second.",body:"Property advice begins with what makes sense for the client — not simply with what is available. The objective, timeline and appetite for risk shape every recommendation."},
 {label:"On Dubai",title:"Local knowledge is lived knowledge.",body:"More than three decades in Dubai bring context to a market that is always evolving: how communities mature, where value endures and when restraint matters."},
 {label:"On relationships",title:"Clarity earns trust over time.",body:"Direct communication and a hands-on approach keep the relationship personal — through buying, selling, leasing and the decisions that follow."}
];
const principles=["Genuine inventory","Clear communication","Considered advice","Long-term relationships"];

export function AboutNarrative(){
 const root=useRef<HTMLElement>(null);
 useGSAP(()=>{const mm=gsap.matchMedia();
  mm.add("(prefers-reduced-motion:no-preference)",()=>{
   gsap.from(".about-intro-statement span",{yPercent:105,duration:1,ease:"power3.out",stagger:.08,scrollTrigger:{trigger:".about-intro",start:"top 72%",once:true}});
   gsap.utils.toArray<HTMLElement>(".about-rule").forEach(el=>gsap.from(el,{scaleX:0,transformOrigin:"left",duration:1.1,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}}));
   gsap.utils.toArray<HTMLElement>(".about-reveal").forEach(el=>gsap.from(el,{y:26,opacity:0,duration:.85,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 84%",once:true}}));
   gsap.utils.toArray<HTMLElement>("[data-count]").forEach(el=>{const s={v:0},end=Number(el.dataset.count);gsap.to(s,{v:end,duration:1.5,ease:"power2.out",onUpdate:()=>{el.textContent=`${Math.round(s.v)}+`},scrollTrigger:{trigger:el,start:"top 88%",once:true}})});
  });
  mm.add("(min-width:1101px) and (prefers-reduced-motion:no-preference)",()=>{
   gsap.to(".about-hero-support",{yPercent:18,ease:"none",scrollTrigger:{trigger:".about-hero-editorial",start:"top top",end:"bottom top",scrub:.8}});
   const items=gsap.utils.toArray<HTMLElement>(".perspective-item");items.forEach(item=>gsap.timeline({scrollTrigger:{trigger:item,start:"top 58%",end:"bottom 42%",toggleActions:"play reverse play reverse"}}).to(items,{opacity:.28,duration:.25}).to(item,{opacity:1,y:-8,duration:.35},"<"));
   ScrollTrigger.create({trigger:".perspective-layout",start:"top 110px",end:"bottom bottom-=80",pin:".perspective-visual",pinSpacing:false,invalidateOnRefresh:true});
  });
  const refresh=()=>ScrollTrigger.refresh();window.addEventListener("load",refresh,{once:true});document.fonts?.ready.then(refresh);return()=>{window.removeEventListener("load",refresh);mm.revert()}
 },{scope:root});
 return <main ref={root} className="about-editorial">
  <section className="about-hero-editorial" aria-labelledby="about-title"><div className="about-hero-title"><h1 id="about-title"><span>Selective</span><span>by design.</span></h1></div><div className="about-hero-support"><p className="about-kicker">A boutique approach to Dubai property.</p><p>Considered advice across buying, selling, leasing and property management.</p></div></section>
  <section className="about-intro"><div className="about-intro-statement" aria-label="Ali & Associates is built around a more selective approach to Dubai property."><span>Ali &amp; Associates is built </span><span>around a more selective </span><span>approach to Dubai property.</span></div><p className="about-reveal">We work closely with investors and end-users, focusing on long-term value and clarity in every transaction. The advice stays direct. The relationship stays personal.</p></section>
  <section className="about-credibility" aria-label="Founder experience"><i className="about-rule"/><div><strong data-count="10">10+</strong><span>Years in Dubai real estate</span></div><div><strong data-count="37">37+</strong><span>Years living in Dubai</span></div><div><strong>Dubai</strong><span>Market focus</span></div><i className="about-rule"/></section>
  <section className="about-founder-editorial"><ParallaxMedia src={aliPortrait} alt="Syed Wajahat Ali, owner of Ali & Associates" className="founder-color-portrait" sizes="(max-width:768px) 100vw, 52vw" priority position="50% 42%"/><div className="founder-editorial-copy"><div className="about-reveal"><p className="about-kicker">Founder</p><h2>Syed<br/>Wajahat Ali</h2></div><p className="founder-title about-reveal">Owner</p><p className="founder-biography about-reveal">Raised in the city, Wajahat brings practical knowledge of its evolving property market. His experience spans residential and commercial buying, selling and leasing, advising investors and end-users with a transparent, hands-on approach.</p></div></section>
  <section className="about-perspective"><header><p className="about-kicker">Ali&apos;s perspective</p><h2>A perspective<br/>shaped by Dubai.</h2></header><div className="perspective-layout"><div className="perspective-visual"><ParallaxMedia src={aliWordsPortrait} alt="Syed Wajahat Ali seated in an editorial portrait" className="founder-bw-portrait" sizes="(max-width:1100px) 100vw, 46vw" travel={5} position="50% 45%"/></div><div className="perspective-copy">{perspectives.map((item,i)=><article className="perspective-item" key={item.label}><div><span>{String(i+1).padStart(2,"0")}</span><span>{item.label}</span></div><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></div></section>
  <section className="about-advise"><header className="about-reveal"><p className="about-kicker">How we advise</p><h2>Clarity in every<br/>property decision.</h2></header><div className="advise-list">{principles.map(x=><div className="advise-item about-reveal" key={x}><span>{x}</span><ArrowUpRight/></div>)}</div></section>
  <section className="about-final-cta"><Link href="/contact"><span>Start a conversation</span><ArrowUpRight className="ui-arrow-up-right-editorial"/></Link></section>
 </main>
}
