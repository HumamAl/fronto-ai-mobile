"use client";

import { useState, useMemo } from "react";
import {
  contacts,
  getConversationsByContact,
  getAppointmentsByContact,
} from "@/data/mock-data";
import type { Contact, ContactStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string | null): string {
  if (!iso) return "Never";
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ─── Status badge config ───────────────────────────────────────────────────────

const STATUS_META: Record<ContactStatus, { label: string; color: string; bg: string }> = {
  new_lead:        { label: "New Lead",    color: "var(--primary)",          bg: "oklch(0.58 0.22 260 / 0.12)" },
  contacted:       { label: "Contacted",   color: "var(--primary)",          bg: "oklch(0.58 0.22 260 / 0.10)" },
  qualified:       { label: "Qualified",   color: "var(--success)",          bg: "oklch(0.627 0.194 149.214 / 0.12)" },
  appointment_set: { label: "Appt Set",    color: "var(--success)",          bg: "oklch(0.627 0.194 149.214 / 0.12)" },
  converted:       { label: "Converted",   color: "var(--success)",          bg: "oklch(0.627 0.194 149.214 / 0.15)" },
  disqualified:    { label: "Disqualified",color: "var(--muted-foreground)", bg: "oklch(0.97 0.004 260)" },
  opted_out:       { label: "Opted Out",   color: "var(--destructive)",      bg: "oklch(0.577 0.245 27.325 / 0.10)" },
};

function ContactStatusBadge({ status }: { status: ContactStatus }) {
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

// ─── Live pulse dot (signature detail) ────────────────────────────────────────

function LiveDot({ resolved = false }: { resolved?: boolean }) {
  if (resolved) {
    return <span className="inline-block w-1.5 h-1.5 rounded-full bg-success shrink-0" />;
  }
  return (
    <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
    </span>
  );
}

// ─── CRM sync badge (signature detail) ────────────────────────────────────────

function CrmBadge({ synced, error }: { synced: boolean; error?: boolean }) {
  if (error) {
    return (
      <span
        className="inline-flex items-center gap-0.5 text-[9px] font-medium px-1 py-0.5 rounded"
        style={{ background: "oklch(0.577 0.245 27.325 / 0.12)", color: "var(--destructive)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--destructive)" }} />
        CRM
      </span>
    );
  }
  if (synced) {
    return (
      <span
        className="inline-flex items-center gap-0.5 text-[9px] font-medium px-1 py-0.5 rounded"
        style={{ background: "oklch(0.627 0.194 149.214 / 0.12)", color: "var(--success)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--success)" }} />
        CRM
      </span>
    );
  }
  return null;
}

// ─── Opted-out banner ─────────────────────────────────────────────────────────

function OptedOutBanner() {
  return (
    <div
      className="mx-3 mt-2 px-2.5 py-1.5 rounded-sm flex items-center gap-1.5"
      style={{ background: "oklch(0.577 0.245 27.325 / 0.08)", border: "1px solid oklch(0.577 0.245 27.325 / 0.20)" }}
    >
      <span className="text-[9px] leading-tight" style={{ color: "var(--destructive)" }}>
        DNC — This contact has opted out. All outreach must stop immediately.
      </span>
    </div>
  );
}

// ─── Contact card (collapsed) ─────────────────────────────────────────────────

function ContactCard({
  contact,
  expanded,
  onToggle,
}: {
  contact: Contact;
  expanded: boolean;
  onToggle: () => void;
}) {
  const convs = getConversationsByContact(contact.id);
  const apts = getAppointmentsByContact(contact.id);
  const hasCrmError = convs.some((c) => c.syncError && !c.crmSynced);
  const isLive = convs.some(
    (c) => c.status === "in_progress" || c.status === "ringing" || c.status === "connected" || c.status === "transcribing"
  );
  const lastConv = convs.sort((a, b) => b.startTime.localeCompare(a.startTime))[0];

  return (
    <>
      <button
        onClick={onToggle}
        className={cn(
          "w-full text-left px-3 py-2.5 border-b border-border/40 last:border-b-0",
          "transition-colors",
          expanded ? "bg-accent/60" : "hover:bg-surface-hover",
          contact.optedOut && "opacity-70"
        )}
        style={{ transitionDuration: "var(--dur-fast)" }}
      >
        {/* Row 1: name + status badge */}
        <div className="flex items-center gap-1.5 mb-1">
          {isLive ? <LiveDot /> : <LiveDot resolved />}
          <span className="text-[11px] font-semibold text-foreground truncate flex-1">
            {contact.name}
          </span>
          <ContactStatusBadge status={contact.status} />
        </div>

        {/* Row 2: company + timezone */}
        <div className="flex items-center gap-1.5 pl-3">
          <span className="text-[10px] text-muted-foreground truncate flex-1">
            {contact.company}
          </span>
          <span
            className="text-[9px] shrink-0"
            style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--muted-foreground)" }}
          >
            {contact.timezone.replace("America/", "")}
          </span>
        </div>

        {/* Row 3: CRM badge + last contacted + appointment count */}
        <div className="flex items-center gap-2 pl-3 mt-1">
          <CrmBadge synced={!hasCrmError && contact.totalConversations > 0} error={hasCrmError} />
          <span className="text-[9px] text-muted-foreground truncate flex-1">
            {lastConv
              ? lastConv.intent.replace(/_/g, " ")
              : "No conversations yet"}
          </span>
          {apts.length > 0 && (
            <span
              className="text-[9px] tabular-nums shrink-0"
              style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--success)" }}
            >
              {apts.length} appt{apts.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </button>

      {/* Opted-out DNC banner */}
      {expanded && contact.optedOut && <OptedOutBanner />}

      {/* Expanded details */}
      {expanded && (
        <div
          className="px-3 py-2.5 bg-accent/30 border-b border-border/40 space-y-2"
          style={{ transitionDuration: "var(--dur-fast)" }}
        >
          {/* Contact details */}
          <div className="grid grid-cols-2 gap-1.5">
            <div>
              <p className="text-[9px] text-muted-foreground">Phone</p>
              <p
                className="text-[10px] tabular-nums"
                style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--foreground)" }}
              >
                {contact.phone}
              </p>
            </div>
            <div>
              <p className="text-[9px] text-muted-foreground">CRM ID</p>
              <p
                className="text-[10px] tabular-nums"
                style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--primary)" }}
              >
                {contact.crmId}
              </p>
            </div>
            <div>
              <p className="text-[9px] text-muted-foreground">Source</p>
              <p className="text-[10px] text-foreground">
                {contact.source.replace(/_/g, " ")}
              </p>
            </div>
            <div>
              <p className="text-[9px] text-muted-foreground">Last Contact</p>
              <p className="text-[10px] text-foreground">
                {formatDate(contact.lastContactedAt)}
              </p>
            </div>
          </div>

          {/* Conversation timeline */}
          {convs.length > 0 && (
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                Conversations
              </p>
              <div className="space-y-1">
                {convs.slice(0, 3).map((c) => (
                  <div key={c.id} className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        background:
                          c.status === "appointment_booked" || c.status === "completed"
                            ? "var(--success)"
                            : c.status === "escalated" || c.status === "crm_sync_error"
                            ? "var(--warning)"
                            : "var(--muted-foreground)",
                      }}
                    />
                    <span className="text-[9px] text-muted-foreground truncate flex-1">
                      {c.intent.replace(/_/g, " ")}
                    </span>
                    <span
                      className="text-[9px] tabular-nums shrink-0"
                      style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--muted-foreground)" }}
                    >
                      {c.responseLatencyMs}ms
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming appointments */}
          {apts.filter((a) => a.status === "scheduled" || a.status === "confirmed").length > 0 && (
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                Upcoming Appointments
              </p>
              {apts
                .filter((a) => a.status === "scheduled" || a.status === "confirmed")
                .map((a) => (
                  <div key={a.id} className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: "var(--success)" }}
                    />
                    <span className="text-[9px] text-foreground truncate flex-1">
                      {a.agentAssigned}
                    </span>
                    <span
                      className="text-[9px] tabular-nums shrink-0"
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {new Date(a.scheduledAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
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

// ─── Status filter tabs ────────────────────────────────────────────────────────

const FILTER_TABS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "converted", label: "Won" },
  { value: "problem", label: "Issues" },
] as const;

type FilterTab = (typeof FILTER_TABS)[number]["value"];

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function ContactsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      // Search filter
      const searchLower = search.toLowerCase();
      const matchesSearch =
        search === "" ||
        c.name.toLowerCase().includes(searchLower) ||
        c.company.toLowerCase().includes(searchLower) ||
        c.crmId.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      // Status filter
      if (filter === "all") return true;
      if (filter === "active")
        return (
          c.status === "new_lead" ||
          c.status === "contacted" ||
          c.status === "qualified" ||
          c.status === "appointment_set"
        );
      if (filter === "converted") return c.status === "converted";
      if (filter === "problem")
        return c.status === "disqualified" || c.status === "opted_out";
      return true;
    });
  }, [filter, search]);

  // Group into sections for "all" view
  const activeContacts = filtered.filter(
    (c) =>
      c.status === "new_lead" ||
      c.status === "contacted" ||
      c.status === "qualified" ||
      c.status === "appointment_set"
  );
  const wonContacts = filtered.filter((c) => c.status === "converted");
  const problemContacts = filtered.filter(
    (c) => c.status === "disqualified" || c.status === "opted_out"
  );

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
            CRM Contacts
          </p>
          <span
            className="text-[9px] tabular-nums px-1.5 py-0.5 rounded-sm"
            style={{
              fontFamily: "var(--font-mono, monospace)",
              background: "oklch(0.58 0.22 260 / 0.10)",
              color: "var(--primary)",
            }}
          >
            {contacts.length} total
          </span>
        </div>

        {/* Search input */}
        <div className="relative mb-2">
          <svg
            className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3"
            style={{ color: "var(--muted-foreground)" }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-7 pr-3 py-1.5 text-[10px] rounded-sm border border-border/60 bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            style={{ fontFamily: "var(--font-body)" }}
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={cn(
                "text-[9px] font-semibold px-2 py-1 rounded-sm transition-colors",
                filter === tab.value
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              style={{
                transitionDuration: "var(--dur-fast)",
                background: filter === tab.value ? "var(--primary)" : "transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Contact feed ─────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-24 px-4">
            <p className="text-[10px] text-muted-foreground text-center">
              No contacts match this filter.
            </p>
          </div>
        ) : filter === "all" ? (
          <>
            {activeContacts.length > 0 && (
              <div>
                <SectionHeader label="In Pipeline" count={activeContacts.length} accent="primary" />
                {activeContacts.map((c) => (
                  <ContactCard
                    key={c.id}
                    contact={c}
                    expanded={expandedId === c.id}
                    onToggle={() => toggle(c.id)}
                  />
                ))}
              </div>
            )}
            {wonContacts.length > 0 && (
              <div>
                <SectionHeader label="Converted" count={wonContacts.length} accent="success" />
                {wonContacts.map((c) => (
                  <ContactCard
                    key={c.id}
                    contact={c}
                    expanded={expandedId === c.id}
                    onToggle={() => toggle(c.id)}
                  />
                ))}
              </div>
            )}
            {problemContacts.length > 0 && (
              <div>
                <SectionHeader label="Inactive / DNC" count={problemContacts.length} accent="destructive" />
                {problemContacts.map((c) => (
                  <ContactCard
                    key={c.id}
                    contact={c}
                    expanded={expandedId === c.id}
                    onToggle={() => toggle(c.id)}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          filtered.map((c) => (
            <ContactCard
              key={c.id}
              contact={c}
              expanded={expandedId === c.id}
              onToggle={() => toggle(c.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
