import ProductListView from "@/components/products/ProductListView";

interface HomeProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { category } = await searchParams;
  return <ProductListView category={category} />;
}
