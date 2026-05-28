import Link from 'next/link';
import { auth } from '@/lib/auth';
import { SignOutButton } from './SignOutButton';
import { CartBadge } from './CartBadge';

export async function Header() {
  const session = await auth();

  return (
    <header className="bg-bone">
      {/* 상단 띠 */}
      <div className="bg-ink text-bone text-[11px] tracking-[0.18em] uppercase text-center py-2">
        Free shipping over ₩50,000 — Members get early access to FW26
      </div>

      {/* 메인 nav */}
      <div className="border-b border-line bg-bone sticky top-0 z-50">
        <div className="max-w-[1320px] mx-auto px-10 py-5 grid grid-cols-[1fr_auto_1fr] items-center">
          {/* 좌측 카테고리 (데스크탑) */}
          <nav className="hidden md:flex gap-7 text-[12px] tracking-[0.14em] uppercase text-ink-soft">
            <Link href="/?category=의류">Women</Link>
            <Link href="/?category=의류">Men</Link>
            <Link href="/?category=가방">Objects</Link>
            {/* <Link href="/products">Journal</Link> */}
          </nav>

          {/* 로고 (가운데) */}
          <Link
            href="/"
            className="font-display text-[26px] tracking-[0.32em] text-center text-ink"
            aria-label="MAEIL">
            M
            <span className="inline-block w-[5px] h-[5px] rounded-full bg-olive align-middle mx-1.5 mb-1" />
            A
            <span className="inline-block w-[5px] h-[5px] rounded-full bg-olive align-middle mx-1.5 mb-1" />
            E
            <span className="inline-block w-[5px] h-[5px] rounded-full bg-olive align-middle mx-1.5 mb-1" />
            I
            <span className="inline-block w-[5px] h-[5px] rounded-full bg-olive align-middle mx-1.5 mb-1" />
            L
          </Link>

          {/* 우측: 계정 + cart */}
          <div className="flex gap-6 justify-end items-center text-[12px] tracking-[0.14em] uppercase text-ink-soft">
            {session?.user?.role === 'admin' && (
              <Link href="/admin" className="text-rust">
                Admin
              </Link>
            )}
            {session ? (
              <>
                <Link
                  href="/mypage"
                  className="hover:text-ink hidden sm:inline">
                  {session.user?.name} 님
                </Link>
                <SignOutButton />
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-ink">
                  Login
                </Link>
                <Link href="/register" className="hover:text-ink">
                  Register
                </Link>
              </>
            )}
            <CartBadge userId={session?.user?.id} />
          </div>
        </div>
      </div>

      {/* 카테고리 두 번째 줄 */}
      <div className="border-b border-line bg-bone">
        <div className="max-w-[1320px] mx-auto px-10 py-3.5 flex gap-9 justify-center text-[12px] tracking-[0.14em] uppercase text-ink-soft">
          <Link href="/" className="text-ink relative pb-1">
            All
          </Link>
          <Link href="/?category=의류" className="hover:text-ink">
            Tops
          </Link>
          <Link href="/?category=의류" className="hover:text-ink">
            Outerwear
          </Link>
          <Link href="/?category=신발" className="hover:text-ink">
            Footwear
          </Link>
          <Link href="/?category=가방" className="hover:text-ink">
            Bags
          </Link>
          <Link href="/?category=액세서리" className="hover:text-ink">
            Accessories
          </Link>
          <Link href="/products" className="hover:text-ink">
            Lookbook
          </Link>
          <Link href="/" className="text-rust">
            Sale
          </Link>
        </div>
      </div>
    </header>
  );
}
