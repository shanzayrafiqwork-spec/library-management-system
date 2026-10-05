"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen px-4 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-8 text-center shadow-2xl sm:p-12">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 text-4xl">
            ✓
          </div>

          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
            Rooh-e-Dastaan
          </p>

          <h1 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
            Order Successfully Placed!
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-400">
            Your novel purchase order has been successfully received.
            We will contact you shortly and dispatch your parcel.
          </p>

          <div className="mt-7 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-left">
            <h2 className="font-semibold text-amber-400">
              Cash on Delivery
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Please pay the bill amount to the delivery rider when
              you receive the parcel.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <Link
              href="/books"
              className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
            >
              📚 Continue Shopping
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-slate-700 bg-slate-950 px-6 py-3 text-sm font-bold text-slate-200 transition hover:border-amber-500 hover:text-amber-400"
            >
              Go to Home
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}