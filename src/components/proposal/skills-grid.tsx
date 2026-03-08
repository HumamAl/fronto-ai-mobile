// Pill tags by category — linear aesthetic.
// Category cards with skill tags inside. Matches the linear card pattern.
// No "use client" needed.

import { Badge } from "@/components/ui/badge";

interface SkillCategory {
  name: string;
  skills: string[];
}

interface SkillsGridProps {
  categories: SkillCategory[];
}

export function SkillsGrid({ categories }: SkillsGridProps) {
  return (
    <section className="space-y-5">
      <div>
        <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
          Tech Stack
        </p>
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          What I bring to this build
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Relevant skills only — filtered for this job.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div key={category.name} className="linear-card p-5 space-y-3">
            <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              {category.name}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="font-mono text-xs px-2.5 py-1 rounded-full border-border/60 text-foreground"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
