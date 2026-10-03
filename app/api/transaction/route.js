'use client';
import { useState } from 'react';

export default function TransactionPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'COD',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order successfully submitted!');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
        <h2 className="text-2xl font-serif font-bold text-amber-400 mb-2">Checkout & Shipping</h2>
        <p className="text-xs text-slate-400 mb-6">Enter your details and finalize your order .</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-300 mb-1">fullName</label>
            <input
              type="text"
              required
              placeholder="e.g. Ali Ahmed"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-100 p-3 rounded-xl outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-300 mb-1">Phone Number</label>
              <input
                type="text"
                required
                placeholder="0300-1234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-100 p-3 rounded-xl outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">City</label>
              <input
                type="text"
                required
                placeholder="e.g. Lahore, Karachi"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-100 p-3 rounded-xl outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Actual Home Address</label>
            <textarea
              rows="3"
              required
              placeholder="House #, Street #, Sector/Area..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-100 p-3 rounded-xl outline-none text-sm"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Payment Method</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-100 p-3 rounded-xl outline-none text-sm"
            >
              <option value="COD">Cash on Delivery (COD)</option>
              <option value="JazzCash">JazzCash / EasyPaisa</option>
              <option value="Bank">Bank Transfer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold p-3.5 rounded-xl transition text-sm mt-4"
          >
            Confirm & Place Order
          </button>
        </form>
      </div>
    </div>
  );
}