import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full">
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800/70 bg-[#0f1218] px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-14 lg:px-16 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Content Column */}
          <div className="flex flex-col items-start lg:col-span-7 z-10">
            {/* Tagline / Subheading */}
            <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#ccff00] uppercase">
              WORKOUT LIBRARY
            </span>

            {/* Main Title */}
            <h1 className="mt-4 text-2xl sm:text-4xl md:text-[40px] lg:text-[44px] xl:text-[48px] font-black uppercase tracking-tight text-white leading-[1.08]">
              <span className="block whitespace-normal sm:whitespace-nowrap">
                TRAIN WITH INTENT. LOG
              </span>
              <span className="block text-white">
                EVERY SET.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-zinc-400">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <a
                href="#library"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-6 py-3.5 text-xs sm:text-sm font-black tracking-wide text-black uppercase transition-all duration-200 hover:bg-[#d8ff33] hover:shadow-[0_0_20px_rgba(204,255,0,0.35)] active:scale-95 cursor-pointer"
              >
                <span>BROWSE WORKOUTS</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="flex items-center justify-center lg:col-span-5 relative">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none flex justify-center">
              <Image
                src="/banner.png"
                alt="Gym workout machine illustration"
                width={460}
                height={460}
                priority
                className="h-auto w-full max-h-[420px] object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
