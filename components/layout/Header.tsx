"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/Logo.webp";
import { useEffect, useRef, useState } from "react";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef<string | null>(null);
  useEffect(() => {
    if (open) {
      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); button.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => {
      if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return <>
    <header className="site-header">
      <Link href="/" className="brand-logo" aria-label="Ali and Associates home"><Image src={logo} alt="Ali & Associates Real Estate Brokerage" priority /></Link>
      <nav className="desktop-nav" aria-label="Primary"><Link href="/properties">Properties</Link><Link href="/buy">Buy</Link><Link href="/rent">Rent</Link><Link href="/sell">Sell</Link><Link href="/about">About</Link></nav>
      <ArrowLink href="/contact" className="header-cta">Speak to an advisor</ArrowLink>
      <button ref={button} className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu"><span>{open ? "Close" : "Menu"}</span></button>
    </header>
    <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <nav aria-label="Mobile" onClick={() => setOpen(false)}><Link href="/properties">Properties</Link><Link href="/buy">Buy</Link><Link href="/rent">Rent</Link><Link href="/sell">Sell</Link><Link href="/services">Services</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav>
      <div><a href="tel:+971506656405">+971 50 665 6405</a><a href="mailto:connect@aliandassociates.ae">connect@aliandassociates.ae</a><p>Dubai, United Arab Emirates</p></div>
    </div>
  </>;
}
