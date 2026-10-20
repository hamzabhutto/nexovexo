import Image from "next/image";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
};

/**
 * NexoVexo "N" ribbon mark.
 *
 * Uses a background-removed (transparent) version of the brand asset so the
 * glowing "N" floats on any surface with no black/navy box behind it.
 */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <Image
      src="/logo-mark-transparent.png"
      alt="NexoVexo"
      width={160}
      height={160}
      priority
      className={`${className} object-contain`}
    />
  );
}

export default function Logo({
  className = "h-9 w-9",
  showWordmark = true,
  wordmarkClassName = "text-lg",
}: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark className={className} />
      {showWordmark && (
        <span
          className={`font-display font-bold uppercase tracking-[0.16em] text-foreground ${wordmarkClassName}`}
        >
          Nexovexo
        </span>
      )}
    </span>
  );
}
