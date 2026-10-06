import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { company } from "@/data/company";
import logo from "@/Logo.webp";

export function Footer(){return <footer className="site-footer footer-v2">
  <svg className="footer-line" viewBox="0 0 1400 260" preserveAspectRatio="none" aria-hidden="true"><path d="M0 146H242C346 146 370 58 482 58H704C820 58 846 202 972 202H1400"/></svg>
  <div className="footer-signature"><Image src={logo} alt="Ali & Associates Real Estate Brokerage"/><p>Personal advice for property decisions in Dubai.</p></div>
  <Link className="footer-cta footer-cta-editorial" href="/contact"><span>Start a conversation</span><ArrowUpRight className="ui-arrow-up-right-editorial"/></Link>
  <div className="footer-grid">
    <div><span>Explore</span><Link href="/properties">Properties</Link><Link href="/buy">Buy</Link><Link href="/rent">Rent</Link></div>
    <div><span>Advisory</span><Link href="/sell">Sell with us</Link><Link href="/services">Services</Link><Link href="/about">About</Link></div>
    <div><span>Contact</span><a href={`tel:${company.phone}`}>{company.phoneLabel}</a><a href={`mailto:${company.email}`}>{company.email}</a><a href={company.whatsapp}>WhatsApp</a></div>
    <div><span>Dubai</span><p>{company.location}</p><a href={company.instagram}>Instagram <ArrowUpRight/></a></div>
  </div>
  <div className="footer-legal"><span>© {new Date().getFullYear()} Ali &amp; Associates Real Estate Brokerage</span><span>ORN {company.orn}</span><span>{company.positioning}</span></div>
</footer>}
