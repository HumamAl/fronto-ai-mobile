// Asymmetric Split hero — linear aesthetic.
// Dark 60% left panel (value prop + badge + name), lighter 40% right sidebar (stats).
// No "use client" needed.

import { APP_CONFIG } from "@/lib/config";

interface ProposalHeroProps {
  name: string;
  tagline: string;
  stats: Array<{ value: string; label: string }>;
}

export function ProposalHero({ name, tagline, stats }: ProposalHeroProps) {
  const projectLabel =
    APP_CONFIG.clientName !== null ? APP_CONFIG.clientName : APP_CONFIG.projectName;

  return (
    <section className="overflow-hidden rounded-[var(--radius-lg)]">
      <div className="flex flex-col md:flex-row">
        {/* ── Left panel — dark, 60% width on md+ ── */}
        <div
          className="flex-1 md:basis-[62%] p-8 md:p-10 space-y-6 relative"
          style={{
            background: "oklch(0.10 0.02 var(--primary-h))",
            backgroundImage:
              "radial-gradient(ellipse at 25% 40%, oklch(0.55 0.12 var(--primary-h) / 0.14), transparent 60%)",
          }}
        >
          {/* Effort badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5">
            <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/50 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/60">
              Built this demo for {projectLabel}
            </span>
          </div>

          {/* Name + role */}
          <div className="space-y-1">
            <p className="font-mono text-[10px] tracking-widest uppercase text-white/35">
              Founding Mobile Developer
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none text-white">
              {name}
            </h1>
          </div>

          {/* Value prop */}
          <p className="text-base md:text-lg text-white/65 leading-relaxed max-w-sm">
            {tagline}
          </p>
        </div>

        {/* ── Right sidebar — lighter, stats vertical ── */}
        <div
          className="md:basis-[38%] border-t md:border-t-0 md:border-l border-white/8 p-8 md:p-10 flex flex-col justify-between gap-8"
          style={{ background: "oklch(0.135 0.025 var(--primary-h))" }}
        >
          {/* Stats — vertical on desktop, horizontal grid on mobile */}
          <div className="grid grid-cols-3 md:grid-cols-1 gap-6 md:gap-7">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-0.5">
                <div className="font-mono text-2xl md:text-3xl font-bold text-white tabular-nums leading-none">
                  {stat.value}
                </div>
                <div className="text-xs text-white/45 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Availability row */}
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--success)]/70 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[color:var(--success)]" />
            </span>
            <span className="font-mono text-[10px] tracking-wider uppercase text-white/40">
              Available now
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
