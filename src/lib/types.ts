import type { LucideIcon } from "lucide-react";

// ─── Sidebar navigation ───────────────────────────────────────────────────────

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// ─── Challenge visualization types ───────────────────────────────────────────

export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// ─── Proposal types ───────────────────────────────────────────────────────────

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string; timeline?: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// ─── Screen definition for frame-based demo formats ──────────────────────────

export interface DemoScreen {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
}

// ─── Conversion element variant types ────────────────────────────────────────

export type ConversionVariant = "sidebar" | "inline" | "floating" | "banner";

// ─── Voice AI / Conversational Automation Domain Types ───────────────────────

// Conversation status — active, problem, and terminal states
export type ConversationStatus =
  | "in_progress"
  | "ringing"
  | "connected"
  | "transcribing"
  | "escalated"
  | "low_confidence"
  | "failed"
  | "crm_sync_error"
  | "dropped"
  | "completed"
  | "appointment_booked"
  | "voicemail_left"
  | "no_answer"
  | "opted_out";

export type CallDirection = "inbound" | "outbound";

export type ConversationIntent =
  | "book_appointment"
  | "request_quote"
  | "check_status"
  | "cancel_appointment"
  | "speak_to_agent"
  | "business_hours_inquiry"
  | "pricing_inquiry"
  | "schedule_callback"
  | "leave_message";

export type ConversationDisposition =
  | "appointment_booked"
  | "callback_scheduled"
  | "qualified_lead"
  | "transferred_to_agent"
  | "voicemail_left"
  | "no_answer"
  | "opted_out"
  | "disqualified"
  | "pending";

export interface Conversation {
  id: string;
  contactId: string;
  agentId: string;
  direction: CallDirection;
  /** Duration in seconds (80-370s typical) */
  duration: number;
  status: ConversationStatus;
  intent: ConversationIntent;
  /** 0.72–0.98 — how confident the AI was in the interaction */
  confidenceScore: number;
  /** -0.8 to +0.9 — detected caller sentiment */
  sentimentScore: number;
  disposition: ConversationDisposition;
  crmSynced: boolean;
  /** Word count of the call transcript */
  transcriptLength: number;
  /** Response latency in ms (320–1200ms) */
  responseLatencyMs: number;
  startTime: string;
  endTime: string;
  escalationNote?: string;
  syncError?: string;
}

// ─── Contacts ─────────────────────────────────────────────────────────────────

export type ContactStatus =
  | "new_lead"
  | "contacted"
  | "qualified"
  | "appointment_set"
  | "converted"
  | "disqualified"
  | "opted_out";

export type ContactSource =
  | "web_form"
  | "paid_search"
  | "referral"
  | "direct_call"
  | "social_media"
  | "cold_list"
  | "crm_import";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  crmId: string;
  status: ContactStatus;
  source: ContactSource;
  timezone: string;
  optedOut: boolean;
  totalConversations: number;
  lastContactedAt: string | null;
  createdAt: string;
}

// ─── Appointments ─────────────────────────────────────────────────────────────

export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "completed"
  | "no_show"
  | "cancelled";

export interface Appointment {
  id: string;
  contactId: string;
  conversationId: string;
  scheduledAt: string;
  /** Duration in minutes */
  duration: number;
  status: AppointmentStatus;
  agentAssigned: string;
  notes: string | null;
  /** Timezone mismatch flag — edge case */
  timezoneConflict?: boolean;
  timezoneConflictNote?: string;
  createdAt: string;
}

// ─── Voice Agents ─────────────────────────────────────────────────────────────

export type AgentTone =
  | "friendly"
  | "professional"
  | "fast_paced"
  | "empathetic";

export type AgentSpecialization =
  | "appointment_setter"
  | "inbound_receptionist"
  | "outbound_qualifier"
  | "lead_nurture";

export interface VoiceAgent {
  id: string;
  name: string;
  persona: string;
  tone: AgentTone;
  specialization: AgentSpecialization;
  /** Call containment rate percentage (48–88%) */
  containmentRate: number;
  /** Intent recognition accuracy percentage (79–97%) */
  intentRecognitionRate: number;
  /** Booking conversion rate percentage (28–74%) */
  bookingRate: number;
  totalConversations: number;
  avgDurationSeconds: number;
  crmSyncRate: number;
  isActive: boolean;
}

// ─── Campaigns ────────────────────────────────────────────────────────────────

export type CampaignStatus =
  | "draft"
  | "active"
  | "paused"
  | "completed"
  | "cancelled";

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  agentId: string;
  startDate: string;
  endDate: string | null;
  contactCount: number;
  callsMade: number;
  bookings: number;
  escalations: number;
  /** Booking rate as percentage */
  bookingRate: number;
  /** Containment rate as percentage */
  containmentRate: number;
  objective: string;
  targetIndustry: string;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export interface DashboardStats {
  /** Conversations processed today */
  conversationsToday: number;
  conversationsTodayChange: number;
  /** Appointments booked today */
  appointmentsBookedToday: number;
  appointmentsBookedChange: number;
  /** AI containment rate — % handled without escalation */
  containmentRate: number;
  containmentRateChange: number;
  /** Average AI response latency in ms */
  avgResponseLatencyMs: number;
  avgResponseLatencyChange: number;
}

// ─── Chart Data ───────────────────────────────────────────────────────────────

export interface ConversationVolumePoint {
  month: string;
  inbound: number;
  outbound: number;
  booked: number;
}

export interface HourlyVolumePoint {
  hour: string;
  calls: number;
  bookings: number;
}

export interface IntentBreakdownPoint {
  intent: string;
  count: number;
  bookingRate: number;
}

export interface AgentPerformancePoint {
  name: string;
  containmentRate: number;
  bookingRate: number;
  avgDuration: number;
}

export interface CampaignResultPoint {
  campaign: string;
  callsMade: number;
  bookings: number;
  escalations: number;
}

export interface WeeklyTrendPoint {
  /** Day label, e.g. "Mon", "Tue" */
  day: string;
  conversations: number;
  bookings: number;
  escalations: number;
}

export interface ContainmentTrendPoint {
  /** Date label, e.g. "Feb 24" */
  date: string;
  containmentRate: number;
  bookingRate: number;
}
