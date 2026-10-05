"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function TransactionPage() {
  const router = useRouter();

  const { cart, clearCart } = useCart();

  const [member, setMember] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "COD",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedMember = localStorage.getItem("member");

    if (!savedMember) {
      router.push("/login");
      return;
    }

    try {
      const parsedMember = JSON.parse(savedMember);

      setMember(parsedMember);

      setFormData((previous) => ({
        ...previous,
        fullName: parsedMember.fullName || "",
        phone: parsedMember.phone || "",
      }));
    } catch (error) {
      console.error("MEMBER LOAD ERROR:", error);
      localStorage.removeItem("member");
      router.push("/login");
    }
  }, [router]);

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const deliveryCharges = 0;
  const grandTotal = subtotal + deliveryCharges;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!member) {
      setError("Please login before placing your order.");
      router.push("/login");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is currently empty.");
      return;
    }

    try {
      setLoading(true);

      const orderItems = cart.map((item) => ({
        novelId: item._id,
        title: item.title,
        price: Number(item.price || 0),
        quantity: Number(item.quantity || 1),
      }));

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId: member.id,
          customerName: formData.fullName,
          email: member.email,
          phone: formData.phone,
          shippingAddress: formData.address,
          city: formData.city,
          items: orderItems,
          totalAmount: grandTotal,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Order could not be placed."
        );
      }

      clearCart();

      setMessage(
        "Your novel purchase order has been successfully received. We will contact you shortly and dispatch your parcel."
      );

      setTimeout(() => {
        router.push("/success");
      }, 2500);
    } catch (error) {
      console.error("ORDER SUBMIT ERROR:", error);

      setError(
        error.message || "Something went wrong while placing your order."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!member) {
    return (
      <div className="min-h-screen px-4 py-16 text-center text-slate-300">
        Checking your account...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
            Rooh-e-Dastaan
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
            Checkout & Shipping
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Enter your delivery details and finalize your order.
          </p>
        </div>

        {message && (
          <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-center text-sm font-semibold text-green-400">
            ✓ {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-center text-sm font-semibold text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* CHECKOUT FORM */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl md:p-8">

              <h2 className="mb-6 font-serif text-2xl font-bold text-amber-400">
                Delivery Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* FULL NAME */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-300">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Muhammad Hassan"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-sm text-slate-100 outline-none transition focus:border-amber-500"
                  />
                </div>

                {/* PHONE + CITY */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-300">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="0300-1234567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-sm text-slate-100 outline-none transition focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-300">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. Karachi"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-sm text-slate-100 outline-none transition focus:border-amber-500"
                    />
                  </div>

                </div>

                {/* ADDRESS */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-300">
                    Actual Home Address
                  </label>

                  <textarea
                    name="address"
                    rows="4"
                    required
                    placeholder="House #, Street #, Area, Block..."
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-sm text-slate-100 outline-none transition focus:border-amber-500"
                  />
                </div>

                {/* PAYMENT */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-300">
                    Payment Method
                  </label>

                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-sm text-slate-100 outline-none transition focus:border-amber-500"
                  >
                    <option value="COD">
                      Cash on Delivery (COD)
                    </option>

                    <option value="JazzCash">
                      JazzCash / EasyPaisa
                    </option>

                    <option value="Bank">
                      Bank Transfer
                    </option>
                  </select>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-3 w-full rounded-xl bg-amber-500 p-3.5 text-sm font-bold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Processing Order..."
                    : "Confirm & Place Order"}
                </button>

              </form>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div>
            <div className="sticky top-24 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">

              <h2 className="mb-5 font-serif text-xl font-bold text-amber-400">
                Order Summary
              </h2>

              <div className="space-y-4">

                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-3 border-b border-slate-800 pb-4"
                  >
                    <div className="h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-950">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Qty: {item.quantity || 1}
                      </p>

                      <p className="mt-1 text-sm font-bold text-amber-400">
                        Rs.{" "}
                        {(
                          Number(item.price || 0) *
                          Number(item.quantity || 1)
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}

              </div>

              <div className="mt-5 space-y-3 border-t border-slate-800 pt-5">

                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    Subtotal
                  </span>

                  <span className="font-semibold text-slate-200">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    Delivery
                  </span>

                  <span className="font-semibold text-green-400">
                    Free
                  </span>
                </div>

                <div className="flex justify-between border-t border-slate-800 pt-4">
                  <span className="font-bold text-white">
                    Grand Total
                  </span>

                  <span className="text-xl font-extrabold text-amber-400">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>

              </div>

              <p className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs leading-5 text-slate-400">
                Please pay the bill amount to the delivery rider when you
                receive the parcel.
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}