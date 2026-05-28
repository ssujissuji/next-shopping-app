"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-[12px] tracking-[0.14em] uppercase text-ink-soft hover:text-rust"
    >
      Logout
    </button>
  );
}
