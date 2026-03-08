// Vertical Timeline process presentation — linear aesthetic.
// Connected nodes on a vertical line. Each step has a colored dot and timeline badge.
// No "use client" needed.

interface ApproachStep {
  title: string;
  description: string;
  timeline?: string;
}

export function HowIWork({ steps }: { steps: ApproachStep[] }) {
  return (
    <section className="space-y-5">
      <div>
        <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
          Process
        </p>
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          How I work on a greenfield build
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Working code from day one. Short loops. No black boxes.
        </p>
      </div>

      <div className="linear-card overflow-hidden">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const stepNum = String(index + 1).padStart(2, "0");

          return (
            <div
              key={step.title}
              className="flex gap-0"
            >
              {/* Left column — step number + connector line */}
              <div className="flex flex-col items-center w-12 shrink-0">
                {/* Connector line above */}
                <div
                  className="w-px flex-none"
                  style={{
                    height: index === 0 ? "1.5rem" : "0",
                    background: "var(--border)",
                  }}
                />
                {/* Step dot */}
                <div
                  className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center border-2"
                  style={{
                    background: "color-mix(in oklch, var(--primary) 12%, var(--background))",
                    borderColor: "color-mix(in oklch, var(--primary) 35%, var(--border))",
                  }}
                >
                  <span
                    className="font-mono text-[9px] font-bold tabular-nums"
                    style={{ color: "var(--primary)" }}
                  >
                    {stepNum}
                  </span>
                </div>
                {/* Connector line below */}
                {!isLast && (
                  <div
                    className="w-px flex-1 min-h-[2rem]"
                    style={{ background: "var(--border)" }}
                  />
                )}
              </div>

              {/* Right column — content */}
              <div className={`flex-1 min-w-0 px-4 ${index === 0 ? "pt-3" : "pt-4"} ${isLast ? "pb-6" : "pb-0"}`}>
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-sm font-semibold text-foreground leading-snug">
                    {step.title}
                  </h3>
                  {step.timeline && (
                    <span
                      className="font-mono text-[10px] shrink-0 rounded px-1.5 py-0.5 text-primary/70"
                      style={{
                        background:
                          "color-mix(in oklch, var(--primary) 8%, transparent)",
                        border: "1px solid color-mix(in oklch, var(--primary) 15%, transparent)",
                      }}
                    >
                      {step.timeline}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
