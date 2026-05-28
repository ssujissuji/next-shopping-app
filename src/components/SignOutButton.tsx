"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-[12px] tracking-[0.14em] uppercase text-muted hover:text-rust"
    >
      Logout
    </button>
  );
}
