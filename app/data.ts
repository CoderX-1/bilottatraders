export type Product = {
  name: string;
  category: string;
  slug: string;
  image: string;
  description: string;
  statement: string;
  overview: string[];
  applications: string;
  related: string[];
};

export const products: Product[] = [
  {
    name: "Jet & Diesel Fuel", category: "Energy", slug: "jet-diesel-fuel", image: "/images/jet-diesel.jpg",
    description: "Essential fuels serving aviation, transport, construction and agricultural demand.",
    statement: "Essential energy for transportation and commerce.",
    overview: ["Jet and diesel fuels support aircraft and ground transportation.", "Bilotta Traders coordinates qualified commercial requirements across transport, construction and agricultural applications."],
    applications: "Air transport, ground transport, construction and agriculture",
    related: ["sugar", "urea", "rails-r50-65-hms-1"],
  },
  {
    name: "Sugar", category: "Agriculture", slug: "sugar", image: "/images/sugar.jpg",
    description: "A versatile sweetener used across food, beverage and industrial applications.",
    statement: "A versatile commodity across food and industry.",
    overview: ["Sugar is used across food and beverage manufacturing and a range of industrial applications.", "Bilotta's original product scope references granulated, powdered and liquid forms; exact product form and commercial terms are confirmed during inquiry."],
    applications: "Food and beverage, industrial processing and retail",
    related: ["urea", "jet-diesel-fuel", "aluminum"],
  },
  {
    name: "Copper Millberry Scrap", category: "Metals", slug: "copper-millberry-scrap", image: "/images/copper-scrap.jpg",
    description: "Recoverable copper wire, tubing and other copper material prepared for productive reuse.",
    statement: "Recyclable copper prepared for productive reuse.",
    overview: ["Copper millberry scrap includes recoverable copper wire, tubing and other copper materials.", "It can be processed by smelters and refiners into new copper products for electrical, construction and industrial use."],
    applications: "Electrical, construction and industrial recovery",
    related: ["copper-cathode", "aluminum", "cold-rolled-coil"],
  },
  {
    name: "Copper Cathode", category: "Metals", slug: "copper-cathode", image: "/images/copper-cathode.jpg",
    description: "Refined copper for electrical, electronic, construction and industrial applications.",
    statement: "Refined copper for modern industrial supply chains.",
    overview: ["Copper cathode is a refined form of copper produced by electrowinning.", "Its applications include electrical wiring, electronic components, construction materials and industrial equipment."],
    applications: "Electrical, electronics, construction and industry",
    related: ["copper-millberry-scrap", "aluminum", "cold-rolled-coil"],
  },
  {
    name: "Urea", category: "Agriculture", slug: "urea", image: "/images/urea.jpg",
    description: "A widely used nitrogenous fertilizer produced from ammonia and carbon dioxide.",
    statement: "An efficient nitrogen source for global agriculture.",
    overview: ["Urea is a white, odourless solid produced from ammonia and carbon dioxide and widely used as a nitrogenous fertilizer.", "Bilotta's original product scope includes granular, prilled and liquid forms; requirements are confirmed during inquiry."],
    applications: "Agriculture and crop nutrition",
    related: ["sugar", "jet-diesel-fuel", "aluminum"],
  },
  {
    name: "Aluminum", category: "Metals", slug: "aluminum", image: "/images/aluminum.jpg",
    description: "A versatile, recyclable metal used across essential industries.",
    statement: "A versatile, recyclable metal across essential industries.",
    overview: ["Aluminum is used across aerospace, automotive, construction, electrical and packaging applications.", "Bilotta's original scope includes sheet, plate, bar, tube, extrusions, castings and forgings; exact form is confirmed during inquiry."],
    applications: "Aerospace, automotive, construction, electrical and packaging",
    related: ["copper-cathode", "cold-rolled-coil", "rebar-steel"],
  },
  {
    name: "Rebar Steel", category: "Steel", slug: "rebar-steel", image: "/images/rebar.jpg",
    description: "Structural reinforcement steel for concrete construction and infrastructure.",
    statement: "Structural reinforcement for concrete and infrastructure.",
    overview: ["Rebar steel reinforces concrete and is designed to carry tension and compression forces.", "Its applications include foundations, beams, columns, bridges, roads and other infrastructure."],
    applications: "Construction, manufacturing and infrastructure",
    related: ["cold-rolled-coil", "rails-r50-65-hms-1", "aluminum"],
  },
  {
    name: "Cold Rolled Coil", category: "Steel", slug: "cold-rolled-coil", image: "/images/cold-rolled-coil.jpg",
    description: "Smooth, flat steel coil used across demanding manufacturing applications.",
    statement: "Precision-finished steel for demanding manufacturing.",
    overview: ["Cold rolled coil is steel processed through cold rolling to produce a smooth, flat sheet with high tensile strength.", "It is used in automotive, construction, electronics and packaging applications."],
    applications: "Automotive, construction, electronics and packaging",
    related: ["rebar-steel", "aluminum", "rails-r50-65-hms-1"],
  },
  {
    name: "Rails R50-65 / HMS 1", category: "Steel", slug: "rails-r50-65-hms-1", image: "/images/rails.jpg",
    description: "Used rail and heavy steel products for transport, construction and industrial reuse.",
    statement: "Rail and heavy steel for transport and industrial reuse.",
    overview: ["Used rail steel can be reused for rail repair, new track requirements and reinforced structural applications.", "Bilotta's original product scope identifies rail, construction and mining uses; exact dimensions and grades are confirmed during inquiry."],
    applications: "Rail, construction and mining",
    related: ["rebar-steel", "cold-rolled-coil", "jet-diesel-fuel"],
  },
];

export const processSteps = [
  { title: "ICPO / LOI & FCO", description: "End Buyer issues official ICPO / LOI; Seller issues Official FCO to the end buyer." },
  { title: "Buyer Documentation", description: "Buyer counter-signs and seals the FCO with a passport copy and original Company Registration Certificate." },
  { title: "SPA Draft", description: "Seller prepares the SPA draft for the Buyer’s final review, signature and seal." },
  { title: "Seller Counter-Signature", description: "The SPA is counter-signed by the Seller." },
  { title: "Commercial Invoice", description: "Seller issues the Official Commercial Invoice." },
  { title: "MT705 Pre-Advice", description: "Buyer issues MT705 Pre-Advice, or proceeds directly with MT700 and moves to the shipment stage." },
  { title: "Inspection & POP", description: "Seller grants inspection and full POP exchange, including SGS documentation." },
  { title: "MT700", description: "Buyer issues MT700." },
  { title: "Performance Bond Guarantee", description: "Seller issues PBG of 20% against the Buyer’s LC." },
  { title: "Shipment", description: "Seller starts shipment delivery ten working days after full MT700 confirmation by the Seller’s bank." },
];

export const leadership = [
  { name: "Joey Bilotta", role: "CEO & President", email: "joey@bilottatraders.com" },
  { name: "Nemanja “Stef” Zoric", role: "Vice-President", email: "zoric@bilottatraders.com" },
  { name: "Dave Milne", role: "General Manager", email: "dave@bilottatraders.com" },
];
