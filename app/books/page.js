"use client";

import { useMemo, useState } from "react";
import CartDrawer from "@/components/CartDrawer";

const novelsData = [
  {
    id: 1,
    title: "Aab-e-Hayat",
    author: "Umera Ahmed",
    price: 1600,
    image: "/novels/aab-e-hayat.jpg",
    category: "Spiritual & Social",
  },
  {
    id: 2,
    title: "Aks",
    author: "Umera Ahmed",
    price: 1500,
    image: "/novels/aks.jpg",
    category: "Social & Psychological",
  },
  {
    id: 3,
    title: "Amarbail",
    author: "Umera Ahmed",
    price: 1550,
    image: "/novels/amarbail.jpg",
    category: "Romance & Social",
  },
  {
    id: 4,
    title: "Beli Rajputan Ki Malika",
    author: "Nimra Ahmed",
    price: 1700,
    image: "/novels/beli-rajputan-ki-malika.jpg",
    category: "Historical & Romance",
  },
  {
    id: 5,
    title: "Halim",
    author: "Nimra Ahmed",
    price: 1900,
    image: "/novels/halim.jpg",
    category: "Adventure & Mystery",
  },
  {
    id: 6,
    title: "Hasil",
    author: "Umera Ahmed",
    price: 1450,
    image: "/novels/hasil.jpg",
    category: "Social",
  },
  {
    id: 7,
    title: "Hum Kahan Ke Sachay Thay",
    author: "Umera Ahmed",
    price: 1650,
    image: "/novels/hum-kahan-ke-sachay-the.jpg",
    category: "Social & Psychological",
  },
  {
    id: 8,
    title: "Iblees",
    author: "Nimra Ahmed",
    price: 1750,
    image: "/novels/iblees.jpg",
    category: "Mystery",
  },
  {
    id: 9,
    title: "Ishq-e-Yaram",
    author: "Areej Shah",
    price: 1800,
    image: "/novels/ishq-e-yaram.jpg",
    category: "Romance",
  },
  {
    id: 10,
    title: "Jannat Ke Pattay",
    author: "Nimra Ahmed",
    price: 1650,
    image: "/novels/jannat-ke-pattay.jpg",
    category: "Thriller & Romance",
  },
  {
    id: 11,
    title: "Kankar",
    author: "Umera Ahmed",
    price: 1450,
    image: "/novels/kankar.jpg",
    category: "Social",
  },
  {
    id: 12,
    title: "Karakoram Ka Taj Mahal",
    author: "Nimra Ahmed",
    price: 1800,
    image: "/novels/karakoram-ka-taj-mahal.jpg",
    category: "Adventure & Romance",
  },
  {
    id: 13,
    title: "Main Anmol",
    author: "Nimra Ahmed",
    price: 1400,
    image: "/novels/main-anmol.jpg",
    category: "Social & Romance",
  },
  {
    id: 14,
    title: "Mala",
    author: "Nimra Ahmed",
    price: 1500,
    image: "/novels/mala.jpg",
    category: "Romance & Drama",
  },
  {
    id: 15,
    title: "Man-o-Salwa",
    author: "Umera Ahmed",
    price: 1550,
    image: "/novels/man-o-salwa.jpg",
    category: "Spiritual & Social",
  },
  {
    id: 16,
    title: "Mushaf",
    author: "Nimra Ahmed",
    price: 1600,
    image: "/novels/mushaf.jpg",
    category: "Spiritual & Romance",
  },
  {
    id: 17,
    title: "Namal",
    author: "Nimra Ahmed",
    price: 1750,
    image: "/novels/namal.jpg",
    category: "Crime & Suspense",
  },
  {
    id: 18,
    title: "Paras",
    author: "Nimra Ahmed",
    price: 1450,
    image: "/novels/paras.jpg",
    category: "Romance & Drama",
  },
  {
    id: 19,
    title: "Peer-e-Kamil",
    author: "Umera Ahmed",
    price: 1500,
    image: "/novels/peer-e-kamil.jpg",
    category: "Spiritual & Social",
  },
  {
    id: 20,
    title: "Rooh-e-Yaram",
    author: "Areej Shah",
    price: 1850,
    image: "/novels/rooh-e-yaram.jpg",
    category: "Romance & Action",
  },
  {
    id: 21,
    title: "Soda",
    author: "Sumaira Hameed",
    price: 1350,
    image: "/novels/soda.jpg",
    category: "Social & Drama",
  },
  {
    id: 22,
    title: "Tawaf-e-Ishq",
    author: "Sumaira Hameed",
    price: 1700,
    image: "/novels/tawaf-e-ishq.jpg",
    category: "Romance",
  },
  {
    id: 23,
    title: "Umm-e-Yaqeen",
    author: "Sumaira Hameed",
    price: 1650,
    image: "/novels/umm-e-yaqeen.jpg",
    category: "Romance & Social",
  },
  {
    id: 24,
    title: "Wali",
    author: "Sumaira Hameed",
    price: 1750,
    image: "/novels/wali.jpg",
    category: "Romance & Drama",
  },
  {
    id: 25,
    title: "Yaram",
    author: "Sumaira Hameed",
    price: 1350,
    image: "/novels/yaram.jpg",
    category: "Romantic",
  },
  {
    id: 26,
    title: "Zindagi Gulzar Hai",
    author: "Umera Ahmed",
    price: 1550,
    image: "/novels/zindagi-gulzar-hai.jpg",
    category: "Social & Romance",
  },
];

const authors = [
  "All Authors",
  "Umera Ahmed",
  "Sumaira Hameed",
  "Nimra Ahmed",
  "Areej Shah",
];

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("All Authors");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [message, setMessage] = useState("");

  const filteredBooks = useMemo(() => {
    return novelsData.filter((book) => {
      const matchesAuthor =
        selectedAuthor === "All Authors" ||
        book.author === selectedAuthor;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        book.title.toLowerCase().includes(searchText) ||
        book.author.toLowerCase().includes(searchText) ||
        book.category.toLowerCase().includes(searchText);

      return matchesAuthor && matchesSearch;
    });
  }, [search, selectedAuthor]);

  const handleAddToCart = (book) => {
    setCart((currentCart) => {
      const existingBook = currentCart.find(
        (item) => item.id === book.id
      );

      if (existingBook) {
        return currentCart.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...book, quantity: 1 }];
    });

    setMessage(`${book.title} has been added to your cart!.`);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handleRemoveFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const handleUpdateQty = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Rooh-e-Dastaan
          </p>

          <h1 className="font-serif text-4xl font-extrabold sm:text-5xl">
            Urdu Novels Collection
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Apni pasand ke khoobsurat Urdu novels explore karein aur
            apni favourite books ko cart mein add karein.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-[80px] z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full lg:max-w-md">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search novel, author or category..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-500"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {authors.map((author) => (
                <button
                  key={author}
                  type="button"
                  onClick={() => setSelectedAuthor(author)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                    selectedAuthor === author
                      ? "bg-amber-500 text-slate-950"
                      : "border border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-500 hover:text-amber-400"
                  }`}
                >
                  {author}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="mb-7">
          <h2 className="font-serif text-2xl font-bold text-white">
            {selectedAuthor === "All Authors"
              ? "All Novels"
              : selectedAuthor}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredBooks.length} novels found
          </p>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
            <div className="text-4xl">📚</div>

            <h3 className="mt-4 text-xl font-bold">
              No novels found
            </h3>

            <p className="mt-2 text-sm text-slate-400">
             "Please try again by changing the search or author filter."
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book) => (
              <article
                key={book.id}
                className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-amber-500/50"
              >
                {/* FIXED IMAGE AREA */}
                <div className="h-[380px] w-full overflow-hidden bg-slate-900">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Book Details */}
                <div className="p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                    {book.category}
                  </p>

                  <h3 className="line-clamp-2 min-h-[56px] font-serif text-xl font-bold text-white">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    By{" "}
                    <span className="text-slate-200">
                      {book.author}
                    </span>
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-lg font-extrabold text-amber-400">
                      Rs. {book.price}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(book)}
                      className="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
                    >
                      🛒 Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Floating Cart */}
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-2xl bg-amber-500 px-5 py-4 font-bold text-slate-950 shadow-2xl transition hover:bg-amber-400"
      >
        🛒 Cart

        {cartCount > 0 && (
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-950 px-1.5 text-xs font-bold text-amber-400">
            {cartCount}
          </span>
        )}
      </button>

      {/* Notification */}
      {message && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-amber-500/30 bg-slate-900 px-5 py-3 text-sm font-semibold text-amber-400 shadow-2xl">
          ✓ {message}
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemove={handleRemoveFromCart}
        onUpdateQty={handleUpdateQty}
      />
    </div>
  );
}