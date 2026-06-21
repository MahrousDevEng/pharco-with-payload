import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

// Create & Merge Class Names
export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

// Split Sentence at Specific Number
export const splitSentence = (data, numOfWords = 1) => {
  const dataArray = data?.split(" ");
  const firstPart = dataArray.slice(0, numOfWords)?.join(" ");
  const rest = data?.split(" ")?.slice(numOfWords)?.join(" ");

  return [firstPart, rest];
};
