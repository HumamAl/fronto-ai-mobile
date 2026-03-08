// Featured + Grid portfolio presentation.
// First project gets a full-width featured card (most relevant).
// Remaining 3 in a 3-column grid below.
// No "use client" needed.

import { ExternalLink, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

export function ProofOfWork({ projects }: { projects: PortfolioProject[] }) {
  const [featured, ...rest] = projects;

  return (
    <section className="space-y-5">
      {/* Section header */}
      <div>
        <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
          Proof of Work
        </p>
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Projects that match this job
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Real clients. Shipped code. Outcomes I can point to.
        </p>
      </div>

      {/* Featured project — full width */}
      {featured && (
        <div
          className="linear-card p-6 space-y-4 border-l-2"
          style={{ borderLeftColor: "var(--primary)" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              {featured.relevance && (
                <p className="font-mono text-[10px] tracking-widest uppercase text-primary/70">
                  {featured.relevance}
                </p>
              )}
              <h3 className="text-base font-semibold leading-snug text-foreground">
                {featured.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {featured.description}
              </p>
            </div>
            {featured.liveUrl && (
              <a
                href={featured.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                style={{ transitionDuration: "var(--dur-fast)" }}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          {featured.outcome && (
            <div
              className="flex items-start gap-2 rounded-md px-3 py-2"
              style={{
                backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
                border: "1px solid color-mix(in oklch, var(--success) 18%, transparent)",
              }}
            >
              <TrendingUp className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[color:var(--success)]" />
              <p className="text-xs font-medium text-[color:var(--success)]">
                {featured.outcome}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {featured.tech.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="font-mono text-xs px-2 py-0.5 rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Grid — remaining 3 projects */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rest.map((project, index) => (
            <div
              key={project.id}
              className="linear-card p-5 space-y-3 flex flex-col"
              style={{
                animationDelay: `${index * 60}ms`,
              }}
            >
              <div className="flex items-start justify-between gap-2 flex-1">
                <div className="space-y-1 min-w-0">
                  {project.relevance && (
                    <p className="font-mono text-[9px] tracking-widest uppercase text-primary/60 leading-tight">
                      {project.relevance}
                    </p>
                  )}
                  <h3 className="text-sm font-semibold leading-snug text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                    style={{ transitionDuration: "var(--dur-fast)" }}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

              {project.outcome && (
                <div
                  className="flex items-start gap-1.5 rounded px-2.5 py-1.5"
                  style={{
                    backgroundColor:
                      "color-mix(in oklch, var(--success) 8%, transparent)",
                    border:
                      "1px solid color-mix(in oklch, var(--success) 18%, transparent)",
                  }}
                >
                  <TrendingUp className="h-3 w-3 mt-0.5 shrink-0 text-[color:var(--success)]" />
                  <p className="text-[11px] font-medium text-[color:var(--success)] leading-snug">
                    {project.outcome}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {project.tech.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="font-mono text-[10px] px-1.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
