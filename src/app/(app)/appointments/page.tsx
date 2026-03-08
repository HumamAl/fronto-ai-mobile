"use client";

import { useState, useMemo } from "react";
import {
  appointments,
  getContactById,
} from "@/data/mock-data";
import type { Appointment, AppointmentStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDateShort(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatTimeOnly(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_META: Record<AppointmentStatus, { label: string; color: string; bg: string }> = {
  scheduled:  { label: "Scheduled",  color: "var(--primary)",              bg: "oklch(0.58 0.22 260 / 0.12)" },
  confirmed:  { label: "Confirmed",  color: "var(--success)",              bg: "oklch(0.627 0.194 149.214 / 0.12)" },
  completed:  { label: "Completed",  color: "var(--success)",              bg: "oklch(0.627 0.194 149.214 / 0.10)" },
  no_show:    { label: "No Show",    color: "var(--destructive)",          bg: "oklch(0.577 0.245 27.325 / 0.10)" },
  cancelled:  { label: "Cancelled",  color: "var(--muted-foreground)",     bg: "oklch(0.97 0.004 260)" },
};

function ApptStatusBadge({ status }: { status: AppointmentStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className="text-[9px] font-semibold px-1.5 py-0.5 rounded-sm shrink-0"
      style={{ color: meta.color, background: meta.bg }}
    >
      {meta.label}
    </span>
  );
}

// ─── Timezone conflict indicator (signature detail: edge case visual) ─────────

function TimezoneAlert() {
  return (
    <div
      className="flex items-center gap-1"
      title="Timezone mismatch detected"
    >
      <span
        className="text-[9px] font-semibold px-1 py-0.5 rounded-sm"
        style={{
          background: "oklch(0.769 0.188 70.08 / 0.18)",
          color: "var(--warning-foreground)",
        }}
      >
        TZ ⚠
      </span>
    </div>
  );
}

// ─── Duration display (signature detail: IBM Plex Mono) ───────────────────────

function DurationBadge({ minutes }: { minutes: number }) {
  return (
    <span
      className="text-[9px] tabular-nums shrink-0"
      style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--muted-foreground)" }}
    >
      {minutes}m
    </span>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────

function SectionHeader({
  label,
  count,
  accent = "muted",
}: {
  label: string;
  count: number;
  accent?: "primary" | "success" | "warning" | "destructive" | "muted";
}) {
  const accentColor = {
    primary: "var(--primary)",
    success: "var(--success)",
    warning: "var(--warning-foreground)",
    destructive: "var(--destructive)",
    muted: "var(--muted-foreground)",
  }[accent];

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

// ─── Appointment card ──────────────────────────────────────────────────────────

function ApptCard({
  appt,
  expanded,
  onToggle,
}: {
  appt: Appointment;
  expanded: boolean;
  onToggle: () => void;
}) {
  const contact = getContactById(appt.contactId);

  return (
    <>
      <button
        onClick={onToggle}
        className={cn(
          "w-full text-left px-3 py-2.5 border-b border-border/40 last:border-b-0 transition-colors",
          expanded ? "bg-accent/60" : "hover:bg-surface-hover"
        )}
        style={{ transitionDuration: "var(--dur-fast)" }}
      >
        {/* Row 1: contact name + status + timezone alert */}
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[11px] font-semibold text-foreground truncate flex-1">
            {contact?.name ?? "Unknown Contact"}
          </span>
          {appt.timezoneConflict && <TimezoneAlert />}
          <ApptStatusBadge status={appt.status} />
        </div>

        {/* Row 2: company + agent */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-muted-foreground truncate flex-1">
            {contact?.company ?? "—"} · {appt.agentAssigned}
          </span>
          <DurationBadge minutes={appt.duration} />
        </div>

        {/* Row 3: date + time (IBM Plex Mono) */}
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="text-[10px] tabular-nums"
            style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--foreground)" }}
          >
            {formatDateShort(appt.scheduledAt)}
          </span>
          <span
            className="text-[9px]"
            style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--muted-foreground)" }}
          >
            {formatTimeOnly(appt.scheduledAt)}
          </span>
        </div>
      </button>

      {/* Expanded: notes + timezone conflict note */}
      {expanded && (
        <div
          className="px-3 py-2 bg-accent/30 border-b border-border/40 space-y-1.5"
          style={{ transitionDuration: "var(--dur-fast)" }}
        >
          {appt.notes && (
            <p className="text-[9px] text-muted-foreground leading-relaxed">{appt.notes}</p>
          )}
          {appt.timezoneConflict && appt.timezoneConflictNote && (
            <div
              className="flex items-start gap-1.5 px-2 py-1.5 rounded-sm"
              style={{
                background: "oklch(0.769 0.188 70.08 / 0.12)",
                border: "1px solid oklch(0.769 0.188 70.08 / 0.25)",
              }}
            >
              <span className="text-[9px] leading-relaxed" style={{ color: "var(--warning-foreground)" }}>
                {appt.timezoneConflictNote}
              </span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <div>
              <p className="text-[9px] text-muted-foreground">Full Date &amp; Time</p>
              <p
                className="text-[10px] tabular-nums"
                style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--foreground)" }}
              >
                {formatDateTime(appt.scheduledAt)}
              </p>
            </div>
            <div>
              <p className="text-[9px] text-muted-foreground">Duration</p>
              <p
                className="text-[10px] tabular-nums"
                style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--foreground)" }}
              >
                {appt.duration} min
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── View toggle ──────────────────────────────────────────────────────────────

type ViewMode = "upcoming" | "past";

// ─── Main page ─────────────────────────────────────────────────────────────────

const UPCOMING_STATUSES = new Set<AppointmentStatus>(["scheduled", "confirmed"]);
const PAST_STATUSES = new Set<AppointmentStatus>(["completed", "no_show", "cancelled"]);

export default function AppointmentsPage() {
  const [view, setView] = useState<ViewMode>("upcoming");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const upcomingAppts = useMemo(
    () =>
      appointments
        .filter((a) => UPCOMING_STATUSES.has(a.status))
        .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt)),
    []
  );

  const pastAppts = useMemo(
    () =>
      appointments
        .filter((a) => PAST_STATUSES.has(a.status))
        .sort((a, b) => b.scheduledAt.localeCompare(a.scheduledAt)),
    []
  );

  const confirmedCount = upcomingAppts.filter((a) => a.status === "confirmed").length;
  const noShowCount = pastAppts.filter((a) => a.status === "no_show").length;
  const timezoneConflicts = upcomingAppts.filter((a) => a.timezoneConflict).length;

  const displayedAppts = view === "upcoming" ? upcomingAppts : pastAppts;

  // Sections for past view
  const completedAppts = pastAppts.filter((a) => a.status === "completed");
  const issueAppts = pastAppts.filter((a) => a.status === "no_show" || a.status === "cancelled");

  return (
    <div className="flex flex-col h-full" style={{ background: "var(--background)" }}>
      {/* ── Header ──────────────────────────────────────────────── */}
      <div
        className="px-3 py-2.5 border-b border-border/60"
        style={{ background: "var(--sidebar-bg)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "var(--primary)" }}
          >
            Scheduled Meetings
          </p>
          <div className="flex items-center gap-2">
            {timezoneConflicts > 0 && (
              <span
                className="text-[9px] font-semibold px-1.5 py-0.5 rounded-sm tabular-nums"
                style={{
                  background: "oklch(0.769 0.188 70.08 / 0.18)",
                  color: "var(--warning-foreground)",
                  fontFamily: "var(--font-mono, monospace)",
                }}
              >
                {timezoneConflicts} TZ conflict{timezoneConflicts !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-2.5">
          {[
            {
              value: upcomingAppts.length,
              label: "Upcoming",
              color: "var(--primary)",
            },
            {
              value: confirmedCount,
              label: "Confirmed",
              color: "var(--success)",
            },
            {
              value: noShowCount,
              label: "No-Shows",
              color: "var(--destructive)",
            },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span
                className="text-[14px] font-bold tabular-nums leading-none"
                style={{ fontFamily: "var(--font-mono, monospace)", color: stat.color }}
              >
                {stat.value}
              </span>
              <span className="text-[9px] text-muted-foreground leading-none">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* View toggle */}
        <div
          className="flex rounded-sm overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          {(["upcoming", "past"] as const).map((v) => (
            <button
              key={v}
              onClick={() => { setView(v); setExpandedId(null); }}
              className={cn(
                "flex-1 text-[9px] font-semibold py-1.5 transition-colors capitalize",
                view === v
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              style={{
                transitionDuration: "var(--dur-fast)",
                background: view === v ? "var(--primary)" : "transparent",
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* ── Appointment feed ──────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        {displayedAppts.length === 0 ? (
          <div className="flex items-center justify-center h-24 px-4">
            <p className="text-[10px] text-muted-foreground text-center">
              No {view} appointments.
            </p>
          </div>
        ) : view === "upcoming" ? (
          <>
            {/* Confirmed first */}
            {upcomingAppts.filter((a) => a.status === "confirmed").length > 0 && (
              <div>
                <SectionHeader
                  label="Confirmed"
                  count={upcomingAppts.filter((a) => a.status === "confirmed").length}
                  accent="success"
                />
                {upcomingAppts
                  .filter((a) => a.status === "confirmed")
                  .map((a) => (
                    <ApptCard
                      key={a.id}
                      appt={a}
                      expanded={expandedId === a.id}
                      onToggle={() => toggle(a.id)}
                    />
                  ))}
              </div>
            )}
            {/* Scheduled */}
            {upcomingAppts.filter((a) => a.status === "scheduled").length > 0 && (
              <div>
                <SectionHeader
                  label="Scheduled"
                  count={upcomingAppts.filter((a) => a.status === "scheduled").length}
                  accent="primary"
                />
                {upcomingAppts
                  .filter((a) => a.status === "scheduled")
                  .map((a) => (
                    <ApptCard
                      key={a.id}
                      appt={a}
                      expanded={expandedId === a.id}
                      onToggle={() => toggle(a.id)}
                    />
                  ))}
              </div>
            )}
          </>
        ) : (
          <>
            {issueAppts.length > 0 && (
              <div>
                <SectionHeader
                  label="Missed / Cancelled"
                  count={issueAppts.length}
                  accent="destructive"
                />
                {issueAppts.map((a) => (
                  <ApptCard
                    key={a.id}
                    appt={a}
                    expanded={expandedId === a.id}
                    onToggle={() => toggle(a.id)}
                  />
                ))}
              </div>
            )}
            {completedAppts.length > 0 && (
              <div>
                <SectionHeader
                  label="Completed"
                  count={completedAppts.length}
                  accent="success"
                />
                {completedAppts.map((a) => (
                  <ApptCard
                    key={a.id}
                    appt={a}
                    expanded={expandedId === a.id}
                    onToggle={() => toggle(a.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
