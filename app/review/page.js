'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ReviewPage() {
  const [member, setMember] = useState(null);
  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    bookId: '',
    rating: 5,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [booksLoading, setBooksLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedMember = localStorage.getItem('member');

    if (savedMember) {
      try {
        setMember(JSON.parse(savedMember));
      } catch (error) {
        console.error('MEMBER LOAD ERROR:', error);
        localStorage.removeItem('member');
      }
    }

    loadBooks();
  }, []);

  const loadBooks = async () => {
    setBooksLoading(true);
    setError('');

    try {
      const response = await fetch('/api/books', {
        method: 'GET',
        cache: 'no-store',
      });

      const data = await response.json();

      console.log('BOOKS API RESPONSE:', data);

      if (response.ok && data.success && Array.isArray(data.data)) {
        setBooks(data.data);
      } else {
        setBooks([]);
        setError('Unable to load novels.');
      }
    } catch (error) {
      console.error('BOOKS LOAD ERROR:', error);
      setBooks([]);
      setError('Unable to load novels from the server.');
    } finally {
      setBooksLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRating = (rating) => {
    setFormData((previous) => ({
      ...previous,
      rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess('');
    setError('');

    if (!member) {
      setError('Please login before submitting a review.');
      return;
    }

    if (!formData.bookId) {
      setError('Please select a novel.');
      return;
    }

    if (!formData.message.trim()) {
      setError('Please write your review.');
      return;
    }

    const selectedBook = books.find(
      (book) => String(book._id) === String(formData.bookId)
    );

    if (!selectedBook) {
      setError('Selected novel was not found.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberId: member.id,
          customerName: member.fullName,
          customerEmail: member.email,
          bookId: selectedBook._id,
          bookTitle: selectedBook.title,
          rating: Number(formData.rating),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || 'Failed to submit review.');
        return;
      }

      setSuccess(
        'Thank you! Your review has been submitted successfully.'
      );

      setFormData({
        bookId: '',
        rating: 5,
        message: '',
      });
    } catch (error) {
      console.error('REVIEW SUBMIT ERROR:', error);
      setError('Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-12 text-white sm:px-6">

      <div className="relative z-10 mx-auto w-full max-w-2xl">

        {/* Header */}
        <div className="mb-8 text-center">

          <div className="mb-3 text-4xl">
            ⭐
          </div>

          <h1 className="font-serif text-3xl font-bold text-amber-400 sm:text-4xl">
            Share Your Experience
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Tell us what you think about the novel you purchased.
          </p>

        </div>

        {/* Login Warning */}
        {!member && (
          <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-center">

            <p className="text-sm text-slate-300">
              Please login to submit your review.
            </p>

            <Link
              href="/login"
              className="mt-3 inline-flex rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
            >
              Login
            </Link>

          </div>
        )}

        {/* Review Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-sm sm:p-8">

          {/* Success */}
          {success && (
            <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400">
              {success}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Customer */}
            {member && (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">

                <p className="text-xs text-slate-500">
                  Reviewing as
                </p>

                <p className="mt-1 font-semibold text-slate-200">
                  {member.fullName}
                </p>

                <p className="text-xs text-slate-400">
                  {member.email}
                </p>

              </div>
            )}

            {/* Select Novel */}
            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Select Novel
              </label>

              <select
                name="bookId"
                value={formData.bookId}
                onChange={handleChange}
                disabled={booksLoading || !member}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
              >

                <option value="">
                  {booksLoading
                    ? 'Loading novels...'
                    : books.length === 0
                    ? 'No novels available'
                    : 'Select a novel'}
                </option>

                {books.map((book) => (
                  <option
                    key={book._id}
                    value={book._id}
                  >
                    {book.title} — {book.author}
                  </option>
                ))}

              </select>

              {!booksLoading && books.length > 0 && (
                <p className="mt-2 text-xs text-slate-500">
                  {books.length} novels available
                </p>
              )}

            </div>

            {/* Rating */}
            <div>

              <label className="mb-3 block text-sm font-medium text-slate-300">
                Your Rating
              </label>

              <div className="flex items-center gap-2">

                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    disabled={!member}
                    onClick={() => handleRating(star)}
                    className={`text-3xl transition duration-200 hover:scale-110 ${
                      star <= formData.rating
                        ? 'text-amber-400'
                        : 'text-slate-700'
                    }`}
                    aria-label={`${star} star`}
                  >
                    ★
                  </button>
                ))}

                <span className="ml-2 text-sm text-slate-400">
                  {formData.rating}/5
                </span>

              </div>

            </div>

            {/* Message */}
            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Your Review
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={!member}
                rows={6}
                maxLength={1000}
                placeholder="Write your experience about the novel..."
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
              />

              <p className="mt-2 text-right text-xs text-slate-500">
                {formData.message.length}/1000
              </p>

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !member || books.length === 0}
              className="w-full rounded-xl bg-amber-500 py-3.5 font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? 'Submitting Review...'
                : 'Submit Review'}
            </button>

          </form>

          {/* Back */}
          <div className="mt-6 text-center">

            <Link
              href="/books"
              className="text-sm text-slate-400 transition hover:text-amber-400"
            >
              ← Back to Novels
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}