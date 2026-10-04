
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function OriginalLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 sm:gap-4 group shrink-0"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 sm:h-16 sm:w-16 drop-shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-transform group-hover:scale-105"
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

        <circle cx="30" cy="28" r="1.5" fill="#FCD34D" />
        <circle cx="72" cy="26" r="2" fill="#FCD34D" />
      </svg>

      <div className="flex flex-col text-left">
        <span className="text-xl sm:text-3xl font-extrabold text-amber-400 font-serif tracking-wide leading-tight">
          Rooh-e-Dastaan
        </span>

        <span className="text-[8px] sm:text-xs text-slate-400 font-sans tracking-[0.2em] sm:tracking-[0.25em] uppercase mt-1">
          روحِ داستان
        </span>
      </div>
    </Link>
  );
}

export default function Navbar() {
  const [member, setMember] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadMember = () => {
      const savedMember = localStorage.getItem("member");

      if (savedMember) {
        try {
          setMember(JSON.parse(savedMember));
        } catch (error) {
          console.error("Failed to load member:", error);
          localStorage.removeItem("member");
          setMember(null);
        }
      } else {
        setMember(null);
      }
    };

    loadMember();

    window.addEventListener("storage", loadMember);

    return () => {
      window.removeEventListener("storage", loadMember);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("member");
    setMember(null);
    setMenuOpen(false);
    window.location.href = "/";
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-3 sm:py-5">

        {/* TOP NAVBAR */}
        <div className="flex min-h-[64px] sm:min-h-[72px] items-center justify-between gap-4">

          <OriginalLogo />

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-5 lg:gap-8 text-sm lg:text-base font-medium text-slate-300">

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
              className="py-3 px-1 hover:text-amber-400 transition-colors"
            >
              Checkout
            </Link>

            {member ? (
              <div className="flex items-center gap-3">
                <span className="text-amber-400 font-semibold max-w-[180px] truncate">
                  👤 {member.fullName}
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 hover:border-red-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-400"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-11 h-11 rounded-xl border border-slate-700 bg-slate-900 flex items-center justify-center text-slate-200 hover:text-amber-400 hover:border-amber-400 transition"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <span className="text-2xl leading-none">✕</span>
            ) : (
              <span className="text-2xl leading-none">☰</span>
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden mt-3 pb-2 border-t border-slate-800 pt-4">
            <div className="flex flex-col gap-2">

              <Link
                href="/"
                onClick={closeMenu}
                className="w-full rounded-xl px-4 py-3 text-slate-200 hover:bg-slate-900 hover:text-amber-400 transition"
              >
                Home
              </Link>

              <Link
                href="/books"
                onClick={closeMenu}
                className="w-full rounded-xl px-4 py-3 text-slate-200 hover:bg-slate-900 hover:text-amber-400 transition"
              >
                Novels
              </Link>

              <Link
                href="/transaction"
                onClick={closeMenu}
                className="w-full rounded-xl px-4 py-3 text-slate-200 hover:bg-slate-900 hover:text-amber-400 transition"
              >
                Checkout
              </Link>

              {member ? (
                <>
                  <div className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-amber-400 font-semibold">
                    👤 {member.fullName}
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className="w-full rounded-xl px-4 py-3 text-slate-200 hover:bg-slate-900 hover:text-amber-400 transition"
                  >
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-semibold text-red-400 transition hover:bg-red-500/20"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-center font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-400"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    onClick={closeMenu}
                    className="w-full rounded-xl bg-amber-500 px-4 py-3 text-center font-bold text-slate-950 transition hover:bg-amber-400"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

