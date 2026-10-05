import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FallingBooks from "@/components/FallingBooks";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Rooh-e-Dastaan",
  description: "Urdu Novels & Literature Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased">

        {/* Background Falling Books */}
        <FallingBooks />

        <CartProvider>
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="relative z-10 flex-grow">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </CartProvider>

      </body>
    </html>
  );
}