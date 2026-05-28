import Image from "next/image";
import Link from "next/link";

interface ProductHeroProps {
  /** 히어로 우측에 들어갈 이미지. 첫 상품 사진을 넘기면 됩니다. */
  imageUrl: string | null;
  pieceCount: number;
}

export function ProductHero({ imageUrl, pieceCount }: ProductHeroProps) {
  return (
    <section className="relative h-[620px] overflow-hidden bg-bone-2 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] h-full">
        {/* 텍스트 */}
        <div className="px-20 pt-24 pb-20 flex flex-col justify-between bg-bone">
          <div>
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
              FW 26 · Arrival 01 / 04
            </div>
            <h1 className="font-display text-[72px] md:text-[88px] leading-[0.96] tracking-[-0.02em] mt-7 text-ink font-normal">
              Quiet
              <br />
              <em className="italic text-muted-foreground font-light">essentials,</em>
              <br />
              worn slowly.
            </h1>
            <p className="mt-7 max-w-[380px] text-muted-foreground text-sm leading-relaxed">
              한 계절을 넘기지 않는 옷이 아닌, 매일 다시 입고 싶은 옷. 매일(MAEIL)의
              가을·겨울 컬렉션은 따뜻한 울과 부드러운 가죽으로 구성되었습니다.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-3.5 text-[12px] tracking-[0.2em] uppercase text-ink no-underline pb-1.5 border-b border-ink w-fit mt-9"
            >
              Explore the collection <span className="font-mono">→</span>
            </Link>
          </div>

          <div className="flex gap-9 font-mono text-[11px] text-muted-foreground mt-14">
            <span>
              Pieces
              <b className="block text-ink font-medium text-xs mt-1">
                {pieceCount} new
              </b>
            </span>
            <span>
              Lookbook
              <b className="block text-ink font-medium text-xs mt-1">Vol. 14</b>
            </span>
            <span>
              Shipping
              <b className="block text-ink font-medium text-xs mt-1">
                Worldwide
              </b>
            </span>
          </div>
        </div>

        {/* 이미지 */}
        <div className="relative bg-sand overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt=""
              fill
              priority
              className="object-cover saturate-[0.92] contrast-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          <div className="absolute left-7 bottom-7 bg-bone px-3.5 py-2.5 font-mono text-[10px] tracking-[0.14em] uppercase text-ink">
            Look 14 · FW26
            <span className="text-olive ml-2">↗</span>
          </div>
        </div>
      </div>
    </section>
  );
}
