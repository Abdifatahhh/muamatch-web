// Brand logo: the original pink MM icon (taken from LogoPink.svg) paired with
// a modern bold wordmark set in the site font instead of the thin SVG text.
// The wordmark follows the theme (foreground color), so it stays readable in
// dark mode where the old baked-in dark text disappeared.

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="127.5 0 197 197"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path
        d="M324.351 98.4054C324.346 117.861 318.572 136.878 307.759 153.053C296.947 169.227 281.581 181.832 263.605 189.275C245.629 196.717 225.85 198.662 206.769 194.864C187.687 191.066 170.16 181.696 156.404 167.938C142.648 154.179 133.28 136.651 129.485 117.569C125.689 98.4876 127.637 78.7087 135.082 60.7338C142.527 42.7587 155.134 27.3949 171.31 16.5844C187.486 5.77405 206.504 0.00267322 225.959 0C238.881 0.000709816 251.677 2.54662 263.614 7.49238C275.553 12.4381 286.4 19.6869 295.536 28.8246C304.673 37.9624 311.92 48.8105 316.864 60.7492C321.808 72.6878 324.352 85.4835 324.351 98.4054Z"
        fill="#F15E66"
      />
      <path d="M163.732 154.951H168.365V63.9944L176.376 77.0052V68.6268L163.732 48.8835V154.951Z" fill="#fff" />
      <path
        d="M226.781 132.773L199.94 94.7138V102.665L224.384 137.43L226.716 140.568L285.094 63.3111V154.952H289.751V49.4219L226.781 132.773Z"
        fill="#fff"
      />
      <path
        d="M262.341 53.7462V67.8732L266.997 62.7948V39.8543L226.359 93.6813L185.697 39.8543V155.827H190.33V53.7462L226.335 101.395L262.341 53.7462Z"
        fill="#fff"
      />
      <path d="M262.338 154.902H266.997V101.821L262.338 107.851V154.902Z" fill="#fff" />
    </svg>
  );
}

export function Logo({
  iconClassName = "h-10 w-10 sm:h-11 sm:w-11",
  textClassName = "text-base sm:text-lg",
}: {
  iconClassName?: string;
  textClassName?: string;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoIcon className={`${iconClassName} shrink-0 drop-shadow-sm`} />
      <span
        className={`${textClassName} font-bold uppercase leading-none tracking-[0.22em]`}
      >
        <span className="text-primary">MUA</span>{" "}
        <span className="text-foreground">Match</span>
      </span>
    </span>
  );
}
