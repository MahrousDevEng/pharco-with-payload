import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  href: string;
  children: React.ReactNode;
  variant?: "light" | "dark";
  className?: string;
}

export default function CTALink({ href, children, variant = "light", className = "" }: Props) {
  const isLight = variant === "light";
  return (
    <Button
      asChild
      className={`rounded-full bg-transparent border-transparent px-5 group w-fit shadow-none ${
        isLight ? "text-black hover:text-black" : "text-white hover:text-white"
      } hover:bg-transparent ${className}`}
    >
      <Link href={href} className="inline-flex items-center gap-3">
        <span className="underline group-hover:no-underline transition-colors duration-300">
          {children}
        </span>
        <span
          className={`inline-flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
            isLight ? "bg-primary text-black" : "bg-white text-primary"
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </Link>
    </Button>
  );
}
