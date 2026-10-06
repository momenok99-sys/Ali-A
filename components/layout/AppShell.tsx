import { Header } from "./Header";
import { Footer } from "./Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
export function AppShell({ children }: { children: React.ReactNode }) { return <><SmoothScroll/><Header /><main>{children}</main><Footer /></>; }
