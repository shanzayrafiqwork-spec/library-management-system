'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    shippingAddress: ''
  });

  const totalAmount = cart.reduce((acc, item) => acc + (item.price || 1200) * item.quantity, 0);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Aap ka cart khali hai!');
      return;
    }

    setLoading(true);

    try {
      const orderItems = cart.map(item => ({
        novelId: item._id,
        title: item.title,
        price: item.price || 1200,
        quantity: item.quantity
      }));

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: orderItems,
          totalAmount
        })
      });

      const data = await res.json();
      if (data.success) {
        clearCart();
        alert('Order Placed Successfully! Cash on Delivery.');
        router.push(`/orders/success?id=${data.data._id}`);
      } else {
        alert(data.error || 'Failed to place order.');
      }
    } catch (err) {
      console.error(err);
      alert('Order confirm karne mein error aaya.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8">
          <Link href="/" className="text-amber-500 text-xs font-semibold hover:underline">
            ← Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-amber-500 mt-2">Shopping Cart & Checkout</h1>
          <p className="text-slate-400 text-sm">Review your selected novels and confirm shipping details</p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/60 border border-slate-800 rounded-2xl">
            <span className="text-4xl block mb-3">🛒</span>
            <p className="text-slate-400 mb-4">Your cart is currently empty
</p>
            <Link
              href="/"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-sm inline-block"
            >
              Browse Novels
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: Cart Items Summary */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-2">
                Order Items ({cart.length})
              </h2>

              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <span className="text-xs text-amber-400 font-semibold block">{item.author}</span>
                    <h3 className="font-bold text-white text-base">{item.title}</h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Rs. {item.price || 1200} × {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-amber-400">
                      Rs. {(item.price || 1200) * item.quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-400 hover:text-red-300 text-xs font-bold px-2 py-1 rounded bg-red-500/10 border border-red-500/20"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="border-t border-slate-800 pt-4 flex justify-between items-center text-lg font-bold">
                <span className="text-slate-300">Total Bill Amount:</span>
                <span className="text-amber-400 font-mono text-xl">Rs. {totalAmount}</span>
              </div>
            </div>

            {/* Right: Checkout Shipping Form */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl h-fit">
              <h2 className="text-lg font-bold text-amber-500 mb-4">Delivery Information</h2>

              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Ali Khan"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="ali@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 uppercase mb-1">Mobile Phone (For COD)</label>
                  <input
                    type="text"
                    required
                    placeholder="03001234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 uppercase mb-1">Complete Address</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="House #, Street #, Area, City"
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-xs text-amber-300">
                  💳 Payment Method: <strong>Cash on Delivery (COD)</strong>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl transition shadow-lg text-sm"
                >
                  {loading ? 'Processing Order...' : 'Confirm & Place Order'}
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}