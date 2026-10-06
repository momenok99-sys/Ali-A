import type { Metadata } from "next";
import { PropertyIndex } from "@/components/properties/PropertyIndex";
export const metadata: Metadata={title:"Properties",description:"A considered portfolio of properties for sale in Dubai."};
export default async function Page({searchParams}:{searchParams:Promise<{purpose?:string;location?:string;type?:string;beds?:string}>}){return <PropertyIndex initial={await searchParams}/>}
