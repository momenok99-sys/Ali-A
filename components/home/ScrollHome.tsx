"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Chapter = { src:string; index:string; eyebrow:string; title:string; copy:string; align?:"left"|"right" };
const chapters: Chapter[] = [
  {src:"/videos/headervideo.mp4",index:"01",eyebrow:"Arrive differently",title:"Your entrance\nto exceptional.",copy:"A private view of Dubai's most considered residences, selected around the way you want to live."},
  {src:"/videos/Fairmont Residences Solara Tower.mp4",index:"02",eyebrow:"The address",title:"Architecture\nwith presence.",copy:"Landmark residences with enduring design, effortless access and an unmistakable place on the Dubai skyline.",align:"right"},
  {src:"/videos/villa.mp4",index:"03",eyebrow:"Private residences",title:"Space, shaped\naround you.",copy:"Rare villas and elevated homes where privacy, proportion and natural light define every room."},
  {src:"/videos/relax.mp4",index:"04",eyebrow:"A life well placed",title:"Beyond the\nresidence.",copy:"From quiet mornings to golden-hour evenings, discover a lifestyle that feels considered at every turn.",align:"right"},
  {src:"/videos/event.mp4",index:"05",eyebrow:"The city is yours",title:"Dubai, at\nyour pace.",copy:"A city of momentum and possibility, with the right home at the centre of it all."},
];

function ScrollFilm({chapter,hero=false}:{chapter:Chapter;hero?:boolean}){
  const section=useRef<HTMLElement>(null); const video=useRef<HTMLVideoElement>(null); const progress=useRef<HTMLElement>(null);
  useGSAP(()=>{
    const el=video.current, root=section.current; if(!el||!root)return;
    el.pause();
    const update=(value:number)=>{if(Number.isFinite(el.duration))el.currentTime=value*Math.max(0,el.duration-.05);if(progress.current)progress.current.style.transform=`scaleX(${value})`};
    const trigger=ScrollTrigger.create({trigger:root,start:"top top",end:"bottom bottom",scrub:.35,onUpdate:self=>update(self.progress)});
    const reveal=gsap.timeline({scrollTrigger:{trigger:root,start:"top 70%",end:"top 5%",scrub:.7}});
    reveal.fromTo(".film-eyebrow",{opacity:0,y:18},{opacity:1,y:0,duration:.25})
      .fromTo(".film-title-line span",{yPercent:115},{yPercent:0,duration:.65,stagger:.08,ease:"power3.out"},.08)
      .fromTo(".film-description, .film-action",{opacity:0,y:20},{opacity:1,y:0,stagger:.08,duration:.3},.45);
    const ready=()=>{update(trigger.progress);ScrollTrigger.refresh()}; el.addEventListener("loadedmetadata",ready); if(el.readyState>=1)ready();
    return()=>el.removeEventListener("loadedmetadata",ready);
  },{scope:section});
  return <section ref={section} className={`film-section ${hero?"film-hero":""}`} aria-label={chapter.eyebrow}>
    <div className="film-sticky"><video ref={video} src={chapter.src} muted playsInline preload={hero?"auto":"metadata"} aria-hidden="true"/><div className="film-overlay"/>
      <div className={`film-content ${chapter.align==="right"?"is-right":""}`}><div className="film-eyebrow"><span>{chapter.index}</span><span>{chapter.eyebrow}</span></div>
        <h1 className="film-title">{chapter.title.split("\n").map(line=><span className="film-title-line" key={line}><span>{line}</span></span>)}</h1>
        <p className="film-description">{chapter.copy}</p>{hero&&<Link className="film-action" href="/properties"><span>Explore our collection</span><ArrowUpRight /></Link>}
      </div>{hero&&<div className="hero-location">Dubai · United Arab Emirates</div>}<div className="film-scroll"><span>{hero?"Scroll to enter":chapter.index}</span><i><b ref={progress}/></i></div>
    </div></section>;
}

export function ScrollHome(){return <>{chapters.map((chapter,index)=><ScrollFilm chapter={chapter} hero={index===0} key={chapter.src}/>)}
  <section className="home-finale"><span>Private advisory · Dubai</span><h2>Find a home<br/>worth arriving at.</h2><p>Selective opportunities. Clear advice. A more personal way to buy and sell exceptional property in Dubai.</p><Link href="/contact"><span>Begin a private conversation</span><ArrowUpRight /></Link></section>
</>}
