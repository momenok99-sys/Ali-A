import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";
import "./responsive.css";
import "./mobile-fixes.css";
import "./gallery.css";
import "./home-scroll.css";
import "./redesign.css";
import "./mobile-hero.css";
import "./studio.css";
import "./about-narrative.css";
import "./footer-v2.css";
import "./arrow-system.css";
import "./display-typography.css";

const sans = localFont({ src:"../public/fonts/manrope.woff2", variable:"--font-sans", display:"swap" });
export const metadata: Metadata = { metadataBase:new URL("https://www.aliandassociates.ae"), title:{ default:"Ali & Associates | Premium Real Estate, Dubai", template:"%s | Ali & Associates" }, description:"A boutique Dubai real estate brokerage with a focused property portfolio and a selective approach.", alternates:{canonical:"/"}, icons:{icon:"/browser%20logo.jpg"}, openGraph:{title:"Ali & Associates",description:"Premium Real Estate. Select Clients.",url:"/",siteName:"Ali & Associates",locale:"en_AE",type:"website"}, robots:{index:true,follow:true} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en" className={sans.variable} data-scroll-behavior="smooth"><body suppressHydrationWarning><a className="skip-link" href="#content">Skip to content</a><AppShell><div id="content">{children}</div></AppShell></body></html>; }
