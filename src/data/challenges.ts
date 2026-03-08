import type { Challenge } from "@/lib/types";

export const executiveSummary = {
  commonApproach:
    "Most developers wire voice AI directly to the CRM, ship to one platform first, and treat state sync as a nice-to-have. Works fine in demos. Breaks in production when the HubSpot API throttles at 3 AM or a call ends mid-handoff.",
  differentApproach:
    "I build with an offline-first, event-sourced sync layer from day one — so iOS and Android share a single source of truth, CRM writes degrade gracefully under throttle, and CI/CD ships both platforms on every commit without human gates.",
  accentPhrase: "event-sourced sync layer",
};

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Real-time voice + scheduling state sync across iOS and Android",
    description:
      "When a voice call ends and triggers an appointment booking, three systems update simultaneously: the local device state, the remote scheduling backend, and the CRM. On a single platform this is manageable. Cross-platform, with potential offline windows and background app states, race conditions cause stale 'Pending Sync' badges that erode trust in the AI agent's reliability.",
    visualizationType: "architecture",
    outcome:
      "Could eliminate race conditions where a call ends and the appointment shows as 'Pending Sync' for 30+ seconds instead of updating instantly",
  },
  {
    id: "challenge-2",
    title: "CRM write reliability when HubSpot or Salesforce APIs are slow or throttled",
    description:
      "Voice AI volume is bursty — a campaign can generate 40+ CRM writes in 90 seconds. HubSpot's API enforces rate limits (100 requests/10 seconds per key), and Salesforce bulk APIs introduce latency. Without a resilient write layer, CRM sync failures silently drop contact updates, leaving sales teams acting on stale data.",
    visualizationType: "flow",
    outcome:
      "Could reduce failed CRM syncs from ~15% to under 2% with a retry queue and optimistic local state",
  },
  {
    id: "challenge-3",
    title: "Native CI/CD pipeline for two platforms from a greenfield repo",
    description:
      "Greenfield React Native projects routinely ship to one platform manually while the other waits. TestFlight submissions require Apple signing certificates, provisioning profiles, and App Store Connect API keys. Play Store alpha requires a service account and track management. Setting this up ad-hoc per-release costs hours and creates inconsistent build artifacts between iOS and Android.",
    visualizationType: "before-after",
    outcome:
      "Could cut deployment cycle from manual builds to automated TestFlight + Play Store alpha in under 20 minutes per commit",
  },
];
