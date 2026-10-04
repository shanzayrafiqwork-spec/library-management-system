'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();

  const [member, setMember] = useState(null);
  const [orders, setOrders] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedMember = localStorage.getItem('member');

    if (!savedMember) {
      router.push('/login');
      return;
    }

    try {
      const loggedInMember = JSON.parse(savedMember);

      if (!loggedInMember.id || loggedInMember.role !== 'admin') {
        router.push('/dashboard');
        return;
      }

      setMember(loggedInMember);

      fetchAdminData();
    } catch (error) {
      console.error('ADMIN LOGIN ERROR:', error);

      localStorage.removeItem('member');
      router.push('/login');
    }
  }, [router]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError('');

      const [ordersResponse, membersResponse] =
        await Promise.all([
          fetch('/api/orders'),
          fetch('/api/members'),
        ]);

      const ordersData = await ordersResponse.json();
      const membersData = await membersResponse.json();

      if (!ordersResponse.ok || !ordersData.success) {
        throw new Error(
          ordersData.message || 'Unable to load orders.'
        );
      }

      if (!membersResponse.ok || !membersData.success) {
        throw new Error(
          membersData.message || 'Unable to load members.'
        );
      }

      setOrders(ordersData.orders || []);
      setMembers(membersData.members || []);
    } catch (error) {
      console.error('ADMIN DATA ERROR:', error);

      setError(
        error.message || 'Unable to connect to the server.'
      );
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(
        `/api/orders/${orderId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message || 'Order status could not be updated.'
        );
        return;
      }

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? { ...order, status }
            : order
        )
      );

      alert('Order status updated successfully.');
    } catch (error) {
      console.error('STATUS UPDATE ERROR:', error);

      alert('Unable to update order status.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('member');
    router.push('/');
  };

  const totalSales = orders.reduce(
    (total, order) =>
      total + Number(order.grandTotal || 0),
    0
  );

  if (!member || loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-amber-400">
          Loading admin dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-5 py-10 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>
            <p className="text-amber-400 text-sm font-semibold">
              Rooh-e-Dastaan
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mt-1">
              Admin Dashboard
            </h1>

            <p className="text-slate-400 mt-2 text-sm">
              Manage members and customer orders.
            </p>
          </div>

          <div className="flex gap-3">

            <Link
              href="/"
              className="border border-slate-700 bg-slate-900 hover:border-amber-400 text-slate-200 hover:text-amber-400 font-semibold px-5 py-3 rounded-xl text-sm transition"
            >
              Store
            </Link>

            <button
              onClick={handleLogout}
              className="border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold px-5 py-3 rounded-xl text-sm transition"
            >
              Logout
            </button>

          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {/* STAT CARDS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400 text-sm">
              Total Members
            </p>

            <p className="text-3xl font-bold text-amber-400 mt-2">
              {members.length}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400 text-sm">
              Total Orders
            </p>

            <p className="text-3xl font-bold text-blue-400 mt-2">
              {orders.length}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
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

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400 text-sm">
              Total Sales
            </p>

            <p className="text-2xl font-bold text-emerald-400 mt-2">
              Rs. {totalSales}
            </p>
          </div>

        </div>

        {/* MEMBERS */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-10">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">
              Members
            </h2>

            <span className="text-sm text-slate-500">
              {members.length} registered
            </span>
          </div>

          {members.length === 0 ? (
            <p className="text-slate-400">
              No members found.
            </p>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead>
                  <tr className="border-b border-slate-800 text-left">
                    <th className="py-3 px-3 text-slate-400">
                      Name
                    </th>

                    <th className="py-3 px-3 text-slate-400">
                      Email
                    </th>

                    <th className="py-3 px-3 text-slate-400">
                      Phone
                    </th>

                    <th className="py-3 px-3 text-slate-400">
                      Role
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {members.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-slate-800/70"
                    >
                      <td className="py-4 px-3 font-semibold">
                        {item.fullName}
                      </td>

                      <td className="py-4 px-3 text-slate-300">
                        {item.email}
                      </td>

                      <td className="py-4 px-3 text-slate-300">
                        {item.phone}
                      </td>

                      <td className="py-4 px-3">
                        <span className="text-amber-400 font-semibold">
                          {item.role}
                        </span>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

        {/* ORDERS */}

        <div>

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-2xl font-bold">
              All Orders
            </h2>

            <button
              onClick={fetchAdminData}
              className="text-sm text-amber-400 hover:text-amber-300"
            >
              ↻ Refresh
            </button>

          </div>

          {orders.length === 0 ? (

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
              <div className="text-4xl mb-4">
                📦
              </div>

              <h3 className="text-lg font-bold">
                No Orders Yet
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                Customer orders will appear here.
              </p>
            </div>

          ) : (

            <div className="space-y-5">

              {orders.map((order) => (

                <div
                  key={order._id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6"
                >

                  {/* ORDER HEADER */}

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-4">

                    <div>
                      <p className="text-xs text-slate-500 uppercase">
                        Order ID
                      </p>

                      <p className="text-amber-400 font-mono text-xs break-all mt-1">
                        {order._id}
                      </p>
                    </div>

                    <div>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            order._id,
                            e.target.value
                          )
                        }
                        className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-amber-400 outline-none focus:border-amber-500"
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Confirmed">
                          Confirmed
                        </option>

                        <option value="Dispatched">
                          Dispatched
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>
                    </div>

                  </div>

                  {/* CUSTOMER */}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5">

                    <div>
                      <p className="text-xs text-slate-500 uppercase">
                        Customer
                      </p>

                      <p className="font-semibold mt-1">
                        {order.customerDetails?.fullName}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 uppercase">
                        Phone
                      </p>

                      <p className="text-slate-300 mt-1">
                        {order.customerDetails?.phone}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 uppercase">
                        City
                      </p>

                      <p className="text-slate-300 mt-1">
                        {order.customerDetails?.city}
                      </p>
                    </div>

                  </div>

                  {/* ADDRESS */}

                  <div className="bg-slate-950 rounded-xl p-4 mb-5">

                    <p className="text-xs text-slate-500 uppercase">
                      Delivery Address
                    </p>

                    <p className="text-sm text-slate-300 mt-1">
                      {order.customerDetails?.address}
                    </p>

                  </div>

                  {/* ITEMS */}

                  <div className="space-y-2 mb-5">

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

                        <p className="text-amber-400 font-semibold text-sm">
                          Rs.{' '}
                          {Number(item.price) *
                            Number(item.quantity)}
                        </p>

                      </div>

                    ))}

                  </div>

                  {/* TOTAL */}

                  <div className="border-t border-slate-800 pt-4 flex justify-between items-center">

                    <div>
                      <p className="text-xs text-slate-500">
                        Payment
                      </p>

                      <p className="text-sm text-slate-300 mt-1">
                        Cash on Delivery
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-500">
                        Total
                      </p>

                      <p className="text-xl font-bold text-amber-400">
                        Rs. {order.grandTotal}
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