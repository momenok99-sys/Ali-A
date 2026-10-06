type ArrowUpRightProps = {
  className?: string;
};

export function ArrowUpRight({ className = "" }: ArrowUpRightProps) {
  return (
    <svg
      className={`ui-arrow-up-right ${className}`.trim()}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 10 10 4M5.25 4H10v4.75" />
    </svg>
  );
}
