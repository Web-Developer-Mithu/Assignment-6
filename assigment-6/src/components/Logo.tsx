import Link from "next/link";

interface LogoProps {
  variant?: "horizontal" | "diagonal";
  size?: number;
  className?: string;
  showText?: boolean;
  href?: string;
}

export default function Logo({
  variant = "horizontal",
  size = 20,
  className = "",
  showText = true,
  href,
}: LogoProps) {
  const content = (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {variant === "horizontal" ? (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#ccff00] shrink-0"
        >
          {/* Outer left plate */}
          <rect x="3" y="6" width="2.5" height="12" rx="1" fill="currentColor" />
          {/* Inner left collar */}
          <rect x="6.5" y="8" width="1.5" height="8" rx="0.75" fill="currentColor" />
          {/* Central Bar */}
          <rect x="8" y="10.75" width="8" height="2.5" rx="0.5" fill="currentColor" />
          {/* Inner right collar */}
          <rect x="16" y="8" width="1.5" height="8" rx="0.75" fill="currentColor" />
          {/* Outer right plate */}
          <rect x="18.5" y="6" width="2.5" height="12" rx="1" fill="currentColor" />
        </svg>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#ccff00] shrink-0"
        >
          <path d="m6.5 6.5 11 11" />
          <path d="m21 21-1-1" />
          <path d="m3 3 1 1" />
          <path d="m18 22 4-4" />
          <path d="m2 6 4-4" />
          <path d="m3 10 7-7" />
          <path d="m14 21 7-7" />
        </svg>
      )}

      {showText && (
        <span className="text-sm sm:text-base font-black tracking-widest text-white uppercase">
          FITLOG
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
