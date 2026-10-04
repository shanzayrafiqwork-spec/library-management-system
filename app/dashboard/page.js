
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();

  const [member, setMember] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ==========================================
  // LOAD MEMBER + ORDERS
  // ==========================================

  useEffect(() => {
    const savedMember = localStorage.getItem('member');

    if (!savedMember) {
      router.push('/login');
      return;
    }

    try {
      const loggedInMember = JSON.parse(savedMember);

      if (!loggedInMember.id) {
        localStorage.removeItem('member');
        router.push('/login');
        return;
      }

      setMember(loggedInMember);

      fetchOrders(loggedInMember.id);
    } catch (error) {
      console.error('MEMBER ERROR:', error);

      localStorage.removeItem('member');
      router.push('/login');
    }
  }, [router]);

  // ==========================================
  // FETCH MEMBER ORDERS
  // ==========================================

  const fetchOrders = async (memberId) => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `/api/orders?memberId=${memberId}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || 'Unable to load your orders.'
        );
        return;
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error('ORDERS ERROR:', error);

      setError('Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem('member');
    router.push('/');
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (!member || loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-amber-400">
          Loading dashboard...
        </p>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-5 py-10 md:px-10">

      <div className="max-w-6xl mx-auto">

        {/* ======================================
            HEADER
        ======================================= */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>
            <p className="text-amber-400 text-sm font-semibold">
              Member Dashboard
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mt-1">
              Welcome, {member.fullName}
            </h1>

            <p className="text-slate-400 mt-2 text-sm">
              Manage your account and view your novel orders.
            </p>
          </div>

          <div className="flex gap-3">

            <Link
              href="/books"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-sm transition"
            >
              Browse Novels
            </Link>

            <button
              onClick={handleLogout}
              className="border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold px-5 py-3 rounded-xl text-sm transition"
            >
              Logout
            </button>

          </div>

        </div>

        {/* ======================================
            ACCOUNT CARD
        ======================================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">

          <h2 className="text-lg font-bold text-amber-400 mb-4">
            Account Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-500 uppercase">
                Full Name
              </p>

              <p className="font-semibold mt-1">
                {member.fullName}
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-500 uppercase">
                Email
              </p>

              <p className="font-semibold mt-1 break-all">
                {member.email}
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-500 uppercase">
                Phone
              </p>

              <p className="font-semibold mt-1">
                {member.phone}
              </p>
            </div>

          </div>

        </div>

        {/* ======================================
            ORDER SUMMARY
        ======================================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">
              Total Orders
            </p>

            <p className="text-3xl font-bold text-amber-400 mt-2">
              {orders.length}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">
              Pending Orders
            </p>

            <p className="text-3xl font-bold text-yellow-400 mt-2">
              {
                orders.filter(
                  (order) => order.status === 'Pending'
                ).length
              }
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">
              Delivered Orders
            </p>

            <p className="text-3xl font-bold text-emerald-400 mt-2">
              {
                orders.filter(
                  (order) => order.status === 'Delivered'
                ).length
              }
            </p>
          </div>

        </div>

        {/* ======================================
            ORDERS
        ======================================= */}

        <div>

          <h2 className="text-2xl font-bold mb-5">
            My Orders
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-5">
              {error}
            </div>
          )}

          {orders.length === 0 && !error ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">

              <div className="text-4xl mb-4">
                📚
              </div>

              <h3 className="text-lg font-bold">
                No Orders Yet
              </h3>

              <p className="text-slate-400 text-sm mt-2 mb-5">
                You have not placed any novel orders yet.
              </p>

              <Link
                href="/books"
                className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm"
              >
                Browse Novels
              </Link>

            </div>
          ) : (

            <div className="space-y-5">

              {orders.map((order) => (

                <div
                  key={order._id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6"
                >

                  {/* ORDER HEADER */}

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-800 pb-4">

                    <div>
                      <p className="text-xs text-slate-500 uppercase">
                        Order ID
                      </p>

                      <p className="text-amber-400 font-mono text-sm break-all">
                        {order._id}
                      </p>
                    </div>

                    <div>

                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : order.status === 'Cancelled'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {order.status}
                      </span>

                    </div>

                  </div>

                  {/* ITEMS */}

                  <div className="py-4 space-y-3">

                    {order.items?.map((item, index) => (

                      <div
                        key={`${order._id}-${index}`}
                        className="flex justify-between gap-4 bg-slate-950 rounded-xl p-3"
                      >

                        <div>
                          <p className="font-semibold text-sm">
                            {item.title}
                          </p>

                          <p className="text-xs text-slate-500 mt-1">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="text-amber-400 font-semibold text-sm whitespace-nowrap">
                          Rs.{' '}
                          {Number(item.price) *
                            Number(item.quantity)}
                        </p>

                      </div>

                    ))}

                  </div>

                  {/* ORDER FOOTER */}

                  <div className="border-t border-slate-800 pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                    <div>

                      <p className="text-xs text-slate-500">
                        Delivery Address
                      </p>

                      <p className="text-sm text-slate-300 mt-1">
                        {order.customerDetails?.address}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {order.customerDetails?.city}
                      </p>

                    </div>

                    <div className="md:text-right">

                      <p className="text-xs text-slate-500">
                        Total Amount
                      </p>

                      <p className="text-xl font-bold text-amber-400">
                        Rs. {order.grandTotal}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {order.paymentMethod === 'cod'
                          ? 'Cash on Delivery'
                          : order.paymentMethod}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </div>
  );
}

