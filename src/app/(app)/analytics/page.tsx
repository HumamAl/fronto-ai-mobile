"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { dashboardStats, agentPerformanceChart, intentBreakdown } from "@/data/mock-data";
import { cn } from "@/lib/utils";

// ─── Chart components — dynamic to avoid Recharts SSR issues ──────────────────

const VolumeTrendChart = dynamic(
  () => import("@/components/analytics/charts").then((m) => m.VolumeTrendChart),
  { ssr: false, loading: () => <ChartSkeleton height={80} /> }
);

const IntentBreakdownChart = dynamic(
  () => import("@/components/analytics/charts").then((m) => m.IntentBreakdownChart),
  { ssr: false, loading: () => <ChartSkeleton height={80} /> }
);

const AgentPerformanceChart = dynamic(
  () => import("@/components/analytics/charts").then((m) => m.AgentPerformanceChart),
  { ssr: false, loading: () => <ChartSkeleton height={90} /> }
);

const ContainmentSparkline = dynamic(
  () => import("@/components/analytics/charts").then((m) => m.ContainmentSparkline),
  { ssr: false, loading: () => <ChartSkeleton height={48} /> }
);

// ─── Chart skeleton (loading state) ──────────────────────────────────────────

function ChartSkeleton({ height }: { height: number }) {
  return (
    <div
      className="w-full rounded-sm animate-pulse"
      style={{ height, background: "var(--muted)" }}
    />
  );
}

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ─── Trend indicator ──────────────────────────────────────────────────────────

function TrendIndicator({ change, suffix = "" }: { change: number; suffix?: string }) {
  const isPositive = change > 0;
  const isNegative = change < 0;
  // For latency, lower is better so we invert color
  return (
    <span
      className="text-[9px] font-semibold tabular-nums"
      style={{
        fontFamily: "var(--font-mono, monospace)",
        color: isPositive ? "var(--success)" : isNegative ? "var(--destructive)" : "var(--muted-foreground)",
      }}
    >
      {isPositive ? "↑" : isNegative ? "↓" : "—"}
      {Math.abs(change)}{suffix}
    </span>
  );
}

// ─── KPI stat card ────────────────────────────────────────────────────────────

function KpiCard({
  value,
  label,
  suffix,
  change,
  changeSuffix,
  invertChange,
  animationDelay,
}: {
  value: number;
  label: string;
  suffix?: string;
  change: number;
  changeSuffix?: string;
  invertChange?: boolean;
  animationDelay?: number;
}) {
  const { count, ref } = useCountUp(Math.round(value));
  const effectiveChange = invertChange ? -change : change;
  const isGood = effectiveChange > 0;
  const isBad = effectiveChange < 0;

  return (
    <div
      ref={ref}
      className="px-2.5 py-2 border border-border/60 rounded-sm"
      style={{
        background: "var(--card)",
        animationDelay: `${animationDelay ?? 0}ms`,
      }}
    >
      <span
        className="text-[16px] font-bold tabular-nums leading-none block mb-0.5"
        style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--foreground)" }}
      >
        {count}{suffix}
      </span>
      <span className="text-[9px] text-muted-foreground block mb-1">{label}</span>
      <span
        className="text-[9px] font-semibold tabular-nums"
        style={{
          fontFamily: "var(--font-mono, monospace)",
          color: isGood ? "var(--success)" : isBad ? "var(--destructive)" : "var(--muted-foreground)",
        }}
      >
        {effectiveChange > 0 ? "↑" : effectiveChange < 0 ? "↓" : "—"}
        {Math.abs(change)}{changeSuffix ?? ""}
      </span>
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <p
      className="text-[9px] font-bold uppercase tracking-widest mb-2"
      style={{ color: "var(--muted-foreground)" }}
    >
      {label}
    </p>
  );
}

// ─── Agent performance row ─────────────────────────────────────────────────────

function AgentRow({
  name,
  containmentRate,
  bookingRate,
}: {
  name: string;
  containmentRate: number;
  bookingRate: number;
}) {
  return (
    <div className="flex items-center gap-2 py-1.5 border-b border-border/40 last:border-b-0">
      <div
        className="w-5 h-5 rounded-sm flex items-center justify-center text-[9px] font-bold text-primary-foreground shrink-0"
        style={{ background: "var(--primary)" }}
      >
        {name[0]}
      </div>
      <span className="text-[10px] font-medium text-foreground flex-1">{name}</span>
      <div className="flex items-center gap-2 shrink-0">
        <span
          className="text-[9px] tabular-nums"
          style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--primary)" }}
        >
          {containmentRate}%
        </span>
        <span
          className="text-[9px] tabular-nums"
          style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--success)" }}
        >
          {bookingRate}%
        </span>
      </div>
    </div>
  );
}

// ─── Period toggle ────────────────────────────────────────────────────────────

type Period = "7d" | "30d" | "90d";

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("30d");

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "var(--background)" }}>
      {/* ── Header ──────────────────────────────────────────────── */}
      <div
        className="px-3 py-2.5 border-b border-border/60 shrink-0"
        style={{ background: "var(--sidebar-bg)" }}
      >
        <div className="flex items-center justify-between">
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "var(--primary)" }}
          >
            Performance Signals
          </p>
          {/* Period selector */}
          <div
            className="flex rounded-sm overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            {(["7d", "30d", "90d"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "px-2 py-0.5 text-[9px] font-semibold transition-colors",
                  period === p
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                style={{
                  transitionDuration: "var(--dur-fast)",
                  background: period === p ? "var(--primary)" : "transparent",
                  fontFamily: "var(--font-mono, monospace)",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="flex-1 px-3 py-3 space-y-4">

        {/* KPI cards */}
        <div>
          <SectionLabel label="Today's Signals" />
          <div className="grid grid-cols-2 gap-2">
            <KpiCard
              value={dashboardStats.containmentRate}
              label="Contained"
              suffix="%"
              change={dashboardStats.containmentRateChange}
              changeSuffix="%"
              animationDelay={0}
            />
            <KpiCard
              value={dashboardStats.appointmentsBookedToday}
              label="Booked Today"
              change={dashboardStats.appointmentsBookedChange}
              changeSuffix=""
              animationDelay={60}
            />
            <KpiCard
              value={dashboardStats.conversationsToday}
              label="Conversations"
              change={dashboardStats.conversationsTodayChange}
              changeSuffix="%"
              animationDelay={120}
            />
            <KpiCard
              value={dashboardStats.avgResponseLatencyMs}
              label="Avg Latency"
              suffix="ms"
              change={Math.abs(dashboardStats.avgResponseLatencyChange)}
              changeSuffix="ms"
              invertChange
              animationDelay={180}
            />
          </div>
        </div>

        {/* Containment trend sparkline */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <SectionLabel label="Containment Rate — 30d Trend" />
            <span
              className="text-[9px] tabular-nums"
              style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--success)" }}
            >
              74.8% ↑
            </span>
          </div>
          <div
            className="px-2 py-2 rounded-sm border border-border/60"
            style={{ background: "var(--card)" }}
          >
            <ContainmentSparkline />
          </div>
        </div>

        {/* Conversation volume chart */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <SectionLabel label="Call Volume — 6 Month" />
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-0.5">
                <span className="w-2 h-1 rounded-sm inline-block" style={{ background: "oklch(0.58 0.22 260)" }} />
                <span className="text-[8px] text-muted-foreground">Out</span>
              </span>
              <span className="flex items-center gap-0.5">
                <span className="w-2 h-1 rounded-sm inline-block" style={{ background: "oklch(0.627 0.194 149)" }} />
                <span className="text-[8px] text-muted-foreground">In</span>
              </span>
            </div>
          </div>
          <div
            className="px-2 py-2 rounded-sm border border-border/60"
            style={{ background: "var(--card)" }}
          >
            <VolumeTrendChart />
          </div>
        </div>

        {/* Intent breakdown */}
        <div>
          <SectionLabel label="Intent Breakdown — Top 5" />
          <div
            className="px-2 py-2 rounded-sm border border-border/60"
            style={{ background: "var(--card)" }}
          >
            <IntentBreakdownChart />
          </div>
          {/* Top intent booking rate */}
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[9px] text-muted-foreground">Highest booking intent</span>
            <span
              className="text-[9px] font-semibold tabular-nums"
              style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--success)" }}
            >
              {intentBreakdown[0].intent} — {intentBreakdown[0].bookingRate}%
            </span>
          </div>
        </div>

        {/* Agent performance */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <SectionLabel label="Agent Performance" />
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-0.5">
                <span className="w-2 h-1 rounded-sm inline-block" style={{ background: "oklch(0.58 0.22 260)" }} />
                <span className="text-[8px] text-muted-foreground">Contain</span>
              </span>
              <span className="flex items-center gap-0.5">
                <span className="w-2 h-1 rounded-sm inline-block" style={{ background: "oklch(0.627 0.194 149)" }} />
                <span className="text-[8px] text-muted-foreground">Book</span>
              </span>
            </div>
          </div>
          <div
            className="px-2 py-2 rounded-sm border border-border/60 mb-2"
            style={{ background: "var(--card)" }}
          >
            <AgentPerformanceChart />
          </div>
          {/* Agent leaderboard */}
          <div
            className="px-2.5 py-1 rounded-sm border border-border/60"
            style={{ background: "var(--card)" }}
          >
            <div className="flex items-center gap-2 py-1 mb-0.5">
              <span className="text-[8px] text-muted-foreground flex-1">Agent</span>
              <span className="text-[8px] text-muted-foreground w-10 text-right" style={{ fontFamily: "var(--font-mono, monospace)" }}>Contain</span>
              <span className="text-[8px] text-muted-foreground w-10 text-right" style={{ fontFamily: "var(--font-mono, monospace)" }}>Book</span>
            </div>
            {agentPerformanceChart
              .sort((a, b) => b.containmentRate - a.containmentRate)
              .map((agent) => (
                <AgentRow
                  key={agent.name}
                  name={agent.name}
                  containmentRate={agent.containmentRate}
                  bookingRate={agent.bookingRate}
                />
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
