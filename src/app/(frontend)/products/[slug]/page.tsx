import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailView from "@/features/products/detail/ProductDetailView";
import { PRODUCTS } from "@/lib/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = decodeURIComponent(slug);
  const known = PRODUCTS.some((p) => p.n.toLowerCase() === name.toLowerCase());
  if (!known) return { title: "Product not found", robots: { index: false } };
  return {
    title: `${name} · Product`,
    description: `${name} — product information from Pharco Corporation.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = decodeURIComponent(slug);
  if (!PRODUCTS.some((p) => p.n.toLowerCase() === name.toLowerCase())) notFound();
  return <ProductDetailView />;
}
