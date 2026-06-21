/**
 * Curated, verified online imagery (Unsplash CDN) used to make the inner pages
 * image-led and editorial. Each value is a base CDN URL; sizing/quality params
 * are appended at render time by <EditorialImage>. Swap any value for a local
 * /images/... asset later without touching the pages.
 */
export const IMG = {
  // Science / research / laboratory
  lab: "https://images.unsplash.com/photo-1576765608689-c0e8f69a46b2",
  labGlass: "https://images.unsplash.com/photo-1617686473830-ba445b0b83ab",
  microscope: "https://images.unsplash.com/photo-1582719471384-894fbb16e074",
  scientist: "https://images.unsplash.com/photo-1581091007718-0c50d599bfd0",
  research: "https://images.unsplash.com/photo-1630959305606-3123a081dada",
  pipette: "https://images.unsplash.com/photo-1639772823849-6efbd173043c",
  chemistry: "https://images.unsplash.com/photo-1582560486643-d51a9722b92d",
  dna: "https://images.unsplash.com/photo-1669707041081-dd4d51943041",

  // Manufacturing / production / facility
  factory: "https://images.unsplash.com/photo-1717386255773-1e3037c81788",
  productionLine: "https://images.unsplash.com/photo-1602845713136-4407964169a4",
  plant: "https://images.unsplash.com/photo-1513828646384-e4d8ec30d2bb",
  machinery: "https://images.unsplash.com/photo-1621954938124-02e637ba3584",
  packaging: "https://images.unsplash.com/photo-1581159186721-b68b78da4ec9",
  warehouse: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",

  // Medicine / pills / pharmacy
  pills: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  capsules: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2",
  blister: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926",
  tablets: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de",
  pharmacy: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",

  // Healthcare / doctors / patients
  doctor: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7",
  care: "https://images.unsplash.com/photo-1638202993928-7267aad84c31",
  clinic: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
  patient: "https://images.unsplash.com/photo-1666887360388-93e684b6474a",

  // People / team / leadership / careers
  team: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
  meeting: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
  office: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  collaborate: "https://images.unsplash.com/photo-1573164574511-73c773193279",
  handshake: "https://images.unsplash.com/photo-1551135049-8a33b5883817",
  leader: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",

  // Global / world / logistics
  world: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
  globe: "https://images.unsplash.com/photo-1606964212858-c215029db704",
  logistics: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738",
  shipping: "https://images.unsplash.com/photo-1590496793929-36417d3117de",
  network: "https://images.unsplash.com/photo-1593824854968-7833add41c16",
} as const;

export type ImgKey = keyof typeof IMG;
