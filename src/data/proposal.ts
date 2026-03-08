import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline:
    "I build AI-powered mobile apps from scratch — voice pipelines, CRM sync, scheduling logic, all owned end-to-end.",
  bio: "Full-stack developer who ships greenfield products, not ticket queues. I've built AI automation pipelines, CRM systems, and multi-module SaaS platforms. When you say 'founding developer', I hear architecture decisions, not story points.",
  approach: [
    {
      title: "Architecture First",
      description:
        "Voice pipeline, CRM integration points, data model — agreed and documented before any code. No retrofitting later.",
      timeline: "Week 1",
    },
    {
      title: "MVP Core",
      description:
        "Working voice agent + booking flow + CRM write. Something you can click through and test within the first two weeks.",
      timeline: "Weeks 2–3",
    },
    {
      title: "Integration Layer",
      description:
        "Connect the real systems — Twilio/VAPI, calendar APIs, CRM webhooks. Each integration tested in isolation before wiring together.",
      timeline: "Weeks 4–5",
    },
    {
      title: "CI/CD Pipeline",
      description:
        "GitHub Actions, automated deploys, environment separation. You ship confidently from day one.",
      timeline: "Week 5",
    },
    {
      title: "Iteration",
      description:
        "Short feedback loops, no 2-week wait for a small change. You see it, we refine it.",
      timeline: "Ongoing",
    },
  ],
  skillCategories: [
    {
      name: "Mobile & Frontend",
      skills: [
        "React Native",
        "TypeScript",
        "Next.js",
        "React",
        "Tailwind CSS",
        "shadcn/ui",
      ],
    },
    {
      name: "AI & Voice",
      skills: [
        "Claude API",
        "OpenAI API",
        "n8n",
        "Prompt Engineering",
        "Structured Output",
        "Webhook Integrations",
      ],
    },
    {
      name: "APIs & CRM",
      skills: [
        "REST API Design",
        "Microsoft Graph",
        "Stripe Connect",
        "Shopify API",
        "eBay Browse API",
        "Discord Webhooks",
      ],
    },
    {
      name: "DevOps & Tooling",
      skills: [
        "Vercel",
        "GitHub Actions",
        "ESLint",
        "TypeScript Strict Mode",
        "Git Workflows",
      ],
    },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "wmf-agent",
    title: "WMF Agent Dashboard",
    description:
      "AI-powered customer service agent for Windsor Metal Finishing. Email classification, RFQ data extraction with confidence scoring, and human-in-the-loop approval workflow.",
    tech: ["Next.js", "TypeScript", "Claude API", "n8n", "Microsoft Graph"],
    outcome:
      "Replaced a 4-hour manual quote review process with a 20-minute structured extraction and approval flow",
    liveUrl: "https://wmf-agent-dashboard.vercel.app",
    relevance: "AI pipeline + CRM integration — closest match to Fronto's core",
  },
  {
    id: "outerbloom",
    title: "Outerbloom — AI Social Coordination",
    description:
      "AI-powered social event coordination platform that intelligently matches people, schedules, and venues.",
    tech: ["Next.js", "TypeScript", "shadcn/ui", "AI pipeline"],
    outcome:
      "AI-driven matching pipeline connecting users, schedules, and venues — reducing manual coordination overhead",
    liveUrl: "https://outerbloom.vercel.app",
    relevance: "AI + scheduling logic — the same core problem Fronto solves",
  },
  {
    id: "lead-crm",
    title: "Lead Intake CRM",
    description:
      "Custom lead intake and automation system with public intake form, CRM dashboard, lead scoring, pipeline management, and automation rules engine.",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    outcome:
      "End-to-end lead flow — public intake form to scored pipeline with configurable automation rules",
    relevance: "CRM automation rules — mirrors Fronto's contact management layer",
  },
  {
    id: "ebay-monitor",
    title: "eBay Pokemon Monitor",
    description:
      "eBay Browse API monitoring tool for Pokemon card listings with instant Discord alerts and price tracking.",
    tech: ["Next.js", "TypeScript", "shadcn/ui"],
    outcome:
      "Real-time listing monitor with webhook-based Discord alerts and price trend tracking",
    liveUrl: "https://ebay-pokemon-monitor.vercel.app",
    relevance:
      "REST API + webhook integration pattern — same architecture as Twilio/CRM sync",
  },
];
