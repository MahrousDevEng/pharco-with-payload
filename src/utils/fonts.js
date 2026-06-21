import localFont from "next/font/local";

export const ubuntu = localFont({
  src: [
    {
      path: "../../public/fonts/Ubuntu-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Ubuntu-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Ubuntu-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Ubuntu-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ubuntu",
});
