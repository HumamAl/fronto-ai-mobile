import type {
  Contact,
  Conversation,
  Appointment,
  VoiceAgent,
  Campaign,
  DashboardStats,
  ConversationVolumePoint,
  HourlyVolumePoint,
  IntentBreakdownPoint,
  AgentPerformancePoint,
  CampaignResultPoint,
  WeeklyTrendPoint,
  ContainmentTrendPoint,
} from "@/lib/types";

// ─── Voice Agents ─────────────────────────────────────────────────────────────

export const voiceAgents: VoiceAgent[] = [
  {
    id: "agt_alex01",
    name: "Alex",
    persona: "Warm, upbeat appointment setter who builds quick rapport",
    tone: "friendly",
    specialization: "appointment_setter",
    containmentRate: 81.4,
    intentRecognitionRate: 94.2,
    bookingRate: 68.7,
    totalConversations: 4382,
    avgDurationSeconds: 194,
    crmSyncRate: 98.7,
    isActive: true,
  },
  {
    id: "agt_brook2",
    name: "Brooke",
    persona: "Polished inbound receptionist — answers every question calmly",
    tone: "professional",
    specialization: "inbound_receptionist",
    containmentRate: 76.8,
    intentRecognitionRate: 91.6,
    bookingRate: 52.3,
    totalConversations: 3817,
    avgDurationSeconds: 223,
    crmSyncRate: 99.1,
    isActive: true,
  },
  {
    id: "agt_cart3",
    name: "Carter",
    persona: "High-velocity outbound qualifier — moves fast, qualifies decisively",
    tone: "fast_paced",
    specialization: "outbound_qualifier",
    containmentRate: 58.2,
    intentRecognitionRate: 87.4,
    bookingRate: 34.9,
    totalConversations: 6104,
    avgDurationSeconds: 141,
    crmSyncRate: 97.3,
    isActive: true,
  },
  {
    id: "agt_maya4",
    name: "Maya",
    persona: "Patient lead nurture specialist — works financial objections with empathy",
    tone: "empathetic",
    specialization: "lead_nurture",
    containmentRate: 72.1,
    intentRecognitionRate: 89.8,
    bookingRate: 44.6,
    totalConversations: 2941,
    avgDurationSeconds: 287,
    crmSyncRate: 96.8,
    isActive: true,
  },
];

// ─── Contacts ─────────────────────────────────────────────────────────────────

export const contacts: Contact[] = [
  { id: "con_mw8k2", name: "Marcus Webb", phone: "+1 (614) 555-0182", email: "m.webb@riversiderealty.com", company: "Riverside Realty Group", crmId: "CRM-00841", status: "converted", source: "web_form", timezone: "America/New_York", optedOut: false, totalConversations: 4, lastContactedAt: "2026-02-24T14:17:33Z", createdAt: "2026-01-08T09:42:11Z" },
  { id: "con_jo9p3", name: "Jennifer Okafor", phone: "+1 (312) 555-0247", email: "jennifer.okafor@parkviewdental.com", company: "Parkview Dental Associates", crmId: "CRM-00857", status: "appointment_set", source: "paid_search", timezone: "America/Chicago", optedOut: false, totalConversations: 2, lastContactedAt: "2026-03-01T10:05:44Z", createdAt: "2026-01-19T13:28:07Z" },
  { id: "con_de7r4", name: "Daniel Estrada", phone: "+1 (720) 555-0339", email: "destrada@cascaderoofing.com", company: "Cascade Roofing & Exteriors", crmId: "CRM-00862", status: "qualified", source: "referral", timezone: "America/Denver", optedOut: false, totalConversations: 3, lastContactedAt: "2026-02-28T16:54:20Z", createdAt: "2026-01-22T11:04:55Z" },
  { id: "con_pn6m5", name: "Priya Nair", phone: "+1 (415) 555-0491", email: "p.nair@trunorthfinancial.com", company: "TruNorth Financial Advisors", crmId: "CRM-00879", status: "contacted", source: "cold_list", timezone: "America/Los_Angeles", optedOut: false, totalConversations: 1, lastContactedAt: "2026-02-14T09:23:41Z", createdAt: "2026-01-31T15:17:38Z" },
  { id: "con_tb5n6", name: "Tyler Bouchard", phone: "+1 (503) 555-0628", email: "tyler@bluepeakauto.com", company: "BluePeak Auto Group", crmId: "CRM-00891", status: "new_lead", source: "paid_search", timezone: "America/Los_Angeles", optedOut: false, totalConversations: 1, lastContactedAt: "2026-03-04T08:47:19Z", createdAt: "2026-02-18T10:32:55Z" },
  { id: "con_ad4x7", name: "Amara Diallo", phone: "+1 (202) 555-0714", email: "amara.diallo@summithomeservices.com", company: "Summit Home Services", crmId: "CRM-00903", status: "appointment_set", source: "web_form", timezone: "America/New_York", optedOut: false, totalConversations: 2, lastContactedAt: "2026-03-05T11:08:32Z", createdAt: "2026-02-03T14:22:18Z" },
  { id: "con_kr3q8", name: "Kevin Rzepka", phone: "+1 (414) 555-0803", email: "k.rzepka@westfieldinsurance.com", company: "Westfield Insurance Partners", crmId: "CRM-00911", status: "qualified", source: "crm_import", timezone: "America/Chicago", optedOut: false, totalConversations: 3, lastContactedAt: "2026-02-27T13:44:09Z", createdAt: "2026-01-14T08:19:44Z" },
  { id: "con_ls2w9", name: "Layla Sorensen", phone: "+1 (617) 555-0966", email: "lsorensen@harborpointurgent.com", company: "Harbor Point Urgent Care", crmId: "CRM-00924", status: "converted", source: "referral", timezone: "America/New_York", optedOut: false, totalConversations: 6, lastContactedAt: "2026-03-02T09:31:17Z", createdAt: "2025-12-18T16:07:29Z" },
  { id: "con_bk1v0", name: "Brian Kowalczyk", phone: "+1 (216) 555-1047", email: "brian.k@greenwaylawn.com", company: "Greenway Lawn & Landscaping", crmId: "CRM-00938", status: "disqualified", source: "cold_list", timezone: "America/New_York", optedOut: false, totalConversations: 1, lastContactedAt: "2026-01-29T15:22:44Z", createdAt: "2026-01-28T12:48:03Z" },
  // Edge case: opted-out contact — DNC flag set, all outreach must stop
  { id: "con_sm9u1", name: "Sofia Mendes", phone: "+1 (305) 555-1183", email: "s.mendes@clearwaterhvac.com", company: "Clearwater HVAC & Plumbing", crmId: "CRM-00947", status: "opted_out", source: "cold_list", timezone: "America/New_York", optedOut: true, totalConversations: 2, lastContactedAt: "2026-02-07T10:44:52Z", createdAt: "2026-01-25T09:15:37Z" },
  { id: "con_rj8t2", name: "Rachel Jiang", phone: "+1 (512) 555-1294", email: "r.jiang@elevationdigital.com", company: "Elevation Digital Marketing", crmId: "CRM-00962", status: "contacted", source: "social_media", timezone: "America/Chicago", optedOut: false, totalConversations: 2, lastContactedAt: "2026-03-03T14:58:27Z", createdAt: "2026-02-10T11:27:41Z" },
  { id: "con_om7s3", name: "Omar Farouk", phone: "+1 (469) 555-1372", email: "ofarouk@cobaltsolutions.com", company: "Cobalt Mortgage Solutions", crmId: "CRM-00978", status: "new_lead", source: "paid_search", timezone: "America/Chicago", optedOut: false, totalConversations: 1, lastContactedAt: "2026-03-06T08:14:09Z", createdAt: "2026-03-05T17:43:22Z" },
];

// ─── Conversations ─────────────────────────────────────────────────────────────
// Status distribution: ~21% appointment_booked, ~16% completed, ~10% escalated,
// ~11% low_confidence/crm_sync_error, ~5% dropped, ~10% voicemail/no_answer,
// ~5% opted_out, ~10% in_progress/transcribing — mirrors real system distributions.

export const conversations: Conversation[] = [
  // Appointment booked (4 records)
  { id: "cvs_a1b2c", contactId: "con_mw8k2", agentId: "agt_alex01", direction: "outbound", duration: 218, status: "appointment_booked", intent: "book_appointment", confidenceScore: 0.96, sentimentScore: 0.74, disposition: "appointment_booked", crmSynced: true, transcriptLength: 287, responseLatencyMs: 412, startTime: "2026-02-24T14:08:22Z", endTime: "2026-02-24T14:11:40Z" },
  { id: "cvs_d3e4f", contactId: "con_jo9p3", agentId: "agt_brook2", direction: "inbound", duration: 167, status: "appointment_booked", intent: "book_appointment", confidenceScore: 0.93, sentimentScore: 0.61, disposition: "appointment_booked", crmSynced: true, transcriptLength: 214, responseLatencyMs: 387, startTime: "2026-03-01T09:58:11Z", endTime: "2026-03-01T10:00:58Z" },
  { id: "cvs_g5h6i", contactId: "con_ls2w9", agentId: "agt_alex01", direction: "outbound", duration: 294, status: "appointment_booked", intent: "book_appointment", confidenceScore: 0.97, sentimentScore: 0.82, disposition: "appointment_booked", crmSynced: true, transcriptLength: 341, responseLatencyMs: 356, startTime: "2026-03-02T09:14:04Z", endTime: "2026-03-02T09:19:58Z" },
  { id: "cvs_j7k8l", contactId: "con_ad4x7", agentId: "agt_alex01", direction: "outbound", duration: 203, status: "appointment_booked", intent: "book_appointment", confidenceScore: 0.94, sentimentScore: 0.55, disposition: "appointment_booked", crmSynced: true, transcriptLength: 261, responseLatencyMs: 443, startTime: "2026-03-05T11:00:14Z", endTime: "2026-03-05T11:03:37Z" },
  // Completed — qualified lead or callback (3 records)
  { id: "cvs_m9n0p", contactId: "con_de7r4", agentId: "agt_cart3", direction: "outbound", duration: 148, status: "completed", intent: "request_quote", confidenceScore: 0.89, sentimentScore: 0.38, disposition: "qualified_lead", crmSynced: true, transcriptLength: 187, responseLatencyMs: 521, startTime: "2026-02-28T16:44:07Z", endTime: "2026-02-28T16:46:35Z" },
  { id: "cvs_q1r2s", contactId: "con_kr3q8", agentId: "agt_maya4", direction: "outbound", duration: 312, status: "completed", intent: "pricing_inquiry", confidenceScore: 0.91, sentimentScore: 0.29, disposition: "callback_scheduled", crmSynced: true, transcriptLength: 378, responseLatencyMs: 467, startTime: "2026-02-27T13:32:18Z", endTime: "2026-02-27T13:37:30Z" },
  { id: "cvs_t3u4v", contactId: "con_rj8t2", agentId: "agt_brook2", direction: "inbound", duration: 241, status: "completed", intent: "business_hours_inquiry", confidenceScore: 0.95, sentimentScore: 0.42, disposition: "qualified_lead", crmSynced: true, transcriptLength: 308, responseLatencyMs: 398, startTime: "2026-03-03T14:49:51Z", endTime: "2026-03-03T14:53:52Z" },
  // Escalated — transferred to live agent (2 records)
  { id: "cvs_w5x6y", contactId: "con_pn6m5", agentId: "agt_maya4", direction: "outbound", duration: 187, status: "escalated", intent: "speak_to_agent", confidenceScore: 0.78, sentimentScore: -0.31, disposition: "transferred_to_agent", crmSynced: true, transcriptLength: 242, responseLatencyMs: 684, startTime: "2026-02-14T09:14:27Z", endTime: "2026-02-14T09:17:34Z", escalationNote: "Requested live agent after 3rd pricing question — transferred to advisor" },
  { id: "cvs_z7a8b", contactId: "con_tb5n6", agentId: "agt_cart3", direction: "inbound", duration: 132, status: "escalated", intent: "check_status", confidenceScore: 0.76, sentimentScore: -0.48, disposition: "transferred_to_agent", crmSynced: true, transcriptLength: 164, responseLatencyMs: 731, startTime: "2026-03-04T08:38:44Z", endTime: "2026-03-04T08:40:56Z", escalationNote: "Status inquiry outside agent scope — escalated to support queue" },
  // Low confidence (edge case × 2)
  { id: "cvs_c9d0e", contactId: "con_bk1v0", agentId: "agt_cart3", direction: "outbound", duration: 94, status: "low_confidence", intent: "request_quote", confidenceScore: 0.74, sentimentScore: -0.12, disposition: "disqualified", crmSynced: true, transcriptLength: 112, responseLatencyMs: 892, startTime: "2026-01-29T15:14:02Z", endTime: "2026-01-29T15:15:36Z", escalationNote: "Low intent confidence — contact expressed no interest, marked disqualified" },
  { id: "cvs_f1g2h", contactId: "con_om7s3", agentId: "agt_maya4", direction: "outbound", duration: 108, status: "low_confidence", intent: "pricing_inquiry", confidenceScore: 0.73, sentimentScore: 0.04, disposition: "callback_scheduled", crmSynced: true, transcriptLength: 138, responseLatencyMs: 947, startTime: "2026-03-06T08:06:51Z", endTime: "2026-03-06T08:08:39Z", escalationNote: "Confidence below threshold — callback scheduled for human follow-up" },
  // CRM sync errors (edge case × 3)
  { id: "cvs_i3j4k", contactId: "con_de7r4", agentId: "agt_alex01", direction: "outbound", duration: 229, status: "crm_sync_error", intent: "book_appointment", confidenceScore: 0.92, sentimentScore: 0.67, disposition: "appointment_booked", crmSynced: false, transcriptLength: 298, responseLatencyMs: 408, startTime: "2026-02-19T10:22:17Z", endTime: "2026-02-19T10:26:06Z", syncError: "HubSpot API timeout — appointment booked but contact record not updated" },
  { id: "cvs_l5m6n", contactId: "con_kr3q8", agentId: "agt_brook2", direction: "inbound", duration: 196, status: "crm_sync_error", intent: "check_status", confidenceScore: 0.88, sentimentScore: 0.22, disposition: "pending", crmSynced: false, transcriptLength: 247, responseLatencyMs: 514, startTime: "2026-02-11T15:48:33Z", endTime: "2026-02-11T15:51:49Z", syncError: "Duplicate contact merge conflict — manual resolution required in CRM" },
  { id: "cvs_o7p8q", contactId: "con_rj8t2", agentId: "agt_cart3", direction: "outbound", duration: 143, status: "crm_sync_error", intent: "request_quote", confidenceScore: 0.86, sentimentScore: 0.18, disposition: "qualified_lead", crmSynced: false, transcriptLength: 179, responseLatencyMs: 468, startTime: "2026-02-22T11:03:54Z", endTime: "2026-02-22T11:06:17Z", syncError: "Missing CRM field 'industry' — sync blocked pending enrichment" },
  // Partial / dropped call (edge case)
  { id: "cvs_r9s0t", contactId: "con_tb5n6", agentId: "agt_brook2", direction: "inbound", duration: 31, status: "dropped", intent: "book_appointment", confidenceScore: 0.81, sentimentScore: 0.07, disposition: "pending", crmSynced: false, transcriptLength: 38, responseLatencyMs: 1148, startTime: "2026-03-03T16:27:09Z", endTime: "2026-03-03T16:27:40Z", syncError: "Call dropped at 31s — carrier connection failure, retry queued" },
  // Voicemail left / no answer
  { id: "cvs_u1v2w", contactId: "con_pn6m5", agentId: "agt_cart3", direction: "outbound", duration: 45, status: "voicemail_left", intent: "schedule_callback", confidenceScore: 0.88, sentimentScore: 0.0, disposition: "voicemail_left", crmSynced: true, transcriptLength: 58, responseLatencyMs: 329, startTime: "2026-02-20T09:41:16Z", endTime: "2026-02-20T09:42:01Z" },
  { id: "cvs_x3y4z", contactId: "con_bk1v0", agentId: "agt_cart3", direction: "outbound", duration: 22, status: "no_answer", intent: "book_appointment", confidenceScore: 0.90, sentimentScore: 0.0, disposition: "no_answer", crmSynced: true, transcriptLength: 0, responseLatencyMs: 320, startTime: "2026-01-28T14:03:28Z", endTime: "2026-01-28T14:03:50Z" },
  // Opted out (edge case — DNC flag set)
  { id: "cvs_a5b6c", contactId: "con_sm9u1", agentId: "agt_cart3", direction: "outbound", duration: 87, status: "opted_out", intent: "request_quote", confidenceScore: 0.84, sentimentScore: -0.62, disposition: "opted_out", crmSynced: true, transcriptLength: 104, responseLatencyMs: 441, startTime: "2026-02-07T10:37:14Z", endTime: "2026-02-07T10:38:41Z", escalationNote: "Contact requested removal from all outreach — DNC flag set" },
  // Live / in-progress (real-time snapshot)
  { id: "cvs_d7e8f", contactId: "con_om7s3", agentId: "agt_alex01", direction: "outbound", duration: 0, status: "in_progress", intent: "book_appointment", confidenceScore: 0.0, sentimentScore: 0.0, disposition: "pending", crmSynced: false, transcriptLength: 0, responseLatencyMs: 384, startTime: "2026-03-07T08:11:02Z", endTime: "2026-03-07T08:11:02Z" },
  { id: "cvs_g9h0i", contactId: "con_ad4x7", agentId: "agt_brook2", direction: "inbound", duration: 0, status: "transcribing", intent: "check_status", confidenceScore: 0.0, sentimentScore: 0.0, disposition: "pending", crmSynced: false, transcriptLength: 0, responseLatencyMs: 362, startTime: "2026-03-07T08:09:47Z", endTime: "2026-03-07T08:09:47Z" },
];

// ─── Appointments ─────────────────────────────────────────────────────────────

export const appointments: Appointment[] = [
  { id: "apt_001xa", contactId: "con_mw8k2", conversationId: "cvs_a1b2c", scheduledAt: "2026-03-10T14:00:00Z", duration: 30, status: "confirmed", agentAssigned: "Sarah Kim", notes: "Interested in listing 4-bed property — pre-approved buyer waiting", createdAt: "2026-02-24T14:12:01Z" },
  { id: "apt_002xb", contactId: "con_jo9p3", conversationId: "cvs_d3e4f", scheduledAt: "2026-03-08T10:30:00Z", duration: 60, status: "scheduled", agentAssigned: "Dr. Reyes (Hygienist Intake)", notes: "New patient — full X-ray series needed, no prior dental records on file", createdAt: "2026-03-01T10:01:22Z" },
  { id: "apt_003xc", contactId: "con_ls2w9", conversationId: "cvs_g5h6i", scheduledAt: "2026-03-05T09:00:00Z", duration: 45, status: "completed", agentAssigned: "Dr. Patel (Urgent Care Director)", notes: "Follow-up after Q4 care gap review — discharge planning discussion", createdAt: "2026-03-02T09:20:14Z" },
  { id: "apt_004xd", contactId: "con_ad4x7", conversationId: "cvs_j7k8l", scheduledAt: "2026-03-12T13:30:00Z", duration: 30, status: "scheduled", agentAssigned: "Mike Holloway (Field Estimator)", notes: "Spring lawn care quote — 1.4 acres, backyard fence area included", createdAt: "2026-03-05T11:04:01Z" },
  { id: "apt_005xe", contactId: "con_de7r4", conversationId: "cvs_i3j4k", scheduledAt: "2026-03-11T15:00:00Z", duration: 45, status: "confirmed", agentAssigned: "Carlos Vega (Roof Inspector)", notes: "Insurance estimate for storm damage — contact wants fast-track claim filing", createdAt: "2026-02-19T10:26:18Z" },
  { id: "apt_006xf", contactId: "con_kr3q8", conversationId: "cvs_q1r2s", scheduledAt: "2026-03-07T11:00:00Z", duration: 30, status: "scheduled", agentAssigned: "Tanya Reeves (Account Manager)", notes: "Group benefits renewal — 47 employees, comparing 3 carriers", createdAt: "2026-02-27T13:38:04Z" },
  // No-show edge case
  { id: "apt_007xg", contactId: "con_pn6m5", conversationId: "cvs_w5x6y", scheduledAt: "2026-02-17T16:00:00Z", duration: 45, status: "no_show", agentAssigned: "David Osei (Senior Advisor)", notes: "Portfolio rebalancing consultation — contact missed without cancellation", createdAt: "2026-02-14T09:18:11Z" },
  // Timezone conflict edge case
  { id: "apt_008xh", contactId: "con_rj8t2", conversationId: "cvs_t3u4v", scheduledAt: "2026-03-18T14:00:00Z", duration: 60, status: "scheduled", agentAssigned: "Brenda Cole (Strategy Lead)", notes: "SEO audit delivery — contact requested morning PST slot", timezoneConflict: true, timezoneConflictNote: "Booked as 2pm EST but contact said 9am PST — 3-hour mismatch, confirm before meeting", createdAt: "2026-03-03T14:54:19Z" },
  { id: "apt_009xi", contactId: "con_ls2w9", conversationId: "cvs_g5h6i", scheduledAt: "2026-02-12T11:00:00Z", duration: 30, status: "completed", agentAssigned: "NP Linda Bjornsen", notes: "Telehealth intake — insurance pre-auth completed prior to call", createdAt: "2026-02-09T09:44:37Z" },
  // Cancelled edge case
  { id: "apt_010xj", contactId: "con_mw8k2", conversationId: "cvs_a1b2c", scheduledAt: "2026-01-28T10:00:00Z", duration: 30, status: "cancelled", agentAssigned: "Sarah Kim", notes: "Cancelled — contact rescheduled via Brooke outbound follow-up call", createdAt: "2026-01-22T14:07:19Z" },
  { id: "apt_011xk", contactId: "con_om7s3", conversationId: "cvs_d7e8f", scheduledAt: "2026-03-14T10:00:00Z", duration: 45, status: "scheduled", agentAssigned: "Keisha Bridges (Mortgage Advisor)", notes: "Pre-qualification for jumbo loan — referred by BluePeak Auto Group", createdAt: "2026-03-06T08:09:30Z" },
];

// ─── Campaigns ─────────────────────────────────────────────────────────────────

export const campaigns: Campaign[] = [
  {
    id: "cmp_q1re1",
    name: "Q1 Lead Reengagement",
    status: "active",
    agentId: "agt_cart3",
    startDate: "2026-01-06",
    endDate: null,
    contactCount: 842,
    callsMade: 617,
    bookings: 89,
    escalations: 31,
    bookingRate: 14.4,
    containmentRate: 61.7,
    objective: "Re-engage dormant leads from Q4 2025 pipeline",
    targetIndustry: "multi-industry",
  },
  {
    id: "cmp_dnpo2",
    name: "Dental New Patient Outreach",
    status: "active",
    agentId: "agt_alex01",
    startDate: "2026-02-03",
    endDate: null,
    contactCount: 384,
    callsMade: 291,
    bookings: 187,
    escalations: 8,
    bookingRate: 64.3,
    containmentRate: 83.2,
    objective: "Book new patient consultations for Parkview Dental Q1 capacity",
    targetIndustry: "dental",
  },
  {
    id: "cmp_mspu3",
    name: "March Scheduling Push",
    status: "active",
    agentId: "agt_alex01",
    startDate: "2026-03-01",
    endDate: "2026-03-31",
    contactCount: 520,
    callsMade: 184,
    bookings: 97,
    escalations: 14,
    bookingRate: 52.7,
    containmentRate: 79.4,
    objective: "Fill remaining March calendar slots across home services clients",
    targetIndustry: "home_services",
  },
  {
    id: "cmp_finq4",
    name: "TruNorth Q1 Prospect Nurture",
    status: "paused",
    agentId: "agt_maya4",
    startDate: "2026-01-13",
    endDate: null,
    contactCount: 214,
    callsMade: 198,
    bookings: 41,
    escalations: 22,
    bookingRate: 20.7,
    containmentRate: 68.4,
    objective: "Qualify and warm prospects for TruNorth advisor calendar Q1",
    targetIndustry: "financial_services",
  },
  {
    id: "cmp_insr5",
    name: "Westfield Open Enrollment Drive",
    status: "completed",
    agentId: "agt_brook2",
    startDate: "2025-11-17",
    endDate: "2025-12-19",
    contactCount: 763,
    callsMade: 763,
    bookings: 318,
    escalations: 47,
    bookingRate: 41.7,
    containmentRate: 74.9,
    objective: "Capture group insurance renewals during open enrollment window",
    targetIndustry: "insurance",
  },
];

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export const dashboardStats: DashboardStats = {
  conversationsToday: 47,
  conversationsTodayChange: 12.3,
  appointmentsBookedToday: 18,
  appointmentsBookedChange: 5.9,
  containmentRate: 74.8,
  containmentRateChange: 2.1,
  avgResponseLatencyMs: 471,
  avgResponseLatencyChange: -38,
};

// ─── Chart: Monthly Conversation Volume ───────────────────────────────────────
// Outbound spikes Q1 (reengagement push), fall (open enrollment), Q4 holiday scheduling.
// Summer months show predictable dip across all verticals.

export const conversationVolumeByMonth: ConversationVolumePoint[] = [
  { month: "Apr", inbound: 1140, outbound: 2380, booked: 847 },
  { month: "May", inbound: 1280, outbound: 2710, booked: 971 },
  { month: "Jun", inbound: 1090, outbound: 2240, booked: 804 }, // summer dip
  { month: "Jul", inbound: 1020, outbound: 2070, booked: 741 }, // low point
  { month: "Aug", inbound: 1180, outbound: 2440, booked: 883 },
  { month: "Sep", inbound: 1340, outbound: 2790, booked: 1012 }, // fall ramp-up
  { month: "Oct", inbound: 1420, outbound: 3010, booked: 1089 },
  { month: "Nov", inbound: 1680, outbound: 3470, booked: 1284 }, // open enrollment surge
  { month: "Dec", inbound: 1510, outbound: 3120, booked: 1143 }, // holiday scheduling
  { month: "Jan", inbound: 1620, outbound: 3840, booked: 1397 }, // Q1 reengagement push
  { month: "Feb", inbound: 1490, outbound: 3580, booked: 1318 },
  { month: "Mar", inbound: 1380, outbound: 3290, booked: 1201 }, // current (partial)
];

// ─── Chart: Hourly Call Volume (today) ────────────────────────────────────────
// Morning peak 9-11am and afternoon peak 1-3pm are consistent across all industries.

export const hourlyVolumeToday: HourlyVolumePoint[] = [
  { hour: "7am", calls: 12, bookings: 3 },
  { hour: "8am", calls: 31, bookings: 9 },
  { hour: "9am", calls: 87, bookings: 34 }, // morning peak
  { hour: "10am", calls: 94, bookings: 41 }, // morning peak high
  { hour: "11am", calls: 79, bookings: 29 },
  { hour: "12pm", calls: 44, bookings: 14 }, // lunch dip
  { hour: "1pm", calls: 81, bookings: 32 }, // afternoon peak
  { hour: "2pm", calls: 88, bookings: 37 }, // afternoon peak high
  { hour: "3pm", calls: 74, bookings: 26 },
  { hour: "4pm", calls: 52, bookings: 17 },
  { hour: "5pm", calls: 28, bookings: 7 },
  { hour: "6pm", calls: 14, bookings: 3 },
];

// ─── Chart: Intent Breakdown ──────────────────────────────────────────────────

export const intentBreakdown: IntentBreakdownPoint[] = [
  { intent: "Book Appointment", count: 1847, bookingRate: 71.4 },
  { intent: "Request Quote", count: 934, bookingRate: 38.2 },
  { intent: "Pricing Inquiry", count: 712, bookingRate: 29.7 },
  { intent: "Check Status", count: 541, bookingRate: 12.4 },
  { intent: "Speak to Agent", count: 388, bookingRate: 8.1 },
  { intent: "Schedule Callback", count: 274, bookingRate: 42.3 },
  { intent: "Business Hours", count: 198, bookingRate: 14.7 },
  { intent: "Cancel Appointment", count: 163, bookingRate: 6.2 },
  { intent: "Leave Message", count: 121, bookingRate: 4.9 },
];

// ─── Chart: Agent Performance Comparison ─────────────────────────────────────

export const agentPerformanceChart: AgentPerformancePoint[] = [
  { name: "Alex", containmentRate: 81.4, bookingRate: 68.7, avgDuration: 194 },
  { name: "Brooke", containmentRate: 76.8, bookingRate: 52.3, avgDuration: 223 },
  { name: "Maya", containmentRate: 72.1, bookingRate: 44.6, avgDuration: 287 },
  { name: "Carter", containmentRate: 58.2, bookingRate: 34.9, avgDuration: 141 },
];

// ─── Chart: Campaign Results Comparison ──────────────────────────────────────

export const campaignResultsChart: CampaignResultPoint[] = [
  { campaign: "Dental New Patient", callsMade: 291, bookings: 187, escalations: 8 },
  { campaign: "March Scheduling Push", callsMade: 184, bookings: 97, escalations: 14 },
  { campaign: "Q1 Reengagement", callsMade: 617, bookings: 89, escalations: 31 },
  { campaign: "TruNorth Nurture", callsMade: 198, bookings: 41, escalations: 22 },
  { campaign: "Open Enrollment", callsMade: 763, bookings: 318, escalations: 47 },
];

// ─── Chart: Weekly Trend (last 7 days) ───────────────────────────────────────
// Shows Mon-Sun call pattern. Mon-Wed peak, Thu-Fri moderate, weekend near-zero.

export const weeklyTrend: WeeklyTrendPoint[] = [
  { day: "Mon", conversations: 312, bookings: 147, escalations: 18 },
  { day: "Tue", conversations: 341, bookings: 162, escalations: 21 },
  { day: "Wed", conversations: 328, bookings: 158, escalations: 19 },
  { day: "Thu", conversations: 287, bookings: 131, escalations: 16 },
  { day: "Fri", conversations: 263, bookings: 118, escalations: 14 },
  { day: "Sat", conversations: 47, bookings: 18, escalations: 3 },
  { day: "Sun", conversations: 28, bookings: 9, escalations: 2 },
];

// ─── Chart: 30-Day Containment & Booking Rate Trend ──────────────────────────
// Containment improves as AI agents are retrained. Slight dips follow new campaign launches.

export const containmentTrend: ContainmentTrendPoint[] = [
  { date: "Feb 06", containmentRate: 71.2, bookingRate: 48.3 },
  { date: "Feb 08", containmentRate: 72.4, bookingRate: 49.1 },
  { date: "Feb 10", containmentRate: 70.8, bookingRate: 47.7 }, // new campaign launch dip
  { date: "Feb 12", containmentRate: 73.1, bookingRate: 50.4 },
  { date: "Feb 14", containmentRate: 74.3, bookingRate: 51.9 },
  { date: "Feb 17", containmentRate: 73.8, bookingRate: 51.2 },
  { date: "Feb 19", containmentRate: 75.1, bookingRate: 52.8 },
  { date: "Feb 21", containmentRate: 74.7, bookingRate: 52.4 },
  { date: "Feb 24", containmentRate: 76.2, bookingRate: 54.1 }, // model retrain
  { date: "Feb 26", containmentRate: 75.9, bookingRate: 53.7 },
  { date: "Feb 28", containmentRate: 74.1, bookingRate: 52.2 }, // March campaign prep dip
  { date: "Mar 01", containmentRate: 73.6, bookingRate: 51.8 },
  { date: "Mar 03", containmentRate: 74.8, bookingRate: 53.1 },
  { date: "Mar 05", containmentRate: 75.3, bookingRate: 54.3 },
  { date: "Mar 07", containmentRate: 74.8, bookingRate: 53.6 }, // current
];

// ─── Lookup Helpers ───────────────────────────────────────────────────────────

export const getContactById = (id: string) => contacts.find((c) => c.id === id);
export const getVoiceAgentById = (id: string) => voiceAgents.find((a) => a.id === id);
export const getCampaignById = (id: string) => campaigns.find((c) => c.id === id);
export const getConversationsByContact = (contactId: string) => conversations.filter((c) => c.contactId === contactId);
export const getAppointmentsByContact = (contactId: string) => appointments.filter((a) => a.contactId === contactId);
export const getConversationsByAgent = (agentId: string) => conversations.filter((c) => c.agentId === agentId);
export const getActiveConversations = () => conversations.filter((c) => c.status === "in_progress" || c.status === "ringing" || c.status === "connected" || c.status === "transcribing");
export const getPendingCrmSync = () => conversations.filter((c) => !c.crmSynced);
export const getUpcomingAppointments = () => appointments.filter((a) => a.status === "scheduled" || a.status === "confirmed");
