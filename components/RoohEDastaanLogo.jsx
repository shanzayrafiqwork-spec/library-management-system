export function RoohEDastaanLogo({ className = "h-12" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Visual SVG Icon */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto aspect-square drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]"
      >
        {/* Glow/Background Circle */}
        <circle cx="50" cy="50" r="45" fill="#0F172A" stroke="#334155" strokeWidth="2" />
        
        {/* Crescent Moon */}
        <path
          d="M65 25C52 25 45 35 45 50C45 65 52 75 65 75C55 75 35 68 35 50C35 32 55 25 65 25Z"
          fill="#F59E0B"
          opacity="0.25"
        />

        {/* Open Book Pages */}
        <path
          d="M22 62C32 58 42 58 50 62C58 58 68 58 78 62V40C68 36 58 36 50 40C42 36 32 36 22 40V62Z"
          fill="#1E293B"
          stroke="#F59E0B"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        
        {/* Book Spine Center */}
        <line x1="50" y1="40" x2="50" y2="62" stroke="#F59E0B" strokeWidth="2" />

        {/* Feather Quill / Qalam */}
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

        {/* Little Magic Stars */}
        <circle cx="30" cy="28" r="1.5" fill="#FCD34D" />
        <circle cx="72" cy="26" r="2" fill="#FCD34D" />
        <circle cx="78" cy="34" r="1" fill="#FCD34D" />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-extrabold text-amber-400 font-serif tracking-wide leading-none">
          Rooh-e-Dastaan
        </span>
        <span className="text-[10px] md:text-xs text-slate-400 font-sans tracking-[0.2em] uppercase mt-1">
          روحِ داستان • Urdu Novels
        </span>
      </div>
    </div>
  );
}