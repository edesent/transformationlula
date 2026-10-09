/**
 * The Transformation Church mark, redrawn from their logo: an outlined
 * mountain with a second, smaller peak inside it.
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
      viewBox="-3 -4 106 70"
      className={`${className} ${draw ? "draw" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="miter"
      aria-hidden
    >
      <polygon points="50,2 2,62 98,62" pathLength={1} />
      <line x1="30.4" y1="26.5" x2="61" y2="62" pathLength={1} className="late" />
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
