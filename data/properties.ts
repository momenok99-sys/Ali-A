import type { Property } from "@/types/property";

const source = "https://www.aliandassociates.ae/properties";
const image = (src: string, alt: string) => ({ src, kind: "image" as const, alt });
const galleryHeights: Record<string, number[]> = {
  "address-jbr": [1991,2031,1987,1987,1987,1987,1991,1987,1987],
  "minati-homes-1": [1991,1991,1991,1991,1991],
  "ritz-carlton-residences": [1991,1991,1991,1991,1991,1991,1991,1991,1991,1991],
  "atlantis-the-royal-residences": [2540,1991,1991,1991,1991,1991,1991,1991,2505],
};
const gallery = (folder: string, files: string[], title: string) =>
  files.map((file, index) => ({...image(`/images/properties/${folder}/${file}`, `${title} — view ${index + 1}`),width:3840,height:galleryHeights[folder]?.[index] ?? 1991}));

const dedicatedCovers: Record<string, ReturnType<typeof image>> = {
  "address-jbr": image("/images/properties/address-jbr/cover.png", "Address Resort and Spa JBR exterior"),
  minati: image("/images/properties/minati-homes-1/cover.png", "Minati Homes 1 exterior"),
  ritz: image("/images/properties/ritz-carlton-residences/cover.png", "The Ritz-Carlton Residences exterior"),
  atlantis: image("/images/properties/atlantis-the-royal-residences/cover.png", "Atlantis — The Royal Residences exterior"),
};

export const properties: Property[] = [
  {id:"address-jbr",slug:"address-resort-and-spa-jbr",title:"Address Resort and Spa JBR",location:"Jumeirah Beach Residence, Dubai",community:"Jumeirah Beach Residence",price:7800000,priceLabel:"AED 7,800,000",bedrooms:0,bathrooms:0,areaSqFt:0,propertyType:"Apartment",purpose:"sale",featured:true,description:"A branded residence opportunity at Address Resort and Spa JBR. Contact the advisory team for current configuration, availability and verified property particulars.",images:gallery("address-jbr",["01.avif","02.avif","03.avif","04.avif","05.avif","06.avif","07.avif","08.avif","09.avif"],"Address Resort and Spa JBR"),source,lastVerified:"2026-10-03"},
  {id:"minati",slug:"minati-homes-1",title:"Minati Homes 1",location:"Al Furjan, Dubai",community:"Al Furjan",price:0,priceLabel:"Price on request",bedrooms:0,bathrooms:0,areaSqFt:0,propertyType:"Apartment",purpose:"sale",featured:true,description:"A residential opportunity at Minati Homes 1. Contact the advisory team for current pricing, availability and verified property particulars.",images:gallery("minati-homes-1",["01.avif","02.avif","03.avif","04.avif","05.avif"],"Minati Homes 1"),source,lastVerified:"2026-10-03"},
  {id:"ritz",slug:"ritz-carlton-residences",title:"The Ritz-Carlton Residences",location:"Dubai, United Arab Emirates",community:"Dubai",price:11241000,priceLabel:"AED 11,241,000",bedrooms:0,bathrooms:0,areaSqFt:0,propertyType:"Apartment",purpose:"sale",featured:true,description:"A residence within The Ritz-Carlton Residences. Contact the advisory team for current configuration, availability and complete verified particulars.",images:gallery("ritz-carlton-residences",["01.avif","02.avif","03.avif","04.avif","05.avif","06.avif","07.avif","08.avif","09.avif","10.avif"],"The Ritz-Carlton Residences"),source,lastVerified:"2026-10-03"},
  {id:"atlantis",slug:"atlantis-the-royal-residences",title:"Atlantis — The Royal Residences",location:"Palm Jumeirah, Dubai",community:"Palm Jumeirah",price:0,priceLabel:"Price on request",bedrooms:0,bathrooms:0,areaSqFt:0,propertyType:"Apartment",purpose:"sale",featured:true,description:"A private residence at Atlantis The Royal on Palm Jumeirah. Contact the advisory team for current availability and verified property particulars.",images:gallery("atlantis-the-royal-residences",["01.avif","02.avif","03.avif","04.avif","05.avif","06.avif","07.avif","08.avif","09.avif"],"Atlantis — The Royal Residences"),source,lastVerified:"2026-10-03"},
  {id:"one-zabeel",slug:"one-zabeel",title:"One Za’abeel",location:"Za’abeel, Dubai",community:"Za’abeel",price:0,priceLabel:"Price on request",bedrooms:0,bathrooms:0,areaSqFt:0,propertyType:"Apartment",purpose:"sale",description:"A residence at One Za’abeel. Contact the advisory team for current availability, configuration and verified particulars.",images:[image("/images/properties/one-zabeel.jpg","One Za’abeel")],source,lastVerified:"2026-10-03"},
  {id:"tilal",slug:"tilal-al-ghaf",title:"Tilal Al Ghaf",location:"Tilal Al Ghaf, Dubai",community:"Tilal Al Ghaf",price:0,priceLabel:"Price on request",bedrooms:0,bathrooms:0,areaSqFt:0,propertyType:"Villa",purpose:"sale",description:"A villa opportunity within Tilal Al Ghaf. Contact the advisory team for current availability and verified property particulars.",images:[image("/images/properties/tilal-al-ghaf.jpg","Tilal Al Ghaf")],source,lastVerified:"2026-10-03"},
  {id:"bulgari",slug:"bulgari-lighthouse",title:"Bulgari Lighthouse by Meraas",location:"Jumeira Bay Island, Dubai",community:"Jumeira Bay Island",price:0,priceLabel:"Price on request",bedrooms:0,bathrooms:0,areaSqFt:0,propertyType:"Apartment",purpose:"sale",description:"A residence at Bulgari Lighthouse by Meraas. Contact the advisory team for availability and verified property particulars.",images:[image("/images/properties/bulgari-lighthouse.jpg","Bulgari Lighthouse by Meraas")],source,lastVerified:"2026-10-03"},
  {id:"orla",slug:"orla-by-omniyat",title:"Orla by Omniyat",location:"Palm Jumeirah, Dubai",community:"Palm Jumeirah",price:0,priceLabel:"Price on request",bedrooms:0,bathrooms:0,areaSqFt:0,propertyType:"Apartment",purpose:"sale",description:"A residence at Orla by Omniyat on Palm Jumeirah. Contact the advisory team for availability and verified property particulars.",images:[image("/images/properties/orla.jpg","Orla by Omniyat")],source,lastVerified:"2026-10-03"},
];

export const getProperty = (slug: string) => properties.find((property) => property.slug === slug);
export const getPropertyCover = (property: Property) => dedicatedCovers[property.id] ?? property.images[0];
