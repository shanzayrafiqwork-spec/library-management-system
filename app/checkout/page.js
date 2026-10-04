
'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState(null);

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    city: '',
    shippingAddress: '',
  });

  // ==========================================
  // LOAD LOGGED-IN MEMBER
  // ==========================================

  useEffect(() => {
    const savedMember = localStorage.getItem('member');

    if (!savedMember) {
      alert('Please login before proceeding to checkout.');
      router.push('/login');
      return;
    }

    try {
      const loggedInMember = JSON.parse(savedMember);

      setMember(loggedInMember);

      // Account ki information automatically fill hogi
      setFormData({
        customerName: loggedInMember.fullName || '',
        email: loggedInMember.email || '',
        phone: loggedInMember.phone || '',
        city: '',
        shippingAddress: '',
      });
    } catch (error) {
      console.error('MEMBER LOAD ERROR:', error);

      localStorage.removeItem('member');
      router.push('/login');
    }
  }, [router]);

  // ==========================================
  // TOTAL AMOUNT
  // ==========================================

  const totalAmount = cart.reduce(
    (acc, item) =>
      acc + (Number(item.price) || 1200) * Number(item.quantity || 1),
    0
  );

  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    console.log('CHECKOUT BUTTON CLICKED');

    // ------------------------------------------
    // CHECK LOGIN
    // ------------------------------------------

    const savedMember = localStorage.getItem('member');

    if (!savedMember) {
      alert('Please login before placing an order.');
      router.push('/login');
      return;
    }

    let loggedInMember;

    try {
      loggedInMember = JSON.parse(savedMember);
    } catch (error) {
      console.error('MEMBER PARSE ERROR:', error);

      localStorage.removeItem('member');
      alert('Your login session is invalid. Please login again.');
      router.push('/login');
      return;
    }

    // ------------------------------------------
    // CHECK CART
    // ------------------------------------------

    if (cart.length === 0) {
      alert('Your cart is currently empty.');
      return;
    }

    // ------------------------------------------
    // VALIDATE MEMBER ID
    // ------------------------------------------

    if (!loggedInMember.id) {
      alert('Member information is missing. Please login again.');
      localStorage.removeItem('member');
      router.push('/login');
      return;
    }

    // ------------------------------------------
    // VALIDATE CITY
    // ------------------------------------------

    if (!formData.city.trim()) {
      alert('Please enter your city.');
      return;
    }

    // ------------------------------------------
    // VALIDATE ADDRESS
    // ------------------------------------------

    if (!formData.shippingAddress.trim()) {
      alert('Please enter your complete delivery address.');
      return;
    }

    setLoading(true);

    try {
      // ----------------------------------------
      // CART ITEMS
      // ----------------------------------------

      const orderItems = cart.map((item) => ({
        novelId: item._id,
        title: item.title,
        price: Number(item.price) || 1200,
        quantity: Number(item.quantity) || 1,
      }));

      // ----------------------------------------
      // ORDER DATA
      // ----------------------------------------

      const orderData = {
        memberId: loggedInMember.id,

        customerName: formData.customerName.trim(),

        email: formData.email.trim(),

        phone: formData.phone.trim(),

        city: formData.city.trim(),

        shippingAddress: formData.shippingAddress.trim(),

        items: orderItems,

        totalAmount: Number(totalAmount),
      };

      console.log('ORDER DATA:', orderData);

      // ----------------------------------------
      // SEND TO API
      // ----------------------------------------

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      console.log('ORDER API RESPONSE:', data);

      // ----------------------------------------
      // API ERROR
      // ----------------------------------------

      if (!res.ok || !data.success) {
        alert(
          data.message ||
            data.error ||
            'Order could not be saved.'
        );

        return;
      }

      // ----------------------------------------
      // ORDER SUCCESS
      // ----------------------------------------

      clearCart();

      alert('Order Placed Successfully! Cash on Delivery.');

      if (data.data?._id) {
        router.push(`/orders/success?id=${data.data._id}`);
      } else {
        router.push('/orders/success');
      }
    } catch (error) {
      console.error('CHECKOUT ERROR:', error);

      alert(
        error.message ||
          'An error occurred while confirming the order.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* =====================================
            HEADER
        ====================================== */}

        <div className="mb-8">
          <Link
            href="/"
            className="text-amber-500 text-xs font-semibold hover:underline"
          >
            ← Continue Shopping
          </Link>

          <h1 className="text-3xl font-bold text-amber-500 mt-2">
            Shopping Cart & Checkout
          </h1>

          <p className="text-slate-400 text-sm">
            Review your selected novels and confirm shipping details
          </p>
        </div>

        {/* =====================================
            EMPTY CART
        ====================================== */}

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/60 border border-slate-800 rounded-2xl">

            <span className="text-4xl block mb-3">
              🛒
            </span>

            <p className="text-slate-400 mb-4">
              Your cart is currently empty
            </p>

            <Link
              href="/books"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-sm inline-block"
            >
              Browse Novels
            </Link>

          </div>
        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* =================================
                LEFT: CART ITEMS
            ================================== */}

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

                    <span className="text-xs text-amber-400 font-semibold block">
                      {item.author}
                    </span>

                    <h3 className="font-bold text-white text-base">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-400 font-mono">
                      Rs. {Number(item.price) || 1200} ×{' '}
                      {item.quantity}
                    </p>

                  </div>

                  <div className="flex items-center gap-4">

                    <span className="font-bold text-amber-400">
                      Rs.{' '}
                      {(Number(item.price) || 1200) *
                        Number(item.quantity || 1)}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item._id)
                      }
                      className="text-red-400 hover:text-red-300 text-xs font-bold px-2 py-1 rounded bg-red-500/10 border border-red-500/20"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

              {/* TOTAL */}

              <div className="border-t border-slate-800 pt-4 flex justify-between items-center text-lg font-bold">

                <span className="text-slate-300">
                  Total Bill Amount:
                </span>

                <span className="text-amber-400 font-mono text-xl">
                  Rs. {totalAmount}
                </span>

              </div>

            </div>

            {/* =================================
                RIGHT: CHECKOUT FORM
            ================================== */}

            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl h-fit">

              <h2 className="text-lg font-bold text-amber-500 mb-4">
                Delivery Information
              </h2>

              {/* LOGGED-IN MEMBER */}

              {member && (
                <div className="mb-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">

                  <p className="text-xs text-emerald-400">
                    ✓ Logged in as
                  </p>

                  <p className="text-sm font-semibold text-white mt-1">
                    {member.fullName}
                  </p>

                </div>
              )}

              <form
                onSubmit={handleSubmitOrder}
                className="space-y-4"
              >

                {/* NAME */}

                <div>
                  <label className="block text-xs text-slate-400 uppercase mb-1">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="customerName"
                    required
                    value={formData.customerName}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label className="block text-xs text-slate-400 uppercase mb-1">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* PHONE */}

                <div>
                  <label className="block text-xs text-slate-400 uppercase mb-1">
                    Mobile Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* CITY */}

                <div>
                  <label className="block text-xs text-slate-400 uppercase mb-1">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="Karachi"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* ADDRESS */}

                <div>
                  <label className="block text-xs text-slate-400 uppercase mb-1">
                    Complete Address
                  </label>

                  <textarea
                    name="shippingAddress"
                    required
                    rows="3"
                    placeholder="House #, Street #, Area"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* PAYMENT */}

                <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-xs text-amber-300">
                  💳 Payment Method:{' '}
                  <strong>
                    Cash on Delivery (COD)
                  </strong>
                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold py-3 rounded-xl transition shadow-lg text-sm"
                >
                  {loading
                    ? 'Processing Order...'
                    : 'Confirm & Place Order'}
                </button>

              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

