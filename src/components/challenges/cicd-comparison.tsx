"use client";

import { useState } from "react";
import { XCircle, CheckCircle2, Clock, GitBranch, Rocket, Hand } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepItem {
  label: string;
  detail: string;
  time?: string;
  isBlocker?: boolean;
}

const manualSteps: StepItem[] = [
  { label: "Local build on dev machine", detail: "npx react-native run-ios / run-android", time: "8–12 min", isBlocker: false },
  { label: "Manual signing & provisioning", detail: "Xcode certificate + Apple Developer portal", time: "20–40 min", isBlocker: true },
  { label: "Archive + upload to TestFlight", detail: "Xcode Organizer → App Store Connect", time: "10–15 min", isBlocker: false },
  { label: "Android keystore management", detail: "Manually handled per developer", time: "5–10 min", isBlocker: true },
  { label: "Play Store upload", detail: "Manual via Google Play Console", time: "10–15 min", isBlocker: false },
];

const automatedSteps: StepItem[] = [
  { label: "git push to main", detail: "Triggers GitHub Actions workflow", time: "0 min", isBlocker: false },
  { label: "EAS Build (iOS + Android)", detail: "Expo Application Services — parallel builds", time: "6–9 min", isBlocker: false },
  { label: "Signing handled by EAS", detail: "Certificates and profiles managed in EAS secrets", time: "0 min", isBlocker: false },
  { label: "Auto-submit to TestFlight", detail: "App Store Connect API — no manual upload", time: "3–4 min", isBlocker: false },
  { label: "Auto-submit to Play alpha", detail: "Google service account via EAS submit", time: "3–4 min", isBlocker: false },
];

const successBg = "color-mix(in oklch, var(--success) 8%, transparent)";
const successBorder = "color-mix(in oklch, var(--success) 22%, transparent)";
const warningBg = "color-mix(in oklch, var(--warning) 8%, transparent)";
const warningBorder = "color-mix(in oklch, var(--warning) 22%, transparent)";
const successActiveBtn = "color-mix(in oklch, var(--success) 12%, transparent)";

export function CicdComparison() {
  const [showAfter, setShowAfter] = useState(false);

  const steps = showAfter ? automatedSteps : manualSteps;
  const totalTime = showAfter ? "~18 min" : "~60–90 min";
  const humanGates = showAfter ? 0 : 3;

  return (
    <div className="space-y-3">
      {/* Toggle header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitBranch className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
            Deployment pipeline
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-muted/40 p-0.5">
          <button
            onClick={() => setShowAfter(false)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150",
              !showAfter
                ? "bg-destructive/10 text-destructive"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Hand className="w-3 h-3" />
            Manual
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150",
              showAfter
                ? "text-[color:var(--success)]"
                : "text-muted-foreground hover:text-foreground"
            )}
            style={showAfter ? { background: successActiveBtn } : undefined}
          >
            <Rocket className="w-3 h-3" />
            Automated
          </button>
        </div>
      </div>

      {/* Steps list */}
      <div className="space-y-1.5">
        {steps.map((step, i) => {
          const stepStyle = showAfter
            ? { background: successBg, borderColor: successBorder }
            : step.isBlocker
            ? undefined
            : undefined;

          return (
            <div
              key={step.label}
              className={cn(
                "flex items-start gap-2.5 rounded-lg border px-3 py-2 transition-all duration-150",
                !showAfter && step.isBlocker && "border-destructive/25 bg-destructive/5",
                !showAfter && !step.isBlocker && "border-border/60 bg-card"
              )}
              style={showAfter ? stepStyle : undefined}
            >
              <div className="mt-0.5 shrink-0">
                {showAfter ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[color:var(--success)]" />
                ) : step.isBlocker ? (
                  <XCircle className="w-3.5 h-3.5 text-destructive" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-muted-foreground/40 flex items-center justify-center">
                    <span className="text-[8px] text-muted-foreground font-mono">{i + 1}</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium">{step.label}</p>
                <p className="text-[10px] text-muted-foreground font-mono">{step.detail}</p>
              </div>
              {step.time && (
                <div className="flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground font-mono">{step.time}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <div
          className="rounded-lg border px-3 py-2 text-center transition-all duration-150"
          style={
            showAfter
              ? { background: successBg, borderColor: successBorder }
              : { background: "color-mix(in oklch, var(--destructive) 8%, transparent)", borderColor: "color-mix(in oklch, var(--destructive) 22%, transparent)" }
          }
        >
          <p className="text-xs text-muted-foreground mb-0.5">Total time</p>
          <p
            className={cn(
              "text-lg font-bold font-mono",
              showAfter ? "text-[color:var(--success)]" : "text-destructive"
            )}
          >
            {totalTime}
          </p>
        </div>
        <div
          className="rounded-lg border px-3 py-2 text-center transition-all duration-150"
          style={
            showAfter
              ? { background: successBg, borderColor: successBorder }
              : { background: warningBg, borderColor: warningBorder }
          }
        >
          <p className="text-xs text-muted-foreground mb-0.5">Human gates</p>
          <p
            className={cn(
              "text-lg font-bold font-mono",
              showAfter ? "text-[color:var(--success)]" : "text-[color:var(--warning)]"
            )}
          >
            {humanGates}
          </p>
        </div>
      </div>
    </div>
  );
}
