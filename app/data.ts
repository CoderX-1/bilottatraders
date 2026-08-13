export type Product = { name: string; category: string; slug: string; image: string; description: string };

export const products: Product[] = [
  { name: "Jet & Diesel Fuel", category: "Energy", slug: "jet-diesel-fuel", image: "https://images.unsplash.com/photo-1513828646384-e4d8ec30d2bb?auto=format&fit=crop&w=1400&q=85", description: "Essential fuels serving aviation, transport and industrial demand." },
  { name: "Sugar", category: "Agriculture", slug: "sugar", image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=1200&q=85", description: "A globally traded agricultural commodity used across food and industry." },
  { name: "Copper Millberry Scrap", category: "Metals", slug: "copper-millberry-scrap", image: "https://images.unsplash.com/photo-1618090584176-7132b9911657?auto=format&fit=crop&w=1200&q=85", description: "High-value copper scrap prepared for recovery and reuse." },
  { name: "Copper Cathode", category: "Metals", slug: "copper-cathode", image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1400&q=85", description: "Refined, high-purity copper for electrical and industrial applications." },
  { name: "Urea", category: "Agriculture", slug: "urea", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=85", description: "A widely used nitrogenous fertilizer produced from ammonia and carbon dioxide." },
  { name: "Aluminum", category: "Metals", slug: "aluminum", image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=1200&q=85", description: "A versatile industrial metal valued for strength, weight and recyclability." },
  { name: "Rebar Steel", category: "Steel", slug: "rebar-steel", image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&w=1200&q=85", description: "High-strength reinforcement steel for concrete construction." },
  { name: "Cold Rolled Coil", category: "Steel", slug: "cold-rolled-coil", image: "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1200&q=85", description: "Precision-processed steel coil with a refined surface finish." },
  { name: "Rails R50-65 / HMS 1", category: "Steel", slug: "rails-hms", image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1400&q=85", description: "Rail and heavy melting steel products for global industrial markets." },
];

export const processSteps = [
  "End Buyer issues official ICPO / LOI; Seller issues Official FCO to the end buyer.",
  "Buyer counter-signs and seals the FCO with a passport copy and original Company Registration Certificate.",
  "Seller prepares the SPA draft for the Buyer’s final review, signature and seal.",
  "The SPA is counter-signed by the Seller.",
  "Seller issues the Official Commercial Invoice.",
  "Buyer issues MT705 Pre-Advice, or proceeds directly with MT700 and moves to the shipment stage.",
  "Seller grants inspection and full POP exchange, including SGS documentation.",
  "Buyer issues MT700.",
  "Seller issues PBG of 20% against the Buyer’s LC.",
  "Seller starts shipment delivery ten working days after full MT700 confirmation by the Seller’s bank.",
];

export const leadership = [
  { name: "Joey Bilotta", role: "CEO & President", email: "joey@bilottatraders.com" },
  { name: "Nemanja “Stef” Zoric", role: "Vice-President", email: "zoric@bilottatraders.com" },
  { name: "Dave Milne", role: "General Manager", email: "dave@bilottatraders.com" },
];
