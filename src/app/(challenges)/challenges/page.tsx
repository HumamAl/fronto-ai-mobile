import Link from "next/link";
import { TrendingUp, ArrowRight, MessageSquare } from "lucide-react";
import { executiveSummary, challenges } from "@/data/challenges";
import { SyncArchitecture } from "@/components/challenges/sync-architecture";
import { CrmRetryFlow } from "@/components/challenges/crm-retry-flow";
import { CicdComparison } from "@/components/challenges/cicd-comparison";

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Page header ──────────────────────────────────────── */}
      <div className="border-b border-border/60 bg-background">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6 font-mono"
          >
            ← Back to the live demo
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">My Approach</h1>
          <p className="text-base text-muted-foreground mt-2 leading-relaxed max-w-xl">
            Three real technical challenges in this build — and how I&apos;d handle each one.
          </p>
        </div>
      </div>

      {/* ── Executive summary — Split Contrast ───────────────── */}
      <div
        className="border-b border-border/60"
        style={{ background: "var(--section-dark)" }}
      >
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-xs font-mono text-white/40 uppercase tracking-wider">Common approach</p>
              <p className="text-sm text-white/55 leading-relaxed">
                {executiveSummary.commonApproach}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-mono text-primary/80 uppercase tracking-wider">My approach</p>
              <p className="text-sm text-white/85 leading-relaxed">
                I build with an offline-first,{" "}
                <span className="text-primary font-semibold">{executiveSummary.accentPhrase}</span>{" "}
                from day one — so iOS and Android share a single source of truth, CRM writes degrade gracefully under throttle, and CI/CD ships both platforms on every commit without human gates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Challenge cards — Alternating Rhythm ─────────────── */}
      <div className="max-w-3xl mx-auto px-6">

        {/* Challenge 1 — Full-width primary treatment */}
        <div className="py-12 border-b border-border/40">
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <span className="text-4xl font-extralight text-primary/15 leading-none select-none tabular-nums mt-0.5">
                01
              </span>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">
                  {challenges[0].title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                  {challenges[0].description}
                </p>
              </div>
            </div>

            {/* Primary visualization — full width */}
            <div className="linear-card p-5">
              <SyncArchitecture />
            </div>

            {/* Outcome */}
            <div
              className="rounded-lg px-4 py-3 flex items-start gap-2.5"
              style={{
                background: "color-mix(in oklch, var(--success) 6%, transparent)",
                border: "1px solid color-mix(in oklch, var(--success) 15%, transparent)",
              }}
            >
              <TrendingUp className="w-4 h-4 text-[color:var(--success)] mt-0.5 shrink-0" />
              <p className="text-sm text-foreground/80 leading-relaxed">
                {challenges[0].outcome}
              </p>
            </div>
          </div>
        </div>

        {/* Challenge 2 — Standard treatment */}
        <div className="py-12 border-b border-border/40">
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <span className="text-4xl font-extralight text-primary/15 leading-none select-none tabular-nums mt-0.5">
                02
              </span>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">
                  {challenges[1].title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                  {challenges[1].description}
                </p>
              </div>
            </div>

            <div className="linear-card p-5">
              <CrmRetryFlow />
            </div>

            <div
              className="rounded-lg px-4 py-3 flex items-start gap-2.5"
              style={{
                background: "color-mix(in oklch, var(--success) 6%, transparent)",
                border: "1px solid color-mix(in oklch, var(--success) 15%, transparent)",
              }}
            >
              <TrendingUp className="w-4 h-4 text-[color:var(--success)] mt-0.5 shrink-0" />
              <p className="text-sm text-foreground/80 leading-relaxed">
                {challenges[1].outcome}
              </p>
            </div>
          </div>
        </div>

        {/* Challenge 3 — Interactive toggle before/after */}
        <div className="py-12">
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <span className="text-4xl font-extralight text-primary/15 leading-none select-none tabular-nums mt-0.5">
                03
              </span>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">
                  {challenges[2].title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                  {challenges[2].description}
                </p>
              </div>
            </div>

            <div className="linear-card p-5">
              <CicdComparison />
            </div>

            <div
              className="rounded-lg px-4 py-3 flex items-start gap-2.5"
              style={{
                background: "color-mix(in oklch, var(--success) 6%, transparent)",
                border: "1px solid color-mix(in oklch, var(--success) 15%, transparent)",
              }}
            >
              <TrendingUp className="w-4 h-4 text-[color:var(--success)] mt-0.5 shrink-0" />
              <p className="text-sm text-foreground/80 leading-relaxed">
                {challenges[2].outcome}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ── CTA closer ───────────────────────────────────────── */}
      <div
        className="border-t border-border/60"
        style={{ background: "oklch(0.975 0.008 260)" }}
      >
        <div className="max-w-3xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <p className="text-base font-semibold tracking-tight">Ready to dig into the architecture?</p>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                See the full proposal — timeline, stack choices, and how I&apos;d approach the greenfield setup. Or reply on Upwork to start directly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
              <Link
                href="/proposal"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors duration-150"
              >
                See the proposal
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs text-muted-foreground">Reply on Upwork to start</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
