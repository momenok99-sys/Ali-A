import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { properties, getProperty, getPropertyCover } from "@/data/properties";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { PropertyMeta } from "@/components/properties/PropertyMeta";
import { MortgageCalculator } from "@/components/properties/MortgageCalculator";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { company } from "@/data/company";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";

export function generateStaticParams() { return properties.map((property) => ({ slug: property.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const property = getProperty((await params).slug);
  if (!property) return {};
  return { title: property.title, description: `${property.title}, ${property.location}. ${property.priceLabel}. Contact Ali & Associates for verified availability and particulars.`, alternates: { canonical: `/properties/${property.slug}` } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const property = getProperty((await params).slug);
  if (!property) notFound();
  const schema = { "@context": "https://schema.org", "@type": "Residence", name: property.title, description: property.description, address: property.location, url: `https://www.aliandassociates.ae/properties/${property.slug}` };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="detail-hero page-grid"><div><span className="eyebrow">For sale in {property.community}</span><h1>{property.title}</h1></div><div><p>{property.priceLabel}</p><PropertyMeta property={property}/></div></section>
    <section className="property-cover"><ParallaxMedia priority media={getPropertyCover(property)}/></section>
    <PropertyGallery images={property.images}/>
    <section className="detail-info page-grid"><div className="section-kicker"><span>Residence details</span></div><h2>{property.description}</h2><div className="facts"><div><span>Price</span><strong>{property.priceLabel}</strong></div>{property.bedrooms > 0 && <div><span>Bedrooms</span><strong>{property.bedrooms}</strong></div>}{property.bathrooms > 0 && <div><span>Bathrooms</span><strong>{property.bathrooms}</strong></div>}{property.areaSqFt > 0 && <div><span>Area</span><strong>{property.areaSqFt.toLocaleString()} sq ft</strong></div>}<div><span>Property type</span><strong>{property.propertyType}</strong></div><div><span>Location</span><strong>{property.location}</strong></div></div><p className="source-note">Property information last checked {property.lastVerified}. Confirm current availability and full particulars with an advisor.</p></section>
    {property.price > 0 && <MortgageCalculator price={property.price}/>} 
    <section className="property-enquiry page-grid" id="property-form"><div><span className="eyebrow">Private enquiry</span><h2>Discuss this<br/>residence.</h2><div className="direct-actions"><a href={company.whatsapp}><span>WhatsApp</span><ArrowUpRight /></a><a href={`tel:${company.phone}`}><span>Call</span><ArrowUpRight /></a></div></div><EnquiryForm property={property.title}/></section>
    <div className="mobile-sticky"><a href={company.whatsapp}>WhatsApp</a><a href="#property-form">Enquire</a></div>
  </>;
}
