import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900 bg-[#08080a] py-6 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Brand Logo & Title */}
        <Logo variant="horizontal" size={22} />

        {/* Right: Copyright & Tagline */}
        <p className="text-xs sm:text-sm text-zinc-500 font-normal text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
