import { pageMeta } from "@/lib/seo";
import ProductsOverviewView from "@/features/products/overview/ProductsOverviewView";

export const metadata = pageMeta({
  title: "Products Overview",
  description: "Explore Pharco's portfolio of branded generics across antimicrobial, cardiometabolic, respiratory, CNS, and more therapeutic areas.",
})

export default function ProductsOverviewPage() {
  return <ProductsOverviewView />;
}
