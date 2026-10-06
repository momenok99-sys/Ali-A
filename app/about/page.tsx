import type { Metadata } from "next";
import { AboutNarrative } from "@/components/about/AboutNarrative";

export const metadata:Metadata={title:"About",description:"Meet Ali & Associates, a boutique Dubai real-estate brokerage built around clear advice, local knowledge and personal service."};

export default function Page(){return <AboutNarrative/>}
