export type PropertyImage = { src: string; alt: string; kind: "video" | "image"; width?: number; height?: number };

export type Property = {
  id: string;
  slug: string;
  title: string;
  location: string;
  community: string;
  price: number;
  priceLabel: string;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  propertyType: "Apartment" | "Villa" | "Townhouse";
  purpose: "sale" | "rent";
  description: string;
  images: PropertyImage[];
  featured?: boolean;
  source: string;
  lastVerified: string;
};
