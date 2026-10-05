"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const authors = [
  "All Authors",
  "Umera Ahmed",
  "Sumaira Hameed",
  "Nimra Ahmed",
  "Areej Shah",
];

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("All Authors");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
  } = useCart();

  // ==============================
  // LOAD BOOKS FROM MONGODB
  // ==============================
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/books");

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.error || "Failed to load books."
          );
        }

        const formattedBooks = data.data.map((book) => ({
          _id: book._id,
          title: book.title,
          author: book.author,
          price: book.price,
          image: book.coverImage,
          category: book.genre,
        }));

        setBooks(formattedBooks);
      } catch (error) {
        console.error("LOAD BOOKS ERROR:", error);
        setError(error.message || "Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  // ==============================
  // SEARCH + AUTHOR FILTER
  // ==============================
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
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
  }, [books, search, selectedAuthor]);

  // ==============================
  // ADD TO CART
  // ==============================
  const handleAddToCart = (book) => {
    addToCart(book);

    setMessage(
      `${book.title} has been added to your cart.`
    );

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  // ==============================
  // REMOVE FROM CART
  // ==============================
  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  // ==============================
  // UPDATE QUANTITY
  // ==============================
  const handleUpdateQty = (id, quantity) => {
    updateQuantity(id, quantity);
  };

  // ==============================
  // CART COUNT
  // ==============================
  const cartCount = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ==============================
          HEADER
      ============================== */}
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

      {/* ==============================
          SEARCH & FILTERS
      ============================== */}
      <section className="sticky top-[80px] z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">

        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="w-full lg:max-w-md">
              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search novel, author or category..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-500"
              />
            </div>

            <div className="flex flex-wrap gap-2">

              {authors.map((author) => (
                <button
                  key={author}
                  type="button"
                  onClick={() =>
                    setSelectedAuthor(author)
                  }
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

      {/* ==============================
          BOOKS
      ============================== */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

        <div className="mb-7">

          <h2 className="font-serif text-2xl font-bold text-white">
            {selectedAuthor === "All Authors"
              ? "All Novels"
              : selectedAuthor}
          </h2>

          {!loading && !error && (
            <p className="mt-1 text-sm text-slate-500">
              {filteredBooks.length} novels found
            </p>
          )}

        </div>

        {/* LOADING */}
        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-amber-500"></div>

            <p className="mt-5 text-sm text-slate-400">
              Loading novels...
            </p>

          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/30 bg-slate-900 p-12 text-center">

            <div className="text-4xl">
              ⚠️
            </div>

            <h3 className="mt-4 text-xl font-bold text-white">
              Unable to load novels
            </h3>

            <p className="mt-2 text-sm text-red-400">
              {error}
            </p>

          </div>
        )}

        {/* NO BOOKS */}
        {!loading &&
          !error &&
          filteredBooks.length === 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">

              <div className="text-4xl">
                📚
              </div>

              <h3 className="mt-4 text-xl font-bold">
                No novels found
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Please try again by changing the search or author filter.
              </p>

            </div>
          )}

        {/* BOOK GRID */}
        {!loading &&
          !error &&
          filteredBooks.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredBooks.map((book) => (

                <article
                  key={book._id}
                  className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-amber-500/50"
                >

                  {/* Image */}
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
                        Rs. {Number(book.price).toLocaleString()}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleAddToCart(book)
                        }
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

      {/* ==============================
          FLOATING CART
      ============================== */}
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

      {/* ==============================
          NOTIFICATION
      ============================== */}
      {message && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-amber-500/30 bg-slate-900 px-5 py-3 text-sm font-semibold text-amber-400 shadow-2xl">
          ✓ {message}
        </div>
      )}

      {/* ==============================
          CART DRAWER
      ============================== */}
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