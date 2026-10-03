'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative z-10">
      <div className="max-w-md w-full bg-slate-900 border border-emerald-500/30 p-8 rounded-3xl shadow-2xl text-center">
        
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">
          ✅
        </div>

        <h1 className="text-2xl font-bold text-emerald-400 mb-2">Order Confirmed!</h1>
        <p className="text-slate-300 text-sm mb-6">
         Your novel purchase order has been successfully received. We will contact you shortly and dispatch your parcel.
        </p>

        {/* Order Details Card */}
        {orderId && (
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-left mb-6 font-mono text-xs">
            <span className="text-slate-500 block uppercase mb-1">Order Reference ID:</span>
            <span className="text-amber-400 font-bold block break-all">{orderId}</span>
          </div>
        )}

        <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-xs text-amber-300 mb-6 text-left">
          🚚 <strong>Cash on Delivery:</strong> Please pay the bill amount to the delivery rider when you receive the parcel.
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl transition text-sm"
          >
            Back to Storefront
          </Link>
        </div>

      </div>
    </div>
  );
}
