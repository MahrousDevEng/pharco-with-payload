"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils";

const NextImage = (props) => {
  const { src, alt, width, height, className, ...other } = props;

  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(className, {
        "grayscale blur-2xl scale-110": isLoading,
        "grayscale-0 blur-0 scale-100": !isLoading,
      })}
      onLoad={() => setIsLoading(false)}
      {...other}
    />
  );
};

export default NextImage;
