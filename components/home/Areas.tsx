"use client";
import { useState } from "react";
const areas = [
  { name:"Downtown Dubai", copy:"A focused view of apartments at the city’s architectural centre.", media:"/media/dubai-cityscape.mp4" },
  { name:"Palm Jumeirah", copy:"Selected coastal residences considered with discretion and clarity.", media:"/media/ocean-study.mp4" },
];
export function Areas() { const [active,setActive]=useState(0); return <section className="areas"><div className="areas-visual">{areas.map((a,i)=><video key={a.name} className={active===i?"is-active":""} src={a.media} autoPlay muted loop playsInline preload="metadata" aria-label={`${a.name} art-directed study`} />)}</div><div className="areas-content"><div className="section-kicker"><span>Areas of focus</span></div><div className="area-list">{areas.map((a,i)=><button key={a.name} onMouseEnter={()=>setActive(i)} onFocus={()=>setActive(i)} onClick={()=>setActive(i)}><strong>{a.name}</strong><em>{a.copy}</em></button>)}</div></div></section>; }
