import Link from "next/link";
import { Hero } from "./Hero";
import { SelectedProperties } from "./SelectedProperties";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";

const services=[
  ["01","Buying","A focused search, honest context and clear support from first viewing to transfer."],
  ["02","Selling","Positioning, qualified buyer conversations and steady representation through the transaction."],
  ["03","Leasing","Practical guidance for landlords and tenants, with the details handled properly."],
  ["04","Property management","Continuity after the agreement: oversight, communication and day-to-day care."],
  ["05","Investment advisory","Opportunity assessment shaped around your objectives, timeframe and appetite for risk."],
];

export function HomePage(){return <>
  <Hero/>
  <section className="discovery" aria-labelledby="discovery-title"><div><span>Property discovery</span><h2 id="discovery-title">Start with what matters.</h2></div><form action="/properties"><label>Purpose<select name="purpose"><option value="sale">Buy</option><option value="rent">Rent</option></select></label><label>Location<select name="location"><option value="">Any location</option><option>Downtown Dubai</option><option>The Valley</option><option>Al Furjan</option><option>Dubai Creek Harbour</option></select></label><label>Property type<select name="type"><option value="">Any type</option><option>Apartment</option><option>Villa</option><option>Townhouse</option></select></label><label>Bedrooms<select name="beds"><option value="">Any</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select></label><button type="submit"><span>Explore properties</span><ArrowUpRight /></button></form></section>
  <section className="approach page-grid"><div className="section-kicker"><span>Private advisory</span></div><Reveal className="approach-statement"><h2>Real estate is personal.<br/><i>Our advice should be too.</i></h2></Reveal><p className="approach-copy">You deal directly with people who understand your brief—not a lead queue. The result is a more considered search, clearer conversations and continuity from first question to final signature.</p></section>
  <SelectedProperties/>
  <section className="services-editorial page-grid"><div className="section-kicker"><span>How we advise</span></div><div className="services-heading"><h2>One point of view.<br/>Five ways to help.</h2><p>Support shaped around the decision you are making—not a standard sales script.</p></div><div className="service-lines">{services.map(([n,title,copy])=><Link href="/services" key={title}><span>{n}</span><h3>{title}</h3><p>{copy}</p><ArrowUpRight /></Link>)}</div></section>
  <section className="founder-story"><ParallaxMedia media={{src:"/media/architecture-study.mp4",kind:"video",alt:"Architectural study representing Ali & Associates' Dubai property focus"}}/><div className="founder-copy"><span className="eyebrow">Founder / local perspective</span><h2>Dubai known<br/>from the inside.</h2><p>Syed Wajahat Ali, owner of Ali &amp; Associates, has more than a decade of experience in Dubai real estate. Raised in the city and a resident for over 37 years, he advises investors and end-users with practical local context.</p><ArrowLink href="/about">Meet Ali &amp; Associates</ArrowLink></div></section>
  <section className="insight-tease page-grid"><span className="eyebrow">Market intelligence</span><div><h2>Know the market<br/>before you enter it.</h2><p>Area context, buying guidance and investment notes are being prepared. Until then, speak directly with an advisor about the questions behind your search.</p><ArrowLink href="/contact">Ask a market question</ArrowLink></div></section>
  <section className="intent-panel"><span className="eyebrow">Your next move</span><h2>Your next property decision<br/><i>starts with a conversation.</i></h2><nav aria-label="Contact by intent"><Link href="/contact?intent=buy"><span>I want to buy</span><ArrowUpRight /></Link><Link href="/sell"><span>I want to sell</span><ArrowUpRight /></Link><Link href="/contact?intent=rent"><span>I want to rent</span><ArrowUpRight /></Link><Link href="/contact?intent=investment"><span>I want investment advice</span><ArrowUpRight /></Link></nav></section>
</>}
