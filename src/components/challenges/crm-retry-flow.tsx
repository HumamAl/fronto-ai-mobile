"use client";

import { useState } from "react";
import { PhoneOff, Inbox, AlertTriangle, RefreshCw, CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlowStage {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  status: "input" | "queue" | "error" | "retry" | "success";
}

const stages: FlowStage[] = [
  {
    id: "call-end",
    label: "Call ends",
    sublabel: "Disposition captured",
    icon: PhoneOff,
    status: "input",
  },
  {
    id: "local-write",
    label: "Local write",
    sublabel: "Optimistic state",
    icon: Inbox,
    status: "queue",
  },
  {
    id: "api-attempt",
    label: "CRM API attempt",
    sublabel: "HubSpot / Salesforce",
    icon: AlertTriangle,
    status: "error",
  },
  {
    id: "retry-queue",
    label: "Retry queue",
    sublabel: "Exp. backoff · 3 attempts",
    icon: RefreshCw,
    status: "retry",
  },
  {
    id: "confirmed",
    label: "CRM confirmed",
    sublabel: "Contact updated",
    icon: CheckCircle2,
    status: "success",
  },
];

const annotations = [
  "Conversation disposition (booked, escalated, no-answer) is captured immediately on call end — before any network operation.",
  "Contact record is written to local state first. The UI confirms the outcome to the agent instantly, regardless of CRM availability.",
  "CRM API is called asynchronously. If HubSpot returns a 429 (rate limit) or Salesforce times out, this step fails — but the contact update is not lost.",
  "Failed writes enter an exponential backoff retry queue: attempt at +5s, +30s, +5min. If all three fail, the write is flagged for manual review — never silently dropped.",
  "CRM contact record is confirmed updated. The app reconciles local state with the server-confirmed record.",
];

type StageStatus = FlowStage["status"];

const stageClassName = (status: StageStatus, isActive: boolean): string => {
  const base = "flex sm:flex-col items-center gap-2 rounded-lg border px-3 py-2 w-full text-left transition-all duration-150";
  const activeRing = isActive ? "ring-1 ring-primary/30" : "opacity-70 hover:opacity-100";

  const statusMap: Record<StageStatus, string> = {
    input: "bg-muted/60 border-border/60",
    queue: "bg-primary/8 border-primary/25",
    error: "bg-destructive/5 border-destructive/25",
    retry: "border-border/60",
    success: "border-border/60",
  };

  return cn(base, statusMap[status], activeRing);
};

const iconColorByStatus: Record<StageStatus, string> = {
  input: "text-muted-foreground",
  queue: "text-primary",
  error: "text-destructive",
  retry: "text-[color:var(--warning)]",
  success: "text-[color:var(--success)]",
};

const successBg = "color-mix(in oklch, var(--success) 6%, transparent)";
const successBorder = "color-mix(in oklch, var(--success) 22%, transparent)";

export function CrmRetryFlow() {
  const [activeStep, setActiveStep] = useState<number>(2);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
          CRM write reliability — tap step
        </span>
      </div>

      {/* Horizontal flow — wraps on mobile */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {stages.map((stage, i) => {
          const isActive = activeStep === i;
          const needsInlineStyle = stage.status === "retry" || stage.status === "success";
          const inlineStyle: React.CSSProperties = needsInlineStyle
            ? stage.status === "retry"
              ? {
                  background: "color-mix(in oklch, var(--warning) 6%, transparent)",
                  borderColor: "color-mix(in oklch, var(--warning) 22%, transparent)",
                }
              : {
                  background: successBg,
                  borderColor: successBorder,
                }
            : {};

          return (
            <div key={stage.id} className="flex sm:flex-col items-center gap-2 sm:gap-0 flex-1">
              <button
                onClick={() => setActiveStep(i)}
                className={stageClassName(stage.status, isActive)}
                style={inlineStyle}
              >
                <stage.icon
                  className={cn(
                    "w-4 h-4 shrink-0",
                    iconColorByStatus[stage.status],
                    stage.status === "retry" && isActive && "animate-spin"
                  )}
                />
                <div>
                  <p className="text-xs font-semibold text-foreground">{stage.label}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{stage.sublabel}</p>
                </div>
              </button>
              {i < stages.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-border shrink-0 hidden sm:block" />
              )}
            </div>
          );
        })}
      </div>

      {/* Step annotation */}
      <div className="rounded-lg border border-border/50 bg-muted/30 p-3 text-sm text-foreground/80 leading-relaxed min-h-[44px]">
        {annotations[activeStep]}
      </div>

      {/* Reliability comparison */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-lg border border-destructive/25 bg-destructive/5 px-3 py-2 text-center">
          <p className="text-xs text-muted-foreground mb-0.5">Without retry queue</p>
          <p className="text-lg font-bold font-mono text-destructive">~15%</p>
          <p className="text-[10px] text-muted-foreground">sync failures</p>
        </div>
        <div
          className="rounded-lg border px-3 py-2 text-center"
          style={{ background: successBg, borderColor: successBorder }}
        >
          <p className="text-xs text-muted-foreground mb-0.5">With retry queue</p>
          <p className="text-lg font-bold font-mono text-[color:var(--success)]">&lt;2%</p>
          <p className="text-[10px] text-muted-foreground">sync failures</p>
        </div>
      </div>
    </div>
  );
}
