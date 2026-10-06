export type AnalyticsEvent = "property_view"|"property_enquiry"|"whatsapp_click"|"phone_click"|"email_click"|"filter_applied"|"search_opened"|"search_submitted"|"area_collection_view"|"contact_form_started"|"contact_form_submitted";
export function track(event: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("ali:analytics", { detail: { event, payload } }));
}
