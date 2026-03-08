"use client";

import { useState } from "react";
import { Wifi, Calendar, Database, Smartphone, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArchNode {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  type: "device" | "sync" | "backend" | "crm";
  connections: string[];
  detail: string;
}

const nodes: ArchNode[] = [
  {
    id: "ios",
    label: "iOS Client",
    sublabel: "React Native",
    icon: Smartphone,
    type: "device",
    connections: ["event-bus"],
    detail: "Optimistic local update on call end — UI reflects booking instantly. Queues an event to the shared sync bus.",
  },
  {
    id: "android",
    label: "Android Client",
    sublabel: "React Native",
    icon: Smartphone,
    type: "device",
    connections: ["event-bus"],
    detail: "Mirrors iOS optimistic state via the same event bus — no polling, no 30-second lag on cross-device updates.",
  },
  {
    id: "event-bus",
    label: "Event Bus",
    sublabel: "Shared sync layer",
    icon: RefreshCw,
    type: "sync",
    connections: ["scheduler", "crm-adapter"],
    detail: "Event-sourced log: each state change is an immutable event. Both clients subscribe — guaranteed delivery even after reconnect.",
  },
  {
    id: "scheduler",
    label: "Scheduling API",
    sublabel: "Appointment backend",
    icon: Calendar,
    type: "backend",
    connections: [],
    detail: "Single write target for appointment state. No direct device-to-backend writes — eliminates duplicate booking race conditions.",
  },
  {
    id: "crm-adapter",
    label: "CRM Adapter",
    sublabel: "HubSpot / Salesforce",
    icon: Database,
    type: "crm",
    connections: [],
    detail: "Async write with retry queue. CRM updates are fire-and-forget from the device — failures don't block the booking confirmation.",
  },
];

type NodeType = ArchNode["type"];

const nodeBaseClass = "text-left rounded-lg border px-3 py-2.5 transition-all duration-150 hover:border-primary/40 hover:bg-primary/5";

const nodeTypeIconClass: Record<NodeType, string> = {
  device: "text-primary",
  sync: "text-primary",
  backend: "text-[color:var(--success)]",
  crm: "text-muted-foreground",
};

const successBg = "color-mix(in oklch, var(--success) 8%, transparent)";
const successBorder = "color-mix(in oklch, var(--success) 20%, transparent)";

export function SyncArchitecture() {
  const [activeId, setActiveId] = useState<string | null>("event-bus");

  const active = nodes.find((n) => n.id === activeId);

  const isConnected = (id: string): boolean => {
    if (!activeId) return false;
    const a = nodes.find((n) => n.id === activeId);
    if (!a) return false;
    return (
      a.connections.includes(id) ||
      (nodes.find((n) => n.id === id)?.connections.includes(activeId) ?? false)
    );
  };

  const getNodeStyle = (node: ArchNode): React.CSSProperties => {
    if (node.type === "backend") {
      return { background: successBg, borderColor: successBorder };
    }
    return {};
  };

  const getNodeClass = (node: ArchNode): string => {
    const isActive = activeId === node.id;
    const connected = isConnected(node.id);

    if (isActive) {
      return cn(nodeBaseClass, "border-primary/60 bg-primary/10 ring-1 ring-primary/20");
    }
    if (connected) {
      return cn(nodeBaseClass, "border-primary/30 bg-primary/5");
    }
    if (node.type === "backend") {
      return cn(nodeBaseClass);
    }
    if (node.type === "crm") {
      return cn(nodeBaseClass, "border-border/60 bg-accent");
    }
    return cn(nodeBaseClass, "border-border/60 bg-card");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <Wifi className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
          State sync architecture — tap a node
        </span>
      </div>

      {/* Node grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {nodes.map((node) => (
          <button
            key={node.id}
            onClick={() => setActiveId(activeId === node.id ? null : node.id)}
            className={cn(
              getNodeClass(node),
              node.id === "event-bus" && "col-span-2 sm:col-span-1"
            )}
            style={getNodeStyle(node)}
          >
            <div className={cn("flex items-center gap-1.5 mb-1", nodeTypeIconClass[node.type])}>
              <node.icon className="w-3.5 h-3.5 shrink-0" />
              <span className="text-xs font-semibold text-foreground">{node.label}</span>
            </div>
            <p className="text-[10px] text-muted-foreground font-mono">{node.sublabel}</p>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div
        className={cn(
          "rounded-lg border border-border/60 bg-muted/40 p-3 min-h-[52px] transition-all duration-150",
          active ? "opacity-100" : "opacity-50"
        )}
      >
        {active ? (
          <p className="text-sm text-foreground/80 leading-relaxed">{active.detail}</p>
        ) : (
          <p className="text-xs text-muted-foreground">Select a node to see how it fits into the sync strategy</p>
        )}
      </div>
    </div>
  );
}
