import Link from "next/link";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductHero } from "@/components/products/ProductHero";

interface ProductListViewProps {
  category?: string;
}

const getProducts = unstable_cache(
  async (category?: string) =>
    prisma.product.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: "desc" },
    }),
  ["products"],
  { revalidate: 60 }
);

const getCategoryCounts = unstable_cache(
  async () =>
    prisma.product.groupBy({
      by: ["category"],
      _count: { id: true },
      where: { category: { not: null } },
    }),
  ["category-counts"],
  { revalidate: 60 }
);

export default async function ProductListView({ category }: ProductListViewProps) {
  const [products, categoryCounts] = await Promise.all([
    getProducts(category),
    getCategoryCounts(),
  ]);

  const categoryList = categoryCounts
    .map((c) => c.category)
    .filter(Boolean) as string[];

  const totalCount = categoryCounts.reduce((sum, c) => sum + c._count.id, 0);

  const countOf = (c: string) =>
    categoryCounts.find((cc) => cc.category === c)?._count.id ?? 0;
  const heroImage = products[0]?.imageUrl ?? null;

  return (
    <>
      {/* 첫 진입(필터 없음)일 때만 히어로 노출 */}
      {!category && <ProductHero imageUrl={heroImage} pieceCount={totalCount} />}

      {/* 섹션 헤더 */}
      <div className="flex items-end justify-between mb-12 pb-6 border-b border-line">
        <div>
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted">
            {category ? `Filtered · ${products.length} pieces` : `New arrivals · ${totalCount} pieces`}
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-none tracking-tight mt-3 font-normal">
            {category ? (
              <>
                <em className="italic text-ink-soft font-light">{category}</em>
              </>
            ) : (
              <>
                This season&apos;s <em className="italic text-ink-soft font-light">edit.</em>
              </>
            )}
          </h2>
        </div>
        <div className="hidden md:flex gap-7 text-[12px] tracking-[0.14em] uppercase text-muted">
          <span>Sort · Newest</span>
          <Link href="/products" className="text-ink border-b border-ink pb-0.5">
            View all
          </Link>
        </div>
      </div>

      {/* 카테고리 칩 */}
      <div className="flex gap-2 mb-10 flex-wrap">
        <Chip href="/" label="All" count={totalCount} active={!category} />
        {categoryList.map((cat) => (
          <Chip
            key={cat}
            href={`/?category=${encodeURIComponent(cat)}`}
            label={cat}
            count={countOf(cat)}
            active={category === cat}
          />
        ))}
      </div>

      <ProductGrid products={products} />
    </>
  );
}

function Chip({
  href,
  label,
  count,
  active,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`text-[12px] tracking-[0.12em] uppercase px-4 py-2.5 rounded-full border transition-colors ${
        active
          ? "bg-ink text-bone border-ink"
          : "bg-transparent text-ink-soft border-line hover:border-ink hover:text-ink"
      }`}
    >
      {label}
      <span
        className={`font-mono text-[10px] ml-1.5 ${
          active ? "text-bone/70" : "text-muted-2"
        }`}
      >
        {String(count).padStart(2, "0")}
      </span>
    </Link>
  );
}
