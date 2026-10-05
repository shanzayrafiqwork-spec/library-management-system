"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();

        if (data.success) {
          setReviews(data.reviews || []);
        }
      } catch (error) {
        console.error("Failed to load reviews:", error);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="relative flex min-h-[calc(100vh-80px)] items-center">

        <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-12">

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">

            {/* =========================
                LEFT SIDE
            ========================= */}
            <div className="text-center lg:text-left">

              <div className="mb-5 inline-flex items-center rounded-full border border-amber-500/30 bg-slate-950/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-400 backdrop-blur-md sm:text-xs">
                ✨ Welcome to Rooh-e-Dastaan
              </div>

              <h1 className="font-serif text-4xl font-extrabold leading-[1.2] tracking-tight drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                لفظوں کی خوشبو،
                <br />

                <span className="text-amber-400">
                  داستانوں کی روح
                </span>
              </h1>

              <div className="mt-8">
                <Link
                  href="/books"
                  className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-amber-500 px-8 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-amber-500/20 transition duration-300 hover:scale-105 hover:bg-amber-400 sm:w-auto"
                >
                  📚 Explore Collections
                </Link>
              </div>

            </div>

            {/* =========================
                RIGHT SIDE
            ========================= */}
            <div className="relative mx-auto flex min-h-[500px] w-full max-w-[520px] items-center justify-center">

              <div className="absolute h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

              <div className="relative z-10 max-w-[340px] text-center">
                <p className="font-serif text-base italic leading-8 text-amber-200/90 sm:text-lg sm:leading-9">
                  ہم نے دیکھے ہیں کتابوں میں بسے وہ چہرے،
                  <br />
                  جو حقیقت میں کبھی مل نہ سکے ہم کو۔
                </p>
              </div>

              {/* BOOKS */}

              <img
                src="/novels/rooh-e-yaram.jpg"
                alt=""
                className="absolute left-[14%] top-[8%] z-20 h-28 w-20 -rotate-[28deg] rounded-md object-cover shadow-2xl transition duration-500 hover:scale-110 sm:h-36 sm:w-24"
              />

              <img
                src="/novels/jannat-ke-pattay.jpg"
                alt=""
                className="absolute left-[40%] top-[1%] z-20 h-28 w-20 rotate-[18deg] rounded-md object-cover shadow-2xl transition duration-500 hover:scale-110 sm:h-36 sm:w-24"
              />

              <img
                src="/novels/namal.jpg"
                alt=""
                className="absolute right-[10%] top-[8%] z-20 h-28 w-20 rotate-[30deg] rounded-md object-cover shadow-2xl transition duration-500 hover:scale-110 sm:h-36 sm:w-24"
              />

              <img
                src="/novels/peer-e-kamil.jpg"
                alt=""
                className="absolute left-[2%] top-[43%] z-20 h-28 w-20 -rotate-[42deg] rounded-md object-cover shadow-2xl transition duration-500 hover:scale-110 sm:h-36 sm:w-24"
              />

              <img
                src="/novels/amarbail.jpg"
                alt=""
                className="absolute right-[2%] top-[43%] z-20 h-28 w-20 rotate-[42deg] rounded-md object-cover shadow-2xl transition duration-500 hover:scale-110 sm:h-36 sm:w-24"
              />

              <img
                src="/novels/mushaf.jpg"
                alt=""
                className="absolute bottom-[5%] left-[18%] z-20 h-28 w-20 rotate-[20deg] rounded-md object-cover shadow-2xl transition duration-500 hover:scale-110 sm:h-36 sm:w-24"
              />

              <img
                src="/novels/halim.jpg"
                alt=""
                className="absolute bottom-[5%] right-[18%] z-20 h-28 w-20 -rotate-[25deg] rounded-md object-cover shadow-2xl transition duration-500 hover:scale-110 sm:h-36 sm:w-24"
              />

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          REVIEWS SECTION
      ========================= */}
      <section className="relative z-10 border-t border-slate-800/70 py-20">

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">

          {/* Heading */}
          <div className="mb-12 text-center">

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
              Reader Experiences
            </p>

            <h2 className="font-serif text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              What Our Readers Say
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              ہمارے قارئین نے Rooh-e-Dastaan اور اپنی پسندیدہ کتابوں کے بارے
              میں کیا کہا، دیکھیے۔
            </p>

          </div>


          {/* Loading */}
          {reviewsLoading && (
            <div className="py-12 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-amber-400" />

              <p className="mt-4 text-sm text-slate-500">
                Loading reviews...
              </p>
            </div>
          )}


          {/* No Reviews */}
          {!reviewsLoading && reviews.length === 0 && (
            <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-12 text-center backdrop-blur-sm">

              <div className="mb-4 text-5xl">
                ⭐
              </div>

              <h3 className="text-xl font-bold text-white">
                No reviews yet
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                ابھی تک کوئی review submit نہیں کیا گیا۔
                <br />
                Be the first reader to share your experience.
              </p>

              <Link
                href="/review"
                className="mt-6 inline-flex rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
              >
                ✍️ Write a Review
              </Link>

            </div>
          )}


          {/* Reviews */}
          {!reviewsLoading && reviews.length > 0 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-amber-500/40"
                  >

                    {/* Stars */}
                    <div className="mb-4 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={
                            star <= Number(review.rating)
                              ? "text-lg text-amber-400"
                              : "text-lg text-slate-700"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>


                    {/* Message */}
                    <p className="min-h-[90px] text-sm leading-7 text-slate-300">
                      “{review.message}”
                    </p>


                    {/* Divider */}
                    <div className="my-5 border-t border-slate-800" />


                    {/* Customer */}
                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-lg">
                        👤
                      </div>

                      <div className="min-w-0">

                        <h3 className="truncate text-sm font-bold text-white">
                          {review.customerName}
                        </h3>

                        <p className="truncate text-xs text-amber-400">
                          {review.bookTitle}
                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>


              {/* Review Button */}
              <div className="mt-10 text-center">

                <Link
                  href="/review"
                  className="inline-flex rounded-xl border border-amber-500/40 bg-amber-500/10 px-7 py-3 text-sm font-bold text-amber-400 transition hover:bg-amber-500 hover:text-slate-950"
                >
                  ✍️ Share Your Experience
                </Link>

              </div>

            </>
          )}

        </div>

      </section>

    </main>
  );
}