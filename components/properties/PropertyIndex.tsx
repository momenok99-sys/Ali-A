"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getPropertyCover, properties } from "@/data/properties";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { PropertyMeta } from "./PropertyMeta";
import { track } from "@/lib/analytics";

export function PropertyIndex({initial={}}:{initial?:{purpose?:string;location?:string;type?:string;beds?:string}}) {
  const initialized=useRef(false);
  const [purpose,setPurpose]=useState(initial.purpose||"all"); const [area,setArea]=useState(initial.location||"All"); const [type,setType]=useState(initial.type||"All"); const [beds,setBeds]=useState(initial.beds||"Any");
  const areas=["All",...Array.from(new Set(properties.map(p=>p.community)))];
  const types=["All",...Array.from(new Set(properties.map(p=>p.propertyType)))];
  useEffect(()=>{if(!initialized.current){initialized.current=true;return}const q=new URLSearchParams();if(purpose!=="all")q.set("purpose",purpose);if(area!=="All")q.set("location",area);if(type!=="All")q.set("type",type);if(beds!=="Any")q.set("beds",beds);window.history.replaceState(null,"",q.size?`?${q}`:window.location.pathname)},[purpose,area,type,beds]);
  const filtered=useMemo(()=>properties.filter(p=>(purpose==="all"||p.purpose===purpose)&&(area==="All"||p.community===area)&&(type==="All"||p.propertyType===type)&&(beds==="Any"||p.bedrooms>=Number(beds))),[purpose,area,type,beds]);
  return <><section className="index-hero page-grid"><div><h1>Properties</h1></div><p>Selected opportunities, presented with the essential information first.</p></section>
  <section className="filters page-grid" aria-label="Property filters"><label>Purpose<select value={purpose} onChange={e=>setPurpose(e.target.value)}><option value="all">Buy &amp; rent</option><option value="sale">Buy</option><option value="rent">Rent</option></select></label><label>Area<select value={area} onChange={e=>{setArea(e.target.value);track("filter_applied",{area:e.target.value})}}>{areas.map(a=><option key={a}>{a}</option>)}</select></label><label>Type<select value={type} onChange={e=>setType(e.target.value)}>{types.map(item=><option key={item}>{item}</option>)}</select></label><label>Bedrooms<select value={beds} onChange={e=>{setBeds(e.target.value);track("filter_applied",{bedrooms:e.target.value})}}><option>Any</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select></label><span>{filtered.length} residences</span></section>
  <section className="property-feed page-grid">{filtered.length ? filtered.map((p,i)=><article className={`feed-item feed-${i%3}`} key={p.id}><Link href={`/properties/${p.slug}`} onClick={()=>track("property_view",{slug:p.slug})}><ParallaxMedia media={getPropertyCover(p)}/><div className="feed-info"><span>{p.community}</span><h2>{p.title}</h2><p>{p.priceLabel}</p><PropertyMeta property={p}/></div></Link></article>) : <div className="empty-state"><h2>No properties match<br/>your current search.</h2><button onClick={()=>{setPurpose("all");setArea("All");setType("All");setBeds("Any")}}>Clear filters →</button></div>}</section></>;
}
