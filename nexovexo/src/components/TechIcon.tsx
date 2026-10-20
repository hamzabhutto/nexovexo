/* eslint-disable @next/next/no-img-element */

type TechIconProps = {
  /** Icon file name (without extension) under /public/tech */
  slug: string;
  className?: string;
};

/**
 * Renders a locally-hosted tech brand logo from /public/tech (Simple Icons,
 * CC0). Shown in full brand color; lifts slightly on hover via parent `group`.
 */
export default function TechIcon({ slug, className = "h-9 w-9" }: TechIconProps) {
  return (
    <img
      src={`/tech/${slug}.svg`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`${className} transition-transform duration-300 group-hover:scale-110`}
    />
  );
}
