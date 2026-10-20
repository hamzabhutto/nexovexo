import Reveal from "@/components/Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: Props) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={140}>
          <p className={`mt-4 text-base leading-relaxed text-muted sm:text-lg ${isCenter ? "mx-auto max-w-xl" : ""}`}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
