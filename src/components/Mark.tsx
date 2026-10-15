/**
 * The Transformation Church mark, traced from the church's reference logo.
 * The taller triangle and thinner inner diagonal keep its original proportions.
 */
export function Mark({
  className = "",
  draw = false,
  strokeWidth = 4,
}: {
  className?: string;
  draw?: boolean;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="-3 -4 106 96"
      className={`${className} ${draw ? "draw" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="miter"
      aria-hidden
    >
      <polygon points="50,2 2,84 98,84" pathLength={1} />
      <line x1="31" y1="34.5" x2="60" y2="84" strokeWidth={strokeWidth * 0.6} pathLength={1} className="late" />
    </svg>
  );
}

/** The lowercase wordmark, set the way their logo sets it. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`whitespace-nowrap lowercase tracking-[-0.02em] ${className}`}>
      <span className="font-bold">transformation</span>
      <span className="font-light">church</span>
    </span>
  );
}
