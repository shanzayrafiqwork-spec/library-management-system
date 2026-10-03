"use client";

import Link from "next/link";

function OriginalLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-4 group shrink-0"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-14 w-14 sm:h-16 sm:w-16 drop-shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-transform group-hover:scale-105"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="#0F172A"
          stroke="#334155"
          strokeWidth="2"
        />

        <path
          d="M65 25C52 25 45 35 45 50C45 65 52 75 65 75C55 75 35 68 35 50C35 32 55 25 65 25Z"
          fill="#F59E0B"
          opacity="0.25"
        />

        <path
          d="M22 62C32 58 42 58 50 62C58 58 68 58 78 62V40C68 36 58 36 50 40C42 36 32 36 22 40V62Z"
          fill="#1E293B"
          stroke="#F59E0B"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        <line
          x1="50"
          y1="40"
          x2="50"
          y2="62"
          stroke="#F59E0B"
          strokeWidth="2"
        />

        <path
          d="M50 20C55 28 62 38 72 45"
          stroke="#FCD34D"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <path
          d="M50 20C48 28 50 38 50 60"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle
          cx="30"
          cy="28"
          r="1.5"
          fill="#FCD34D"
        />

        <circle
          cx="72"
          cy="26"
          r="2"
          fill="#FCD34D"
        />
      </svg>

      <div className="flex flex-col text-left">
        <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif tracking-wide leading-tight">
          Rooh-e-Dastaan
        </span>

        <span className="text-[10px] sm:text-xs text-slate-400 font-sans tracking-[0.25em] uppercase mt-1">
          روحِ داستان
        </span>
      </div>
    </Link>
  );
}

export default function Navbar({
  cartCount = 0,
  onOpenCart = () => {},
}) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-5">
        <div className="flex min-h-[72px] items-center justify-between gap-6">

          {/* Logo */}
          <OriginalLogo />

          {/* Navigation */}
          <div className="flex items-center gap-5 sm:gap-8 text-sm sm:text-base font-medium text-slate-300">

            <Link
              href="/"
              className="py-3 px-1 hover:text-amber-400 transition-colors"
            >
              Home
            </Link>

            <Link
              href="/books"
              className="py-3 px-1 hover:text-amber-400 transition-colors"
            >
              Novels
            </Link>

            <Link
              href="/transaction"
              className="hidden sm:block py-3 px-1 hover:text-amber-400 transition-colors"
            >
              Checkout
            </Link>

            {/* Cart */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-amber-400 transition-all hover:border-amber-400 hover:bg-slate-800"
            >
              <span>🛒 Cart</span>

              {cartCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-bold text-slate-950">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}