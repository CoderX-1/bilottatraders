import { notFound } from "next/navigation";
import { ProductDetailPage } from "../../Site";
import { products } from "../../data";

export function generateStaticParams() {
  return products.map(product => ({ slug: product.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!products.some(product => product.slug === slug)) notFound();
  return <ProductDetailPage slug={slug} />;
}
