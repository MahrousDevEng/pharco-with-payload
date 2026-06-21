export const news = [
  {
    id: 1,
    title: "The Selection and Use of Essential Medicines 2025",
    description:
      "The WHO Expert Committee recommended adding ravidasvir to the core Essential Medicines List (EML) as a therapeutic alternative under the square box listing for pangenotypic direct-acting antivirals used to treat chronic Hepatitis C in adults. When combined with sofosbuvir, ravidasvir provides a pangenotypic, broad-spectrum antiviral option, with evidence showing effectiveness and safety comparable to other approved pangenotypic regimens.",
    image: "/images/new2.jpg",
    date: "30 Jul 2025",
  },
  {
    id: 2,
    title: "Dr. Sherine Helmy, Chairman, Pharco Corporation Live at BOMA of Africa 2024",
    description:
      "At BOMA of Africa 2024, Dr. Sherine Helmy, Chairman, Pharco Corporation, spoke about eliminating Hepatitis C in Egypt and how Pharco made effective treatments accessible and affordable for millions. He highlighted the company's commitment to developing new treatments for major diseases through advanced research and technology, aiming to make healthcare accessible worldwide, and acknowledged the Egyptian Ministry of Health for its key support in expanding impactful healthcare solutions across Africa.",
    image: "/images/Bomaofafricanews.jpg",
    date: "10 Jul 2024",
  },
  {
    id: 3,
    title:
      "Dr. Sherine Hassan Helmy Named One of Forbes Middle East's Top Healthcare Leaders 2024",
    description:
      "Pharco is leading the 'A Billion Lives Matter' initiative, aiming to test and treat 90% of Hepatitis B and C patients in Africa by 2030. Dr. Sherine Hassan Helmy, Chairman, Pharco Corporation, highlights the company's mission to create high-quality, affordable medicines for all. Once the country with the highest Hepatitis C rates, Egypt, through a national program launched in 2014 and supported by Pharco's effective, affordable antivirals, screened over 60 million people and treated more than four million by 2020.",
    image: "/images/Forbess-finallll-06.jpg",
    date: "04 May 2023",
  },
];
const imageByIndex = (index) => {
  const cards = cardsData.map((item) => item.image);

  return cards[index % cards.length];
};
// const imageByIndex = (index) => cards[index % cards.length];
export default imageByIndex;
