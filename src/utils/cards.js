export const cardsData = [
  {
    id: 1,
    title: "Pharco Pharmaceuticals",
    description: "Leading pharmaceutical company in Egypt",
    image: "/images/Companies/4.jpg",
    link: "/",
  },
  {
    id: 2,
    title: "European Egyptian Pharmaceuticals",
    description: "International pharmaceutical solutions",
    image: "/images/Companies/2.jpg",
    link: "/",
  },
  {
    id: 3,
    title: "Pharco B International",
    description: "Global healthcare provider",
    image: "/images/Companies/3.jpg",
    link: "/",
  },
  {
    id: 4,
    title: "Amriya Pharmaceuticals",
    description: "Quality pharmaceutical manufacturing",

    image: "/images/Companies/1.jpg",
    link: "/",
  },
  {
    id: 5,
    title: "Techno Pharmaceuticals",
    description: "Advanced pharmaceutical technology",
    image: "/images/Companies/6.jpg",
    link: "/",
  },
  {
    id: 6,
    title: "Safe Pharma",
    description: "Safe and reliable healthcare solutions",
    image: "/images/Companies/5.jpg",
    link: "/",
  },
];
const imageByIndex = (index) => {
  const cards = cardsData.map((item) => item.image);

  return cards[index % cards.length];
};
// const imageByIndex = (index) => cards[index % cards.length];
export default imageByIndex;
