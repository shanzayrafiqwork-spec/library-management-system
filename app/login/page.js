'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Logo Component
function RoohEDastaanLogo({ className = "h-12" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto aspect-square drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]"
      >
        <circle cx="50" cy="50" r="45" fill="#0F172A" stroke="#334155" strokeWidth="2" />
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
        <line x1="50" y1="40" x2="50" y2="62" stroke="#F59E0B" strokeWidth="2" />
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
        <circle cx="78" cy="34" r="1" fill="#FCD34D" />
      </svg>
      <div className="flex flex-col text-left">
        <span className="text-2xl font-extrabold text-amber-400 font-serif tracking-wide leading-none">
          Rooh-e-Dastaan
        </span>
        <span className="text-[10px] text-slate-400 font-sans tracking-[0.2em] uppercase mt-1">
          روحِ داستان • Urdu Novels
        </span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Yahan aap backend auth API / Firebase call kar sakte hain
    alert(`${isSignUp ? 'Account Successfully Created' : 'Login Successful'}! KhushAamdeed, ${formData.name || 'Dear Customer'}!`);
    
    // Login hone ke baad home page par redirect karne ke liye:
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative">
      {/* Back to Store Link */}
      <Link 
        href="/"
        className="absolute top-6 left-6 text-slate-400 hover:text-amber-400 text-sm font-medium flex items-center gap-2 transition"
      >
        ← Return to Store
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 md:p-8 shadow-2xl my-8">
        {/* Header Logo */}
        <div className="flex justify-center mb-6">
          <RoohEDastaanLogo />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-amber-400">
            {isSignUp ? "Create Your Account" : "Welcome Back"}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isSignUp 
              ? "Apne pasandida novels order karne ke liye account banayein" 
              : "Apne order track karne aur checkout ke liye login karein"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Ali Ahmed"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-100 px-4 py-3 rounded-xl outline-none text-sm transition"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-100 px-4 py-3 rounded-xl outline-none text-sm transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-100 px-4 py-3 rounded-xl outline-none text-sm transition"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number (COD Confirmation)</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="0300-1234567"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-slate-100 px-4 py-3 rounded-xl outline-none text-sm transition"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl transition shadow-lg shadow-amber-500/20 text-sm mt-2"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle between Sign In and Sign Up */}
        <div className="mt-6 text-center text-xs text-slate-400 border-t border-slate-800/80 pt-4">
          {isSignUp ? (
            <p>
              Pehle se account hai?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-amber-400 font-bold hover:underline ml-1"
              >
                Login Karein
              </button>
            </p>
          ) : (
            <p>
              Naye customer hain?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-amber-400 font-bold hover:underline ml-1"
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}