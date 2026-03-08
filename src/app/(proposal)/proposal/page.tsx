// Tab 3: Work With Me — conversion-optimized sales page.
// Aesthetic: linear / indigo-violet — asymmetric split hero, featured+grid portfolio,
// vertical timeline process, pill-tag skills grid, dark panel CTA.
// Server Component — no "use client".

import type { Metadata } from "next";
import { APP_CONFIG } from "@/lib/config";
import { profile, portfolioProjects } from "@/data/proposal";
import { ProposalHero } from "@/components/proposal/proposal-hero";
import { ProofOfWork } from "@/components/proposal/proof-of-work";
import { HowIWork } from "@/components/proposal/how-i-work";
import { SkillsGrid } from "@/components/proposal/skills-grid";

export const metadata: Metadata = {
  title: `Work With Me | ${APP_CONFIG.appName}`,
};

const heroStats = [
  { value: "24+", label: "Projects shipped" },
  { value: "< 48hr", label: "Demo turnaround" },
  { value: "15+", label: "Industries served" },
];

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8 md:px-6 space-y-10">

        {/* ── Hero — asymmetric split, dark panel left + stats sidebar right ── */}
        <ProposalHero
          name={profile.name}
          tagline={profile.tagline}
          stats={heroStats}
        />

        {/* ── Proof of Work — featured card + 3-col grid ── */}
        <ProofOfWork projects={portfolioProjects} />

        {/* ── How I Work — vertical timeline, greenfield methodology ── */}
        <HowIWork steps={profile.approach} />

        {/* ── Skills Grid — relevant tech only ── */}
        <SkillsGrid categories={profile.skillCategories} />

        {/* ── CTA close — dark panel ── */}
        <section
          className="rounded-[var(--radius-lg)] p-8 md:p-10 text-center space-y-4"
          style={{
            background: "oklch(0.10 0.02 var(--primary-h))",
            backgroundImage:
              "radial-gradient(ellipse at 50% 0%, oklch(0.55 0.12 var(--primary-h) / 0.12), transparent 60%)",
          }}
        >
          {/* Availability */}
          <div className="flex items-center justify-center gap-2">
            <span className="relative inline-flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--success)]/70 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--success)]" />
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/45">
              Currently available for new projects
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Ready to own this from day one.
          </h2>

          <p className="text-sm text-white/60 max-w-sm mx-auto leading-relaxed">
            Your voice AI stack needs an architect, not a contractor. I&apos;ve built AI
            pipelines, CRM integrations, and scheduling systems. The demo is just
            the start — production will be even better.
          </p>

          <p className="text-sm font-semibold text-primary pt-1">
            Reply on Upwork to start
          </p>

          <div className="pt-3 space-y-2">
            <a
              href="/"
              className="block text-xs text-white/30 hover:text-white/55 transition-colors"
              style={{ transitionDuration: "var(--dur-fast)" }}
            >
              ← Back to the demo
            </a>
            <p className="text-xs text-white/35">— Humam</p>
          </div>
        </section>

      </div>
    </div>
  );
}
