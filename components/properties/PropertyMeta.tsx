import type { Property } from "@/types/property";
import { formatNumber } from "@/lib/formatting";
export function PropertyMeta({ property }: { property: Property }) { return <div className="property-meta">{property.bedrooms > 0 && <span>{property.bedrooms} bed</span>}{property.bathrooms > 0 && <span>{property.bathrooms} bath</span>}{property.areaSqFt > 0 && <span>{formatNumber(property.areaSqFt)} sq ft</span>}<span>{property.propertyType}</span></div>; }
