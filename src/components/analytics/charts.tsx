"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  conversationVolumeByMonth,
  intentBreakdown,
  agentPerformanceChart,
  containmentTrend,
} from "@/data/mock-data";

// ─── Shared tooltip style ──────────────────────────────────────────────────────

const tooltipStyle: React.CSSProperties = {
  background: "var(--background)",
  border: "1px solid var(--border)",
  borderRadius: "0.375rem",
  fontSize: "9px",
  fontFamily: "var(--font-mono, monospace)",
  color: "var(--foreground)",
  boxShadow: "0 2px 8px oklch(0 0 0 / 0.10)",
  padding: "6px 10px",
};

// ─── Chart colors (harmonized to indigo hue 260) ──────────────────────────────
const C1 = "oklch(0.58 0.22 260)";   // primary indigo
const C2 = "oklch(0.55 0.20 290)";   // violet
const C3 = "oklch(0.627 0.194 149)"; // success green
const C4 = "oklch(0.60 0.18 320)";   // pink-magenta
const C5 = "oklch(0.72 0.18 80)";    // amber

// ─── Volume trend chart ────────────────────────────────────────────────────────
// Area chart: inbound + outbound over 12 months

export function VolumeTrendChart() {
  // Simplified to last 6 months for mobile
  const data = conversationVolumeByMonth.slice(-6);
  return (
    <ResponsiveContainer width="100%" height={80}>
      <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
        <defs>
          <linearGradient id="gradOutbound" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={C1} stopOpacity={0.3} />
            <stop offset="95%" stopColor={C1} stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="gradInbound" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={C3} stopOpacity={0.25} />
            <stop offset="95%" stopColor={C3} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="month"
          tick={{ fontSize: 8, fill: "var(--muted-foreground)", fontFamily: "var(--font-mono, monospace)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis hide />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
        />
        <Area
          type="monotone"
          dataKey="outbound"
          stroke={C1}
          strokeWidth={1.5}
          fill="url(#gradOutbound)"
          name="Outbound"
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="inbound"
          stroke={C3}
          strokeWidth={1.5}
          fill="url(#gradInbound)"
          name="Inbound"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ─── Intent breakdown chart ───────────────────────────────────────────────────
// Horizontal bar chart: top 5 intents by count

export function IntentBreakdownChart() {
  const data = intentBreakdown
    .slice(0, 5)
    .map((d) => ({ ...d, label: d.intent.length > 14 ? d.intent.slice(0, 14) + "…" : d.intent }));

  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 8, bottom: 0, left: 0 }}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="label"
          tick={{ fontSize: 8, fill: "var(--muted-foreground)", fontFamily: "var(--font-mono, monospace)" }}
          axisLine={false}
          tickLine={false}
          width={78}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
          formatter={(value: number | undefined, name: string | undefined) =>
            name === "count" ? [value ?? 0, "Calls"] : [`${value ?? 0}%`, "Booking Rate"]
          }
        />
        <Bar dataKey="count" fill={C1} radius={[0, 2, 2, 0]} barSize={8} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Agent performance chart ──────────────────────────────────────────────────
// Grouped bar: containment rate + booking rate per agent

export function AgentPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={90}>
      <BarChart
        data={agentPerformanceChart}
        margin={{ top: 4, right: 4, bottom: 0, left: -24 }}
        barCategoryGap="30%"
        barGap={2}
      >
        <XAxis
          dataKey="name"
          tick={{ fontSize: 8, fill: "var(--muted-foreground)", fontFamily: "var(--font-mono, monospace)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 7, fill: "var(--muted-foreground)", fontFamily: "var(--font-mono, monospace)" }}
          axisLine={false}
          tickLine={false}
          domain={[0, 100]}
          tickCount={3}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
          formatter={(value: number | undefined, name: string | undefined) => [`${value ?? 0}%`, name === "containmentRate" ? "Contained" : "Booking"]}
        />
        <Bar dataKey="containmentRate" fill={C1} radius={[2, 2, 0, 0]} barSize={8} name="containmentRate" />
        <Bar dataKey="bookingRate" fill={C3} radius={[2, 2, 0, 0]} barSize={8} name="bookingRate" />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Containment trend sparkline ──────────────────────────────────────────────
// Thin area chart showing 30-day containment rate trend

export function ContainmentSparkline() {
  const data = containmentTrend.slice(-8);
  return (
    <ResponsiveContainer width="100%" height={48}>
      <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="gradContainment" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={C1} stopOpacity={0.25} />
            <stop offset="95%" stopColor={C1} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
          formatter={(value: number | undefined) => [`${value ?? 0}%`, "Contained"]}
        />
        <Area
          type="monotone"
          dataKey="containmentRate"
          stroke={C1}
          strokeWidth={1.5}
          fill="url(#gradContainment)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
