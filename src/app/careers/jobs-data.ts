export type Job = {
  id: string;
  cat: string;
  dept: string;
  title: string;
  loc: string;
  type: string;
  lvl: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  preferred: string[];
};

export const JOBS: Job[] = [
  {
    id: "senior-formulation-scientist",
    cat: "rd",
    dept: "Research & Development",
    title: "Senior Formulation Scientist, Solid Dosage Forms",
    loc: "Alexandria",
    type: "Full-time",
    lvl: "Senior",
    overview:
      "Lead the development, optimisation, and scale-up of solid oral dosage forms (tablets, capsules, modified-release) within Pharco's R&D Centre of Excellence. You will work cross-functionally with Analytical Development, Regulatory Affairs, and Manufacturing to bring products from concept to commercial launch.",
    responsibilities: [
      "Design and execute formulation development studies for new chemical entities and line extensions",
      "Lead technology transfer activities from development to pilot and commercial scale",
      "Author and review CMC sections of regulatory dossiers (EMEA, MENA markets)",
      "Mentor junior scientists and manage project timelines within a matrix team",
      "Drive continuous improvement initiatives on existing marketed products",
    ],
    requirements: [
      "B.Sc. or M.Sc. in Pharmacy, Pharmaceutical Sciences, or Chemistry",
      "5+ years of hands-on solid dosage formulation experience in a regulated pharma environment",
      "Proficiency in DoE (Design of Experiments) and statistical software (JMP or Minitab)",
      "Strong understanding of ICH guidelines (Q8, Q9, Q10)",
      "Excellent written and spoken English",
    ],
    preferred: [
      "Ph.D. in Pharmaceutical Sciences",
      "Experience with ANDA or CTD dossier submissions",
      "Knowledge of hot-melt extrusion or spray-drying platforms",
    ],
  },
  {
    id: "production-engineer-sterile",
    cat: "mfg",
    dept: "Manufacturing",
    title: "Production Engineer, Sterile Operations",
    loc: "Alexandria",
    type: "Full-time",
    lvl: "Mid-level",
    overview:
      "Support the daily operation and continuous improvement of Pharco's sterile injectables fill-finish lines. Working within an FDA-inspected, aseptic manufacturing environment, you will troubleshoot process deviations, drive OEE improvements, and ensure full GMP compliance.",
    responsibilities: [
      "Oversee fill-finish operations for liquid vials, ampoules, and lyophilised products",
      "Investigate process deviations and implement CAPA with root-cause analysis",
      "Collaborate with QA on batch record review and release documentation",
      "Support equipment qualification (IQ/OQ/PQ) and annual product reviews",
      "Identify and lead Lean/Six Sigma improvement projects on the production floor",
    ],
    requirements: [
      "B.Sc. in Pharmaceutical Engineering, Chemical Engineering, or equivalent",
      "3+ years in sterile pharmaceutical manufacturing",
      "Hands-on experience with aseptic filling equipment and isolator technology",
      "Solid understanding of cGMP, FDA 21 CFR Part 211, and EU Annex 1",
      "Strong analytical and problem-solving skills",
    ],
    preferred: [
      "Lean Six Sigma Green Belt or higher",
      "Experience with lyophilisation cycle development",
      "Exposure to FDA or EMA inspections",
    ],
  },
  {
    id: "qa-specialist-validation",
    cat: "qc",
    dept: "Quality Assurance",
    title: "QA Specialist, Validation & Qualification",
    loc: "Alexandria",
    type: "Full-time",
    lvl: "Mid-level",
    overview:
      "Own the validation lifecycle across Pharco's manufacturing sites, from equipment qualification to cleaning and process validation. You will be a subject-matter expert relied upon by cross-functional teams to ensure products are consistently manufactured to the highest quality standards.",
    responsibilities: [
      "Author and execute Validation Master Plans, URS, IQ/OQ/PQ protocols and reports",
      "Lead cleaning validation and annual product review activities",
      "Support computer system validation (CSV) under GAMP 5 guidelines",
      "Represent QA in project teams during facility and equipment changes",
      "Maintain the site validation programme in a state of continuous inspection readiness",
    ],
    requirements: [
      "B.Sc. in Pharmacy, Chemistry, or Engineering",
      "3+ years in QA validation within a pharmaceutical manufacturing setting",
      "In-depth knowledge of ICH Q2, Q7, and relevant GMP regulations",
      "Strong technical writing skills for protocol and report authoring",
      "Attention to detail and ability to manage multiple concurrent projects",
    ],
    preferred: [
      "Experience with computerised systems validation (SAP, LIMS, MES)",
      "Working knowledge of annex 15 EU GMP guidelines",
      "Exposure to FDA warning letter remediation",
    ],
  },
  {
    id: "regulatory-affairs-manager-mena",
    cat: "reg",
    dept: "Regulatory Affairs",
    title: "Regulatory Affairs Manager, MENA",
    loc: "Cairo",
    type: "Full-time",
    lvl: "Senior",
    overview:
      "Lead the regional regulatory strategy for Pharco's product portfolio across the MENA markets. Acting as the primary interface with health authorities in Egypt, Gulf states, and Levant, you will manage a team of regulatory specialists and ensure timely product registrations and renewals.",
    responsibilities: [
      "Develop and execute regulatory strategies for new product registrations and lifecycle management",
      "Manage a team of 3 to 5 regulatory affairs specialists",
      "Liaise directly with CAPA, SFDA, MOH authorities across Egypt and GCC",
      "Review and approve regulatory submissions, labelling, and post-approval changes",
      "Monitor regulatory intelligence and advise leadership on emerging requirements",
    ],
    requirements: [
      "B.Sc. in Pharmacy; M.Sc. or advanced regulatory qualification preferred",
      "7+ years in regulatory affairs with at least 3 in a managerial role",
      "Proven track record of successful submissions to MENA health authorities",
      "Strong understanding of CTD/eCTD submission formats",
      "Fluent Arabic and English (written and spoken)",
    ],
    preferred: [
      "RAC (Regulatory Affairs Certification) from RAPS",
      "Experience with biologics or biosimilar registrations",
      "Established relationships with SFDA or CAPA reviewers",
    ],
  },
  {
    id: "brand-manager-antiviral",
    cat: "sales",
    dept: "Sales & Marketing",
    title: "Brand Manager, Antiviral Portfolio",
    loc: "Cairo",
    type: "Full-time",
    lvl: "Senior",
    overview:
      "Own the strategy and P&L for Pharco's antiviral product portfolio. You will develop annual brand plans, lead cross-functional launch activities, and work closely with the medical and sales teams to maximise brand equity and commercial performance across Egypt and export markets.",
    responsibilities: [
      "Develop and implement annual brand plans with clear KPIs and budget ownership",
      "Lead product launches and promotional campaigns end-to-end",
      "Analyse market data (IMS/IQVIA) to identify growth opportunities and competitive threats",
      "Coordinate with medical affairs on scientific communication and KOL engagement",
      "Collaborate with the regional team on export market brand alignment",
    ],
    requirements: [
      "B.Sc. in Pharmacy or Medicine; MBA is a strong plus",
      "5+ years in pharmaceutical brand management or product management",
      "Experience in antiviral, infectious disease, or specialty pharma is preferred",
      "Proficiency in market data analysis (IMS Health / IQVIA)",
      "Strong presentation and stakeholder management skills",
    ],
    preferred: [
      "MBA or professional marketing qualification",
      "Prior experience managing a portfolio of ≥ EGP 200M",
      "Network among Egyptian infectious-disease KOLs",
    ],
  },
  {
    id: "analytical-chemist-method-development",
    cat: "rd",
    dept: "Research & Development",
    title: "Analytical Chemist, Method Development",
    loc: "Alexandria",
    type: "Full-time",
    lvl: "Mid-level",
    overview:
      "Develop, validate, and transfer analytical methods for active pharmaceutical ingredients and finished dosage forms within Pharco's Analytical R&D department. You will support formulation teams and regulatory submissions with high-quality analytical data.",
    responsibilities: [
      "Develop HPLC, UPLC, and spectroscopic methods for drug substances and drug products",
      "Execute method validation studies per ICH Q2(R1)",
      "Author analytical sections of regulatory dossiers and technical reports",
      "Support technology transfer of analytical methods to QC laboratories",
      "Maintain and calibrate laboratory instruments in compliance with GLP",
    ],
    requirements: [
      "B.Sc. or M.Sc. in Analytical Chemistry, Pharmacy, or related field",
      "3+ years of analytical method development in a pharma or CRO environment",
      "Hands-on proficiency with HPLC, UV-Vis, IR, and dissolution testing equipment",
      "Understanding of ICH Q2 method validation guidelines",
      "Proficient in English technical writing",
    ],
    preferred: [
      "Experience with hyphenated techniques (LC-MS/MS)",
      "Knowledge of Empower or similar chromatography data systems",
      "Familiarity with ICH Q14 analytical procedure development guidance",
    ],
  },
  {
    id: "maintenance-engineer-hvac",
    cat: "mfg",
    dept: "Manufacturing",
    title: "Maintenance Engineer, HVAC & Utilities",
    loc: "Alexandria",
    type: "Full-time",
    lvl: "Mid-level",
    overview:
      "Ensure reliable operation of HVAC, purified water, clean steam, and compressed air systems across Pharco's GMP manufacturing facilities. You will manage preventive maintenance programmes, execute qualification activities, and respond to critical utility deviations.",
    responsibilities: [
      "Plan and execute preventive and corrective maintenance for HVAC and utility systems",
      "Monitor environmental conditions (temperature, humidity, differential pressure, particle counts)",
      "Lead HVAC re-qualification and annual reviews",
      "Manage external service contractors and spare-parts inventory",
      "Investigate utility-related deviations and contribute to CAPA implementation",
    ],
    requirements: [
      "B.Sc. in Mechanical Engineering, Electrical Engineering, or HVAC specialisation",
      "3+ years of GMP HVAC/utility maintenance in a pharmaceutical plant",
      "Knowledge of EU GMP Annex 1 environmental requirements",
      "Ability to read and interpret engineering P&IDs and technical drawings",
      "Strong communication skills in English and Arabic",
    ],
    preferred: [
      "ASHRAE or equivalent HVAC certification",
      "Experience with BMS (Building Management Systems)",
      "Knowledge of ISO 14644 cleanroom standards",
    ],
  },
  {
    id: "people-business-partner-manufacturing",
    cat: "corp",
    dept: "Corporate",
    title: "People Business Partner, Manufacturing",
    loc: "Alexandria",
    type: "Full-time",
    lvl: "Senior",
    overview:
      "Serve as a strategic HR partner to Pharco's Manufacturing leadership team (~800 employees across production, engineering, and supply chain). You will drive talent acquisition, employee engagement, and organisational development initiatives that directly support site performance goals.",
    responsibilities: [
      "Partner with manufacturing directors on workforce planning and organisational design",
      "Lead end-to-end talent acquisition for technical and leadership manufacturing roles",
      "Design and implement employee engagement and retention programmes",
      "Coach line managers on performance management and development conversations",
      "Ensure HR policies and practices comply with Egyptian labour law",
    ],
    requirements: [
      "B.Sc. in Business, HR Management, or related field; CIPD/SHRM preferred",
      "6+ years in HR business partnering, with manufacturing or industrial sector experience",
      "Strong track record in talent acquisition for technical roles",
      "Sound knowledge of Egyptian labour law and HR compliance",
      "Excellent Arabic and English communication skills",
    ],
    preferred: [
      "CIPD Level 7 or SHRM-SCP certification",
      "Experience in a pharma or heavily regulated industry",
      "Exposure to SAP SuccessFactors or similar HRIS",
    ],
  },
  {
    id: "medical-sales-representative-cairo",
    cat: "sales",
    dept: "Sales & Marketing",
    title: "Medical Sales Representative, Cairo Region",
    loc: "Cairo",
    type: "Full-time",
    lvl: "Junior",
    overview:
      "Represent Pharco's branded product portfolio to physicians, pharmacists, and key accounts across the Greater Cairo region. As the face of Pharco in your territory, you will build trusted clinical relationships and consistently achieve territory sales targets.",
    responsibilities: [
      "Call on a defined list of HCPs (physicians, specialists, pharmacists) in the Cairo region",
      "Promote assigned Pharco products with accurate, compliant scientific messaging",
      "Achieve monthly and quarterly sales and call-frequency targets",
      "Report territory activity and market intelligence through the CRM system",
      "Participate in cycle meetings, product training, and national sales conferences",
    ],
    requirements: [
      "B.Sc. in Pharmacy or Medicine",
      "0 to 3 years of medical sales experience (recent graduates welcomed)",
      "Strong interpersonal and communication skills",
      "Valid driving licence and willingness to travel within the Cairo region",
      "Good command of English",
    ],
    preferred: [
      "Prior pharma detailing experience in cardiology, anti-infectives, or CNS",
      "Existing network among Cairo specialist physicians",
      "Proficiency in Microsoft Office and CRM tools",
    ],
  },
  {
    id: "qc-microbiologist",
    cat: "qc",
    dept: "Quality Control",
    title: "QC Microbiologist",
    loc: "Alexandria",
    type: "Full-time",
    lvl: "Mid-level",
    overview:
      "Conduct routine and non-routine microbiological testing of raw materials, in-process samples, finished products, and environmental monitoring samples within Pharco's accredited QC Microbiology laboratory. You will uphold the highest standards of scientific integrity and GMP compliance.",
    responsibilities: [
      "Perform microbial limit tests, sterility tests, and environmental monitoring",
      "Investigate out-of-specification (OOS) and out-of-trend (OOT) microbiological results",
      "Maintain laboratory instruments, media, and reference cultures",
      "Author and review microbiology SOPs, test records, and certificates of analysis",
      "Support regulatory inspections and internal audits",
    ],
    requirements: [
      "B.Sc. in Microbiology, Pharmaceutical Sciences, or Biotechnology",
      "3+ years in a pharmaceutical QC microbiology laboratory",
      "Hands-on experience with sterility testing, bioburden, and LAL endotoxin testing",
      "Proficiency in ISO 11135 / USP / BP pharmacopoeial methods",
      "Accuracy, attention to detail, and strong GLP practices",
    ],
    preferred: [
      "M.Sc. in Microbiology or related discipline",
      "Experience with rapid microbiology methods (e.g. BioMérieux systems)",
      "Familiarity with ISO 17025 laboratory accreditation requirements",
    ],
  },
];
