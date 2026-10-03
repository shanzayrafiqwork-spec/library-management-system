
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 mt-24">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Information */}
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <h3 className="text-amber-400 font-serif text-2xl font-bold hover:text-amber-300 transition-colors">
              Rooh-e-Dastaan
            </h3>
          </Link>

          <p className="text-sm text-slate-400 leading-relaxed">
            Your premier online Urdu literature store. Explore beautiful
            collections and order your favorite novels with ease.
          </p>

          <p className="text-sm text-amber-500 font-serif italic">
            روحِ داستان — Journey of Words
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-sm tracking-wide border-b border-slate-800 pb-3">
            Navigation
          </h4>

          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-amber-400 transition-colors"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/books"
                className="hover:text-amber-400 transition-colors"
              >
                Book Collection
              </Link>
            </li>

            <li>
              <Link
                href="/transaction"
                className="hover:text-amber-400 transition-colors"
              >
                Checkout
              </Link>
            </li>
          </ul>
        </div>

        {/* Featured Writers */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-sm tracking-wide border-b border-slate-800 pb-3">
            Featured Authors
          </h4>

          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/books?author=nimra-ahmed"
                className="hover:text-amber-400 transition-colors"
              >
                Nimra Ahmed
              </Link>
            </li>

            <li>
              <Link
                href="/books?author=umera-ahmed"
                className="hover:text-amber-400 transition-colors"
              >
                Umera Ahmed
              </Link>
            </li>

            <li>
              <Link
                href="/books?author=sumaira-hameed"
                className="hover:text-amber-400 transition-colors"
              >
                Sumaira Hameed
              </Link>
            </li>

            <li>
              <Link
                href="/books?author=areej-shah"
                className="hover:text-amber-400 transition-colors"
              >
                Areej Shah
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-sm tracking-wide border-b border-slate-800 pb-3">
            Support & Contact
          </h4>

          <div className="space-y-3 text-sm text-slate-400">
            <p>📍 Karachi, Pakistan</p>

            <p>
              📧{" "}
              <a
                href="mailto:support@roohedastaan.pk"
                className="hover:text-amber-400 transition-colors"
              >
                support@roohedastaan.pk
              </a>
            </p>

            <p>
              📞{" "}
              <a
                href="tel:+923001234567"
                className="hover:text-amber-400 transition-colors"
              >
                +92 300 1234567
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-900 bg-slate-950 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          
          <p>
            © {new Date().getFullYear()} Rooh-e-Dastaan. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-amber-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}

