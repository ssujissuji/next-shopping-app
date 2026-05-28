import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-bone px-10 pt-20 pb-8">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-14 pb-14 border-b border-white/10">
          <div>
            <h2 className="font-display text-5xl leading-none tracking-tight m-0">
              Letters from
              <br />
              <em className="italic text-white/50 font-light">the atelier.</em>
            </h2>
            <p className="mt-5 max-w-[380px] text-white/60 text-[13px] leading-relaxed">
              새 컬렉션과 비공개 행사 소식을 가장 먼저 받아보세요. 한 달에 한 번
              이상 보내지 않습니다.
            </p>
            <form className="mt-6 flex border-b border-white/25 pb-2 max-w-[380px]">
              <input
                type="email"
                placeholder="maeil@maeil.com"
                className="flex-1 bg-transparent text-bone text-[13px] outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                className="text-[11px] tracking-[0.2em] uppercase text-bone">
                Subscribe →
              </button>
            </form>
          </div>

          <FooterCol
            title="Shop"
            links={[
              ['Women', '/'],
              ['Men', '/'],
              ['Objects', '/'],
              ['Sale', '/'],
              ['Gift cards', '/'],
            ]}
          />
          <FooterCol
            title="Service"
            links={[
              ['Shipping', '/'],
              ['Returns', '/'],
              ['Size guide', '/'],
              ['Care', '/'],
              ['Contact', '/'],
            ]}
          />
          <FooterCol
            title="Studio"
            links={[
              ['About MAEIL', '/'],
              ['Sustainability', '/'],
              ['Journal', '/'],
              ['Stockists', '/'],
              ['Careers', '/'],
            ]}
          />
        </div>

        <div className="mt-7 flex flex-col md:flex-row gap-3 md:justify-between font-mono text-[10px] tracking-[0.14em] uppercase text-white/45">
          <span>© 2026 Maeil Studio · Seoul</span>
          <span>KRW · 한국어</span>
          <span>Instagram · Pinterest · Vimeo</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h4 className="font-display text-lg m-0 mb-4 tracking-wide">{title}</h4>
      <ul className="list-none p-0 m-0 flex flex-col gap-3 text-[13px] text-white/65">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="hover:text-bone">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
