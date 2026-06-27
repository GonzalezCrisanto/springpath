export function Logo() {
  return (
    <svg
      viewBox="0 0 30 36"
      width="20"
      height="24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Shared vertical stem — P's stroke and S's left spine */}
      <line x1="6" y1="2" x2="6" y2="34" stroke="#1D9E75" strokeWidth="3" strokeLinecap="round" />
      {/* Top lobe — doubles as both P's bowl and S's upper curve */}
      <path d="M 6 2 C 6 2 24 2 24 11 C 24 20 6 20 6 20" stroke="#1D9E75" strokeWidth="3" strokeLinecap="round" />
      {/* Bottom lobe — S's lower curve */}
      <path d="M 6 20 C 6 20 24 20 24 29 C 24 34 6 34 6 34" stroke="#1D9E75" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
