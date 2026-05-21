export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="52" height="52" rx="14" fill="#06110D" />
      <rect x="6" y="6" width="52" height="52" rx="14" stroke="#00D6A3" strokeOpacity="0.78" strokeWidth="3" />
      <path d="M32 15v34" stroke="#163B31" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 32h30" stroke="#163B31" strokeWidth="2" strokeLinecap="round" />
      <path d="M23 20h18v8H23z" fill="#00D6A3" fillOpacity="0.14" stroke="#00D6A3" strokeWidth="2" />
      <path d="M20 28h24v16H20z" fill="#00D6A3" fillOpacity="0.08" stroke="#00D6A3" strokeWidth="2" />
      <path d="M25 44v-8h14v8" stroke="#D4AF37" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 24h10M25 32h14M25 37h8" stroke="#F7FBF7" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="44" cy="44" r="6" fill="#D4AF37" />
      <path d="M41.5 44.2l1.8 1.9 3.4-4" stroke="#06110D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
