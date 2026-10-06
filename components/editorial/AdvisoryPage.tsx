import Link from "next/link";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";

export function AdvisoryPage({eyebrow,title,intro,steps,cta="Speak to an advisor",media="/media/architecture-study.mp4"}:{eyebrow:string;title:string;intro:string;steps:{title:string;copy:string}[];cta?:string;media?:string}){return <>
  <section className="advisory-hero page-grid"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></section>
  <section className="advisory-media"><ParallaxMedia priority media={{src:media,kind:"video",alt:"Architectural property film in Dubai"}}/></section>
  <section className="advisory-process page-grid"><div><h2>Clear steps.<br/>Direct advice.</h2></div><div>{steps.map((step)=><article key={step.title}><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div></section>
  <section className="page-cta"><h2>A considered decision<br/>starts with context.</h2><Link href="/contact"><span>{cta}</span><ArrowUpRight /></Link></section>
</>}
