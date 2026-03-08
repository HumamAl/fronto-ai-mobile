"use client";

import { useState, useEffect, useRef } from "react";
import {
  conversations,
  contacts,
  voiceAgents,
  dashboardStats,
  getContactById,
  getVoiceAgentById,
} from "@/data/mock-data";
import type { Conversation } from "@/lib/types";
import { APP_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 900) {
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

// ─── Live pulse dot ───────────────────────────────────────────────────────────

function LiveDot({ resolved = false }: { resolved?: boolean }) {
  if (resolved) {
    return <span className="inline-block w-2 h-2 rounded-full bg-success shrink-0" />;
  }
  return (
    <span className="relative inline-flex h-2 w-2 shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
    </span>
  );
}

// ─── CRM sync badge ───────────────────────────────────────────────────────────

function CrmBadge({ synced, error }: { synced: boolean; error?: string }) {
  if (error) {
    return (
      <span
        className="inline-flex items-center gap-0.5 text-[9px] font-medium px-1 py-0.5 rounded"
        style={{
          background: "oklch(0.577 0.245 27.325 / 0.12)",
          color: "var(--destructive)",
        }}
        title={error}
      >
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: "var(--destructive)" }}
        />
        CRM
      </span>
    );
  }
  if (synced) {
    return (
      <span
        className="inline-flex items-center gap-0.5 text-[9px] font-medium px-1 py-0.5 rounded"
        style={{
          background: "oklch(0.627 0.194 149.214 / 0.12)",
          color: "var(--success)",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: "var(--success)" }}
        />
        CRM
      </span>
    );
  }
  return null;
}

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_META: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  in_progress:      { label: "Live",        color: "var(--primary)",    bg: "oklch(0.58 0.22 260 / 0.12)" },
  transcribing:     { label: "Transcribing",color: "var(--primary)",    bg: "oklch(0.58 0.22 260 / 0.12)" },
  ringing:          { label: "Ringing",     color: "var(--primary)",    bg: "oklch(0.58 0.22 260 / 0.12)" },
  connected:        { label: "Connected",   color: "var(--primary)",    bg: "oklch(0.58 0.22 260 / 0.12)" },
  escalated:        { label: "Escalated",   color: "var(--warning-foreground)", bg: "oklch(0.769 0.188 70.08 / 0.18)" },
  low_confidence:   { label: "Low Conf.",   color: "var(--warning-foreground)", bg: "oklch(0.769 0.188 70.08 / 0.18)" },
  crm_sync_error:   { label: "Sync Error",  color: "var(--destructive)", bg: "oklch(0.577 0.245 27.325 / 0.12)" },
  dropped:          { label: "Dropped",     color: "var(--destructive)", bg: "oklch(0.577 0.245 27.325 / 0.12)" },
  appointment_booked:{ label: "Booked",     color: "var(--success)",    bg: "oklch(0.627 0.194 149.214 / 0.12)" },
  completed:        { label: "Completed",   color: "var(--success)",    bg: "oklch(0.627 0.194 149.214 / 0.12)" },
  voicemail_left:   { label: "Voicemail",   color: "var(--muted-foreground)", bg: "oklch(0.97 0.004 260)" },
  no_answer:        { label: "No Answer",   color: "var(--muted-foreground)", bg: "oklch(0.97 0.004 260)" },
  opted_out:        { label: "Opted Out",   color: "var(--muted-foreground)", bg: "oklch(0.97 0.004 260)" },
  failed:           { label: "Failed",      color: "var(--destructive)", bg: "oklch(0.577 0.245 27.325 / 0.12)" },
};

function StatusBadge({ status }: { status: string }) {
  const meta = STATUS_META[status] ?? { label: status, color: "var(--muted-foreground)", bg: "var(--muted)" };
  return (
    <span
      className="text-[9px] font-semibold px-1.5 py-0.5 rounded-sm"
      style={{ color: meta.color, background: meta.bg }}
    >
      {meta.label}
    </span>
  );
}

// ─── Direction arrow ──────────────────────────────────────────────────────────

function DirectionArrow({ direction }: { direction: "inbound" | "outbound" }) {
  return (
    <span
      className="text-[10px] font-mono shrink-0"
      style={{ color: direction === "inbound" ? "var(--success)" : "var(--primary)" }}
    >
      {direction === "inbound" ? "↓" : "↑"}
    </span>
  );
}

// ─── Sentiment dot ────────────────────────────────────────────────────────────

function SentimentDot({ score }: { score: number }) {
  const color =
    score > 0.3
      ? "var(--success)"
      : score < -0.1
      ? "var(--destructive)"
      : "var(--warning)";
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
      style={{ background: color }}
      title={`Sentiment: ${score >= 0 ? "+" : ""}${score.toFixed(2)}`}
    />
  );
}

// ─── Duration formatter (mm:ss) ───────────────────────────────────────────────

function formatDuration(seconds: number): string {
  if (seconds === 0) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ─── Conversation card ────────────────────────────────────────────────────────

interface ConvCardProps {
  conv: Conversation;
  isLive?: boolean;
  expanded: boolean;
  onToggle: () => void;
}

function ConvCard({ conv, isLive = false, expanded, onToggle }: ConvCardProps) {
  const contact = getContactById(conv.contactId);
  const agent = getVoiceAgentById(conv.agentId);

  const [liveDuration, setLiveDuration] = useState(0);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setLiveDuration((d) => d + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isLive]);

  const displayDuration = isLive ? liveDuration : conv.duration;

  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full text-left px-3 py-2.5 border-b border-border/40 last:border-b-0",
        "transition-colors",
        expanded ? "bg-accent/60" : "hover:bg-surface-hover"
      )}
      style={{ transitionDuration: "var(--dur-fast)" }}
    >
      {/* Row 1: contact + direction + status */}
      <div className="flex items-center gap-1.5 mb-1">
        {isLive ? <LiveDot /> : <LiveDot resolved />}
        <DirectionArrow direction={conv.direction} />
        <span className="text-[11px] font-semibold text-foreground truncate flex-1">
          {contact?.name ?? "Unknown"}
        </span>
        <StatusBadge status={conv.status} />
      </div>

      {/* Row 2: company + agent + duration */}
      <div className="flex items-center gap-1.5 pl-3.5">
        <span className="text-[10px] text-muted-foreground truncate flex-1">
          {contact?.company ?? "—"} · {agent?.name ?? "—"}
        </span>
        <span
          className="text-[10px] tabular-nums shrink-0"
          style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--muted-foreground)" }}
        >
          {formatDuration(displayDuration)}
        </span>
      </div>

      {/* Row 3: CRM + sentiment + latency */}
      <div className="flex items-center gap-2 pl-3.5 mt-1">
        <CrmBadge synced={conv.crmSynced} error={conv.syncError} />
        <SentimentDot score={conv.sentimentScore} />
        {!isLive && (
          <span
            className="text-[9px] tabular-nums"
            style={{
              fontFamily: "var(--font-mono, monospace)",
              color: "var(--muted-foreground)",
            }}
          >
            {conv.responseLatencyMs}ms
          </span>
        )}
        {isLive && conv.intent && (
          <span
            className="text-[9px] truncate"
            style={{ color: "var(--primary)" }}
          >
            {conv.intent.replace(/_/g, " ")}
          </span>
        )}
      </div>

      {/* Expanded: transcript length, confidence, escalation note */}
      {expanded && (
        <div
          className="mt-2 pt-2 border-t border-border/40 space-y-1 pl-3.5"
          style={{ transitionDuration: "var(--dur-fast)" }}
        >
          {conv.confidenceScore > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-muted-foreground">Confidence</span>
              <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.round(conv.confidenceScore * 100)}%`,
                    background:
                      conv.confidenceScore >= 0.9
                        ? "var(--success)"
                        : conv.confidenceScore >= 0.8
                        ? "var(--warning)"
                        : "var(--destructive)",
                  }}
                />
              </div>
              <span
                className="text-[9px] tabular-nums"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                {Math.round(conv.confidenceScore * 100)}%
              </span>
            </div>
          )}
          {conv.transcriptLength > 0 && (
            <p className="text-[9px] text-muted-foreground">
              {conv.transcriptLength} words · {conv.disposition.replace(/_/g, " ")}
            </p>
          )}
          {conv.escalationNote && (
            <p
              className="text-[9px] leading-relaxed"
              style={{ color: "var(--warning-foreground)" }}
            >
              {conv.escalationNote}
            </p>
          )}
          {conv.syncError && (
            <p
              className="text-[9px] leading-relaxed"
              style={{ color: "var(--destructive)" }}
            >
              {conv.syncError}
            </p>
          )}
        </div>
      )}
    </button>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({
  label,
  count,
  accent,
}: {
  label: string;
  count: number;
  accent?: "primary" | "warning" | "success" | "muted";
}) {
  const accentColor = {
    primary: "var(--primary)",
    warning: "var(--warning-foreground)",
    success: "var(--success)",
    muted: "var(--muted-foreground)",
  }[accent ?? "muted"];

  return (
    <div
      className="flex items-center justify-between px-3 py-1.5 border-b border-border/40 sticky top-0 z-10"
      style={{ background: "var(--background)" }}
    >
      <span
        className="text-[10px] font-bold uppercase tracking-widest"
        style={{ color: accentColor }}
      >
        {label}
      </span>
      <span
        className="text-[9px] font-semibold px-1.5 py-0.5 rounded-sm tabular-nums"
        style={{
          background: `${accentColor}1a`,
          color: accentColor,
          fontFamily: "var(--font-mono, monospace)",
        }}
      >
        {count}
      </span>
    </div>
  );
}

// ─── Signal Board stat strip ──────────────────────────────────────────────────

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  isFloat?: boolean;
  isLatency?: boolean;
  animationDelay?: number;
}

function StatItem({
  value,
  label,
  suffix = "",
  isFloat = false,
  isLatency = false,
  animationDelay = 0,
}: StatItemProps) {
  const intValue = isFloat ? Math.round(value) : value;
  const { count, ref } = useCountUp(intValue, 900);

  const displayValue = isFloat ? `${count}${suffix}` : isLatency ? `${count}ms` : `${count}${suffix}`;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-0.5"
      style={{
        animationDelay: `${animationDelay}ms`,
        animationDuration: "150ms",
        animationFillMode: "both",
      }}
    >
      <span
        className="text-[14px] font-bold tabular-nums leading-none"
        style={{
          fontFamily: "var(--font-mono, monospace)",
          color: "var(--foreground)",
        }}
      >
        {displayValue}
      </span>
      <span className="text-[9px] text-muted-foreground leading-none">{label}</span>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const LIVE_STATUSES = new Set(["in_progress", "ringing", "connected", "transcribing"]);
const REVIEW_STATUSES = new Set(["escalated", "low_confidence", "crm_sync_error", "dropped"]);
const RESOLVED_STATUSES = new Set(["completed", "appointment_booked", "voicemail_left", "no_answer", "opted_out"]);

export default function SignalBoardPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const liveConvs = conversations.filter((c) => LIVE_STATUSES.has(c.status));
  const reviewConvs = conversations.filter((c) => REVIEW_STATUSES.has(c.status));
  const resolvedConvs = conversations.filter((c) => RESOLVED_STATUSES.has(c.status));

  const toggle = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: "var(--background)" }}
    >
      {/* ── Signal Board header strip ───────────────────────── */}
      <div
        className="px-3 py-2.5 border-b border-border/60"
        style={{ background: "var(--sidebar-bg)" }}
      >
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: "var(--primary)" }}
        >
          Today&apos;s Signal Board
        </p>
        <div className="grid grid-cols-4 gap-1">
          <StatItem
            value={dashboardStats.conversationsToday}
            label="Conversations"
            animationDelay={0}
          />
          <StatItem
            value={dashboardStats.appointmentsBookedToday}
            label="Booked"
            animationDelay={60}
          />
          <StatItem
            value={dashboardStats.containmentRate}
            label="Contained"
            suffix="%"
            isFloat
            animationDelay={120}
          />
          <StatItem
            value={dashboardStats.avgResponseLatencyMs}
            label="Latency"
            isLatency
            animationDelay={180}
          />
        </div>
      </div>

      {/* ── Scrollable conversation feed ──────────────────────── */}
      <div className="flex-1 overflow-y-auto">

        {/* Live Now */}
        {liveConvs.length > 0 && (
          <div>
            <SectionHeader label="Live Now" count={liveConvs.length} accent="primary" />
            {liveConvs.map((conv) => (
              <ConvCard
                key={conv.id}
                conv={conv}
                isLive
                expanded={expandedId === conv.id}
                onToggle={() => toggle(conv.id)}
              />
            ))}
          </div>
        )}

        {/* Needs Review */}
        {reviewConvs.length > 0 && (
          <div>
            <SectionHeader label="Needs Review" count={reviewConvs.length} accent="warning" />
            {reviewConvs.map((conv) => (
              <ConvCard
                key={conv.id}
                conv={conv}
                expanded={expandedId === conv.id}
                onToggle={() => toggle(conv.id)}
              />
            ))}
          </div>
        )}

        {/* Resolved */}
        {resolvedConvs.length > 0 && (
          <div>
            <SectionHeader label="Resolved" count={resolvedConvs.length} accent="success" />
            {resolvedConvs.map((conv) => (
              <ConvCard
                key={conv.id}
                conv={conv}
                expanded={expandedId === conv.id}
                onToggle={() => toggle(conv.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Proposal banner at bottom ─────────────────────────── */}
      <div
        className="px-3 py-2 border-t border-border/40 flex items-center justify-between gap-2 shrink-0"
        style={{ background: "var(--sidebar-bg)" }}
      >
        <div>
          <p className="text-[9px] font-medium text-foreground leading-tight">
            Demo for {APP_CONFIG.projectName}
          </p>
          <p className="text-[9px] text-muted-foreground">Humam · Full-Stack Dev</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/challenges"
            className="text-[9px] text-muted-foreground hover:text-foreground"
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            Approach
          </a>
          <a
            href="/proposal"
            className="text-[9px] font-semibold px-2 py-1 rounded"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            Hire me
          </a>
        </div>
      </div>
    </div>
  );
}
