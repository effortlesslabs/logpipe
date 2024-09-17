export function Separator({
  className = "",
  size = "24",
}: {
  size: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      {/* shape-rendering="geometricPrecision"
  style="color: var(--accents-2); width: 22px; height: 22px;" */}
      <path
        d="M16.88 3.549L7.12 20.451"
        fill="currentColor"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></path>
    </svg>
  );
}
