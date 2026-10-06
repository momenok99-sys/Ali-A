import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { company } from "@/data/company";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
export const metadata:Metadata={title:"Private Enquiry",description:"Contact Ali & Associates Real Estate Brokerage in Dubai."};
export default function Page(){return <section className="contact-page page-grid"><div className="contact-heading"><h1>Let’s talk<br/>property.</h1><p>Tell us the property, area or outcome you have in mind. An advisor will respond with a focused next step.</p></div><div className="contact-form"><EnquiryForm/><div className="contact-details"><div><span>Call</span><a href={`tel:${company.phone}`}>{company.phoneLabel}</a></div><div><span>Email</span><a href={`mailto:${company.email}`}>{company.email}</a></div><div><span>WhatsApp</span><a href={company.whatsapp}><span>Begin a conversation</span><ArrowUpRight /></a></div><div><span>Office</span><p>{company.office}</p></div></div></div></section>}
