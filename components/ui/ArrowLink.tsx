import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";

export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <Link className={`arrow-link ${className}`} href={href}><span>{children}</span><ArrowUpRight /></Link>;
}
