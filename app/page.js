import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">

          <span className="inline-block mb-6 rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            ✨ Welcome to Rooh-e-Dastaan
          </span>

          <h1 className="text-5xl md:text-7xl font-serif font-extrabold leading-tight">
            لفظوں کی خوشبو،
            <br />
            <span className="text-amber-400">
              داستانوں کی روح
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-lg">
            ہر کتاب ایک نیا سفر ہے، اور ہر لفظ دل کی دھڑکن۔
            اردو ادب کے خوبصورت ناولز دریافت کریں اور اپنی
            پسندیدہ کتابیں آسانی سے حاصل کریں۔
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/books"
              className="rounded-xl bg-amber-500 px-8 py-4 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
            >
              📚 Explore Collections
            </Link>

            
          </div>

        </div>
      </section>

    </div>
  );
}