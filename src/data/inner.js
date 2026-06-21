// Append the named exports below into pharco-23-11/src/data/index.js
// Do NOT replace the existing `timeline` export, it stays as-is for HistoryView2.

// ----- About / Leadership -----
export const founderQuote = {
  text: "Our strategies and execution are grounded in the belief that all people across the world deserve to live a healthy and fulfilling life. This conviction drives our desire to provide access to medicines that are safe, effective, and affordable.",
  highlight: "healthy and fulfilling life",
  signature: "Dr. Hassan Helmy · Founder, Pharco Corporation",
};

export const executiveLeaders = [
  {
    name: "Dr. Hassan Helmy",
    role: "Founder & President · Pharco Corporation",
    photo: "/images/Abbas-helmy.jpg",
    bio: "Dr. Hassan Helmy founded Pharco Corporation with the conviction that quality healthcare should be accessible to all. From a single pharmacy in 1957, he built Egypt's largest pharmaceutical group, a legacy spanning 13 companies, more than 8,000 employees, and a presence in over 60 countries.",
  },
  {
    name: "Dr. Sherine Helmy",
    role: "Chairman · Pharco Corporation",
    photo: null, // initials placeholder "SH"
    initials: "SH",
    bio: "Dr. Sherine Helmy leads Pharco Corporation as Chairman, overseeing the group's strategic direction across its 13 companies and 60+ markets. Under her leadership, Pharco has continued to expand internationally, deepen its R&D capabilities, and strengthen its position as a trusted partner to patients and healthcare systems worldwide.",
  },
];

export const leadershipPlaceholders = [
  { initials: "CO", name: "Chief Operating Officer", area: "Operations & Supply" },
  { initials: "CS", name: "Chief Scientific Officer", area: "R&D" },
  { initials: "CC", name: "Chief Commercial Officer", area: "Markets & Sales" },
  { initials: "CF", name: "Chief Financial Officer", area: "Finance & Strategy" },
  { initials: "CQ", name: "Chief Quality Officer", area: "Quality & Compliance" },
  { initials: "CH", name: "Chief HR Officer", area: "People & Culture" },
  { initials: "RA", name: "Head of Regulatory", area: "Regulatory Affairs" },
  { initials: "IB", name: "Head of International", area: "Global Markets" },
];

export const heritageStrip = [
  { year: 1957, label: "Glym Pharmacy, Alexandria", image: "/images/history/57.jpg" },
  { year: 1965, label: "Expansion of distribution", image: "/images/history/65.jpg" },
  { year: 1983, label: "Manufacturing era begins", image: "/images/history/83.jpg" },
  { year: 1987, label: "Pharco Group consolidates", image: "/images/history/1987.jpg" },
];

// ----- About / Our Story -----
export const keyNumbers = [
  { value: 39, suffix: "+", label: "Years", lead: "Of Pharmaceutical Leadership" },
  { value: 60, suffix: "+", label: "Countries", lead: "With Our Medicines" },
  { value: 7000, suffix: "+", label: "Employees", lead: "Driving Our Mission" },
  { value: 13, suffix: "", label: "Companies", lead: "In Pharco Group" },
  { value: 4, suffix: "M+", label: "Patients", lead: "Cured of Hepatitis C" },
  { value: 1.6, suffix: "M", label: "Packs", lead: "Manufactured Daily" },
];

export const coreValues = [
  { letter: "Q", title: "Quality Excellence", body: "We never compromise on product safety or quality. Every batch meets the standards we would expect for our own families." },
  { letter: "P", title: "Patient-Centric", body: "Patients are not a market. They are our reason. Every decision starts and ends with the patient." },
  { letter: "I", title: "Innovation", body: "We invest in science, in people, and in processes, because standing still in healthcare means falling behind." },
  { letter: "N", title: "Integrity", body: "Honesty and transparency are not policies on a wall. They are the daily standard for every Pharco employee." },
  { letter: "C", title: "Collaboration", body: "The best outcomes come from working together across departments, companies, countries, and disciplines." },
  { letter: "A", title: "Accessibility", body: "Affordable medicine is not a compromise on quality. It is the proof that quality can be scaled and shared." },
];

export const visionMissionPromise = [
  { num: "01", title: "Vision", body: "To be the leading pharmaceutical company in the region and a trusted global healthcare partner, recognised for quality, innovation, and genuine commitment to patient care." },
  { num: "02", title: "Mission", body: "At Pharco, we are saving lives. Through innovative solutions, we deliver the most affordable and effective treatments for all patients, everywhere." },
  { num: "03", title: "Promise", body: "To put patients first in every decision: from the molecules we choose, to the standards we hold, to the price points we set." },
];

// ----- About / Pharco Group -----
export const valueChain = [
  { num: 1, title: "R&D", body: "Own pipeline (Pharco Corporation) plus international collaborations with the University of Michigan, DNDi, Chemelctiva, Presidio, and SeegPharm." },
  { num: 2, title: "Manufacturing", body: "Own facilities (Pharco Pharmaceuticals) and licensed/CMO production for Doppelherz, Sandoz, GSK, SAJA, and other multinationals." },
  { num: 3, title: "Products", body: "Rx generics, OTC products, licensed Rx and OTC, APIs (PBIC), and medical/surgical products across 12 therapeutic areas." },
  { num: 4, title: "Distribution", body: "Abou Kir Trading and ZIMMO provide regional distribution and supply chain infrastructure across MENA and beyond." },
  { num: 5, title: "Customers", body: "Public sector (health ministries, government institutions) and private sector (pharmacies, clinics, hospitals, distributors)." },
];

export const groupCompanies = [
  { num: "01", category: "Manufacturing", name: "Pharco Pharmaceuticals", body: "Core pharmaceutical manufacturing. Egypt's flagship branded generics producer covering solid, liquid, semi-solid and sterile forms." },
  { num: "02", category: "Manufacturing", name: "Amriya Pharmaceuticals", body: "Manufacturing excellence across solid, liquid, and semi-solid dosage forms, including a dedicated cephalosporin programme." },
  { num: "03", category: "Export", name: "Pharco B International", body: "Export-focused pharmaceutical manufacturing and international market development. A gateway to MENA, Africa and Latin America." },
  { num: "04", category: "Manufacturing", name: "European Pharmaceuticals (EEPT)", body: "European-standard manufacturing for regional and international markets, built around EU GMP qualification." },
  { num: "05", category: "Manufacturing", name: "Techno Pharmaceuticals", body: "Specialised manufacturing across multiple therapeutic areas, with a focus on complex formulations." },
  { num: "06", category: "Manufacturing", name: "Safe Pharma", body: "Quality pharmaceutical manufacturing operating under a safety-first culture, with multi-dosage form coverage." },
  { num: "07", category: "Specialty & Biogeneric", name: "BGP, Bio Generic Pharma", body: "Biogeneric and specialty pharmaceutical development and production. Established 2022 to drive the group's complex molecule programme.", established: 2022 },
  { num: "08", category: "Distribution · Europe", name: "Pharco Impex Romania", body: "European distribution and licensing operations, opening Pharco's route to Central and Eastern European markets since 1993.", established: 1993 },
  { num: "09", category: "Distribution · MENA", name: "Abou Kir Trading", body: "Regional distribution and supply chain management, moving Pharco products from manufacturing to pharmacy across the region." },
  { num: "10", category: "GCC Partnership", name: "Batterjee Pharma (KSA)", body: "Strategic partnership in Saudi Arabia providing market access and distribution across the Gulf Cooperation Council." },
  { num: "11", category: "API · Chemicals", name: "PBIC, Pharco B International for Chemicals", body: "Active pharmaceutical ingredient (API) manufacturing. The upstream foundation that makes the group vertically integrated." },
  { num: "12", category: "Wellness", name: "Greenliving Pharma", body: "Health and wellness product development covering preventative and lifestyle-oriented healthcare for emerging consumer segments." },
  { num: "13", category: "USA · International", name: "Presidio Pharmaceuticals, Inc.", body: "US-based pharmaceutical company, part of the group's international footprint and a strategic R&D collaboration partner." },
];

// ----- About / CSR -----
export const csrPillars = [
  { title: "Health Awareness", body: "Community education on disease prevention, early diagnosis, and responsible medicine use, delivered through local clinics, schools, and public health campaigns across Egypt and our export markets." },
  { title: "Hepatitis C Initiative", body: "Pharco has played a central role in Egypt's national Hepatitis C elimination programme. More than 4 million patients have been cured using Pharco-produced antiviral medicines." },
  { title: "Environmental Responsibility", body: "Energy-efficient manufacturing upgrades, waste reduction programmes, and sustainable procurement practices across our 13-company group, reducing our footprint year over year." },
  { title: "Community Development", body: "Ongoing partnerships with NGOs and charitable organisations to support underserved communities. Educational sponsorships, health fairs, and youth employment initiatives are part of our regular CSR calendar." },
];

export const hepCStats = [
  { value: "4M+", label: "Patients cured" },
  { value: "95%+", label: "Cure rate achieved" },
  { value: "12 wks", label: "Standard treatment course" },
  { value: "Egypt", label: "National elimination programme" },
];

// ----- Therapies / Therapeutic Areas -----
export const therapeuticAreas = [
  { slug: "primary-care", title: "Primary Care", count: 53, body: "Analgesics, antipyretics, antihistamines, and essential medicines for everyday health needs." },
  { slug: "antimicrobial", title: "Antimicrobial", count: 31, body: "Broad-spectrum antibiotics, antifungals, and antivirals, including beta-lactams, cephalosporins, carbapenems, and fluoroquinolones." },
  { slug: "cardiometabolic", title: "Cardiometabolic", count: 13, body: "Medicines for cardiovascular disease, hypertension, heart failure, diabetes, and lipid management." },
  { slug: "git", title: "Gastrointestinal (GIT)", count: 28, body: "Antispasmodics, antacids, proton pump inhibitors, liver support, and digestive motility agents." },
  { slug: "respiratory", title: "Respiratory", count: 13, body: "Bronchodilators, inhalers, corticosteroids, antihistamines, and nasal preparations for respiratory conditions." },
  { slug: "oncology", title: "Oncology", count: 6, body: "Targeted therapies and chemotherapy agents across haematology and solid tumour indications." },
  { slug: "cns", title: "CNS", count: 7, body: "Antidepressants, antipsychotics, cognitive support agents, and treatments for neurological conditions." },
  { slug: "dermatology", title: "Dermatology", count: 10, body: "Topical corticosteroids, antifungals, wound care, and skin condition treatments." },
  { slug: "ophthalmology", title: "Ophthalmology", count: 11, body: "Eye drops and ophthalmic solutions for infections, glaucoma, dry eye, and post-surgical care." },
  { slug: "womens-health", title: "Women's Health (WHC)", count: 14, body: "Hormonal therapies, contraceptives, and gynaecological products for all life stages." },
  { slug: "vitamins-supplements", title: "Vitamins & Supplements", count: 29, body: "Iron, B-vitamins, omega-3, calcium, zinc, maternal health, and premium supplement ranges including Doppelherz Active." },
  { slug: "anaesthesia", title: "Anaesthesia & Narcotics", count: 2, body: "Anaesthetic and pain management agents for clinical and surgical use." },
];

export const products = [
  ...["ADOLOR","KETOTIPHARCO","ALGASON","LIDOCAINE","BROMHEXINE","MELOXICAM","BUCCAZOLE","MICOBAN","CETRAK","MICROSERC","DECLOPHEN","OPLEX","DECLOPHEN-FAST","OPLEX-N","DEPOFORT-B12","OPLEX-N PLUS","DEPOVIT","OTOCALM","DEXAMETHASONE","PARACETAMOL","DEXAPHEN","PARAGESIC","EUROCOX","PROFUSOL","FARCOCAINE","RADIAN","FARCOLIN","RECTOPLEXIL","FARCOSOLVIN","RESPIRIN","FASTEL","RINOSIN","FENAC","SEDATUSS","FLASH-ACT","SINE-UP","FLEXOFAN","TERHEXINE","FLUCALM","TORMEEL","GC-MOL","URICOL","HISTAZINE-1","URICONTROL","HOSTAPRED","URINEX","HYDRAL","XILONE","INJECTMOL","XILONE-FORTE","KETOFAN","ZACAGLONE","KETOLAC"].map(n => ({ name: n, ta: "Primary Care" })),
  ...["AMEROPEM","CLAVIMOX","AMFLUX","CLUDINETECH","AMPIFLUX","CURISAFE","AMRIZOLE","DAKTAVIRA","AZROLID","ERTAPENEM","CEFACLOR","EUROZOLE","CEFAXONE","GRATISOVIR","CEFAZONE","IMPLATINZE","CEFAZONE PLUS","LARIVEX","CEFEPIME","LEVOTAVIN","CEFIXIME","NIFUNAL","CEFORAN","SULBIN","CEFZIM","TIGEPHARCO","CIPROFAR","ULTRAMOX","CIPROFLOXACIN","ZINOL","CLARITHRO"].map(n => ({ name: n, ta: "Antimicrobial" })),
  ...["AMLODIPINE","DUVADILAN","ASPRICARLO","FARCODARONE","BISOLOCK","FARCOPRIL-PLUS","CANDEBLOCK","HYSARTAN","CANDEBLOCK-D","LINADIABET","CONTROPACE","VASONORM","DEXIGLOFOZIN"].map(n => ({ name: n, ta: "Cardiometabolic" })),
  ...["ALVERINSPASM","GASTRAZOLE","AMRASE","GLYCERIN","BILICHOL","LUBICONT","BILURON","MIOPAN","BISADYL","ORNITATE","COLOMINT","PERLOC","DIGESTIN","RANI-F","ESTOHALT","SIMETHICONE","FAWAR-COLA","SPASMO-AMRASE","FAWAR-FAWAKEH","SPASMODIGESTIN","FAWAR-FRUIT","SPASMOFEN","FAWAR-LEMON","SPASMOTALIN","FARCOTILIUM","ZINC","FAWAR-C","ZINCORHEA"].map(n => ({ name: n, ta: "GIT" })),
  ...["AEROTROPA","NORHINOSE","BUDELIZER","SPIRIVA","BUDEXAN","THEOPHYLLINE","FORBUDES","TICANASE","METROHALER","TICANASE PLUS","MONTEKAL","WINDY","NASOFLUTIN"].map(n => ({ name: n, ta: "Respiratory" })),
  ...["BORTEZOMIB","LETROZOL","DASATINIB SYNTHON","NATIRAN","LENALIDOMIDE","TAMOXIFEN"].map(n => ({ name: n, ta: "Oncology" })),
  ...["BIPERIDEN","NERVALTA","CEREBROCETAM","RAPIZAPINE","ESCITA","SHANCITA","NEOSTIGMINE"].map(n => ({ name: n, ta: "CNS" })),
  ...["BETAMETHASONE","DERMATIN","BETAPANTHEN","DEXPANTHENOL","CLINDA-SOL","FARCOCIN","CLOSOL","POLYDERM","CLOVACORT","TOPICORT"].map(n => ({ name: n, ta: "Dermatology" })),
  ...["ALFABRIMO","OPTIGUARD","DORZOLAMOL","PHARMA TEARS","EYE-CLEAR","PHARMAPRED EYEDROPS","FARCOBRASONE","PHARMASTIN","HYALOPTIC","PHENAMIDE-P","OPHTASTAT"].map(n => ({ name: n, ta: "Ophthalmology" })),
  ...["ANASTROZOLE","OVIUNHIPTA","FEMOGESAL","PROGEST","FOLICAP","TECHNORRIN","GYNOZOL","TECHNOSPIRON","MARTAVIVA","TECHNOVULA","NORGESTADIOL","TONADOGEST","NOROCARMENA","TREXZOLA"].map(n => ({ name: n, ta: "Women's Health" })),
  ...["AMRI-K","FERRO-6","BARAKA","HAEMOJET","CALMSEEF","HAEMOPOWER","C-SAFE","HEPAFORT","DECAL B12-N","NEUROVIT","DECAL-B12","NEW-GELTA","DIET-SWEET","NOVOCOBAL","DOPPELHERZ ACTIVE-IRON","OMEGA-3-SAFE","DOPPELHERZ ACTIVE-MAG-KAL","OMEGASEEF","DOPPELHERZ ACTIVE-MENO","ROSASEEF","DOPPELHERZ ACTIVE-PURE-3","ROYAL-JELLY","DOPPELHERZ ACTIVE-VITAL MATERNAL PLUS","VITAMIN A","EASY-SLIM","VITAMIN E","EURONEMIA","ZINCOSAFE","FARCOVIT-B12"].map(n => ({ name: n, ta: "Vitamins & Supplements" })),
  ...["ALAMBUPHINE","ANAHAL"].map(n => ({ name: n, ta: "Anaesthesia" })),
];

// ----- Header navigation (replace navBarItems in DesktopHeader.tsx) -----
export const navBarItems = [
  { id: 1, name: "About Pharco", url: "#about-us", target: "", subs: [
    { id: 1, name: "History", url: "/history", subs: [], target: "" },
    { id: 2, name: "Our Story", url: "/about/our-story", subs: [], target: "" },
    { id: 3, name: "Leadership", url: "/about/leadership", subs: [], target: "" },
    { id: 4, name: "Pharco Group", url: "/about/pharco-group", subs: [], target: "" },
    { id: 5, name: "Our Impact + Responsibility (CSR)", url: "/about/csr", subs: [], target: "" },
  ]},
  { id: 2, name: "Therapies & Products", url: "#therapies-products", target: "", subs: [
    { id: 1, name: "Products Overview", url: "/products", subs: [], target: "" },
    { id: 2, name: "Therapeutic Areas", url: "/products/therapeutic-areas", subs: [], target: "" },
  ]},
  { id: 3, name: "Science & Operations", url: "#science-operations", target: "", subs: [
    { id: 1, name: "Research & Development", url: "/rd", subs: [], target: "" },
    { id: 2, name: "Manufacturing", url: "/manufacturing", subs: [], target: "" },
    { id: 3, name: "Quality & Compliance", url: "/quality", subs: [], target: "" },
  ]},
  { id: 4, name: "Global Presence", url: "/global-presence", subs: [], target: "" },
  { id: 5, name: "Life at Pharco", url: "/life-at-pharco", subs: [], target: "" },
  { id: 6, name: "News & Events", url: "/news", subs: [], target: "" },
];
