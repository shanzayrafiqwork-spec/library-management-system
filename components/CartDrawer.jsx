"use client";

import Link from "next/link";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemove,
  onUpdateQty,
}) {
  if (!isOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-md flex-col justify-between border-l border-slate-800 bg-slate-950 p-6 shadow-2xl">

        {/* Header */}
        <div>
          <div className="mb-5 flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-amber-400">
                Your Cart
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {cartItems.length} item
                {cartItems.length !== 1 ? "s" : ""}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-2 text-xl font-bold text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mb-4 text-5xl">🛒</div>

              <h3 className="text-lg font-bold text-white">
                Aap ki cart khali hai
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Apni favourite novel cart mein add karein.
              </p>
            </div>
          ) : (
            <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-3"
                >
                  <div className="flex gap-3">
                    {/* Book Image */}
                    <div className="flex h-20 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-950">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* Book Details */}
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-bold text-white">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-xs text-slate-400">
                        {item.author}
                      </p>

                      <p className="mt-1 text-sm font-bold text-amber-400">
                        Rs. {item.price.toLocaleString()}
                      </p>

                      {/* Quantity */}
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-white transition hover:bg-slate-700"
                        >
                          −
                        </button>

                        <span className="flex h-7 min-w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-950 px-2 text-xs font-bold text-white">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-white transition hover:bg-slate-700"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="self-start rounded-lg px-2 py-1 text-xs font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Checkout */}
        {cartItems.length > 0 && (
          <div className="mt-5 border-t border-slate-800 pt-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-base font-semibold text-slate-300">
                Total Amount
              </span>

              <span className="text-xl font-extrabold text-amber-400">
                Rs. {total.toLocaleString()}
              </span>
            </div>

            <Link
              href="/transaction"
              onClick={onClose}
              className="block w-full rounded-xl bg-amber-500 py-3.5 text-center font-bold text-slate-950 transition hover:bg-amber-400"
            >
              Proceed to Checkout →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}