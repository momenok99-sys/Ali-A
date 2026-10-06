import type { MetadataRoute } from "next";
import { properties } from "@/data/properties";
export default function sitemap():MetadataRoute.Sitemap{const base="https://www.aliandassociates.ae";return [...["","/properties","/buy","/rent","/sell","/services","/about","/contact"].map(url=>({url:base+url,lastModified:new Date(),changeFrequency:"monthly" as const,priority:url===""?1:.8})),...properties.map(p=>({url:`${base}/properties/${p.slug}`,lastModified:new Date(p.lastVerified),changeFrequency:"weekly" as const,priority:.7}))]}
