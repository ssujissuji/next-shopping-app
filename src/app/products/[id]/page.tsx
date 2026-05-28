import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { AddToCartButton } from "@/components/products/AddToCartButton";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) notFound();

  // 디자인 실습용 가상 데이터
  const discountRate = (product.name.length % 30) + 10;
  const originalPrice = Math.floor(product.price / (1 - discountRate / 100));

  // 관련 상품 (같은 카테고리)
  const related = await prisma.product.findMany({
    where: {
      AND: [{ category: product.category ?? undefined }, { id: { not: id } }],
    },
    take: 4,
  });

  return (
    <>
      {/* breadcrumb */}
      <nav className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-8">
        <Link href="/" className="hover:text-ink">
          Shop
        </Link>{" "}
        /{" "}
        {product.category && (
          <>
            <Link
              href={`/?category=${encodeURIComponent(product.category)}`}
              className="hover:text-ink"
            >
              {product.category}
            </Link>{" "}
            /{" "}
          </>
        )}
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* 이미지 */}
        <div className="grid grid-cols-[80px_1fr] gap-4">
          <div className="flex flex-col gap-2.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`aspect-[4/5] bg-bone-2 overflow-hidden cursor-pointer border ${
                  i === 0 ? "border-ink" : "border-transparent"
                }`}
              >
                {product.imageUrl && (
                  <Image
                    src={product.imageUrl}
                    alt=""
                    width={80}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="relative aspect-[4/5] bg-bone-2 overflow-hidden">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted">
                이미지 없음
              </div>
            )}
            <span className="absolute top-5 left-5 bg-ink text-bone px-2.5 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase">
              Look · FW26
            </span>
          </div>
        </div>

        {/* 정보 */}
        <div className="pt-2">
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted">
            {product.category ?? "Collection"} · Style #{product.id.slice(0, 6).toUpperCase()}
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-none tracking-tight mt-3.5 font-normal">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 text-xs text-muted mt-2 mb-7">
            <span className="text-ink tracking-[2px]">★★★★★</span>
            <span>4.9</span>
            <span className="text-line">·</span>
            <span>148 reviews</span>
            <span className="text-line">·</span>
            <span>{product.stock > 0 ? "In stock" : "Sold out"}</span>
          </div>

          <div className="flex items-baseline gap-3.5 mt-7 mb-7 pb-7 border-b border-line">
            <span className="font-display text-3xl">
              {product.price.toLocaleString("ko-KR")}원
            </span>
            <span className="line-through text-muted-2 text-base">
              {originalPrice.toLocaleString("ko-KR")}원
            </span>
            <span className="font-mono text-[11px] text-rust px-2 py-1 border border-rust">
              −{discountRate}%
            </span>
          </div>

          {product.description && (
            <p className="text-ink-soft leading-relaxed text-sm max-w-[460px]">
              {product.description}
            </p>
          )}

          {/* 컬러 옵션 */}
          <div className="mt-9">
            <div className="flex justify-between items-center mb-3.5">
              <span className="text-[11px] tracking-[0.18em] uppercase text-muted">
                Color
                <b className="text-ink font-medium ml-2">Default</b>
              </span>
              <a className="font-mono text-[11px] text-muted border-b border-line cursor-pointer">
                Care guide
              </a>
            </div>
            <div className="flex gap-2.5">
              {["#d8cdb6", "#1a1a1a", "#6a4a3a", "#6e7a55"].map((c, i) => (
                <span
                  key={c}
                  className={`w-9 h-9 rounded-full border border-line cursor-pointer ${
                    i === 0 ? "outline outline-1 outline-ink outline-offset-[3px]" : ""
                  }`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>

          {/* 사이즈 옵션 */}
          <div className="mt-9">
            <div className="flex justify-between items-center mb-3.5">
              <span className="text-[11px] tracking-[0.18em] uppercase text-muted">
                Size<b className="text-ink font-medium ml-2">M</b>
              </span>
              <a className="font-mono text-[11px] text-muted border-b border-line cursor-pointer">
                Size guide ↗
              </a>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["XS", "S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  className={`min-w-[56px] py-3.5 px-3 border text-xs tracking-[0.1em] bg-bone ${
                    s === "M"
                      ? "border-ink bg-ink text-bone"
                      : "border-line hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-9">
            {product.stock > 0 ? (
              <AddToCartButton product={product} />
            ) : (
              <button
                disabled
                className="w-full py-5 bg-bone-2 text-muted text-[12px] tracking-[0.22em] uppercase border border-line cursor-not-allowed"
              >
                Sold out
              </button>
            )}
          </div>

          {/* perks */}
          <div className="mt-9 pt-7 border-t border-line grid grid-cols-3 gap-4">
            <Perk label="Delivery" value="Tomorrow" />
            <Perk label="Returns" value="Free, 30 days" />
            <Perk label="Made in" value="Seoul" />
          </div>
        </div>
      </div>

      {/* details */}
      <section className="mt-24 pt-12 border-t border-line grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16">
        <div>
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted">
            Details
          </div>
          <h3 className="font-display text-4xl leading-none tracking-tight mt-3 font-normal">
            The making.
          </h3>
        </div>
        <div className="text-ink-soft text-sm leading-[1.85]">
          <p className="m-0 mb-4">
            한 벌의 옷이 만들어지기까지의 과정. 원사 선택부터 제직, 마감까지 모두 서울 아틀리에에서 진행됩니다.
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3.5 mt-6 pt-6 border-t border-line">
            <Spec label="Composition" value="100% Cotton" />
            <Spec label="Weight" value="380g" />
            <Spec label="Care" value="Dry clean recommended" />
            <Spec label="Origin" value="Made in Seoul, Korea" />
          </div>
        </div>
      </section>

      {/* related */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="flex items-end justify-between mb-12 pb-6 border-b border-line">
            <div>
              <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted">
                Pairs well with
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-none tracking-tight mt-3 font-normal">
                Complete the <em className="italic text-ink-soft font-light">look.</em>
              </h2>
            </div>
            <Link
              href="/"
              className="text-[12px] tracking-[0.14em] uppercase text-ink border-b border-ink pb-0.5"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {related.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group block">
                <div className="aspect-[4/5] bg-bone-2 overflow-hidden">
                  {p.imageUrl && (
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted mt-3.5">
                  {p.category ?? "Collection"}
                </div>
                <h3 className="font-display text-lg font-normal mt-1.5">{p.name}</h3>
                <div className="text-[13px] mt-1.5">
                  {p.price.toLocaleString("ko-KR")}원
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function Perk({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] tracking-[0.16em] uppercase text-muted">
        {label}
      </span>
      <span className="font-display text-lg text-ink">{value}</span>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-muted">
        {label}
      </span>
      <br />
      <span className="text-ink text-[13px]">{value}</span>
    </div>
  );
}
