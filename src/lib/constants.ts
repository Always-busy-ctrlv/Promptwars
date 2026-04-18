/**
 * Stadium Go — Application Constants
 * Single source of truth for demo data, fallback responses, and configuration.
 */

import type { Facility } from "@/hooks/useFacilities";
import type { Incentive } from "@/hooks/useIncentives";

// ─── Demo Facilities ─────────────────────────────────────────────
export const DEMO_FACILITIES: Facility[] = [
  { id: "f1", name: "Burgers & Dogs",   type: "Food",     waitTime: 2,  status: "green",  iconType: "utensils", location: "Section 102" },
  { id: "f2", name: "Stadium Brews",    type: "Drinks",   waitTime: 12, status: "yellow", iconType: "beer",     location: "Section 104" },
  { id: "f3", name: "North Restroom",   type: "Restroom", waitTime: 15, status: "red",    iconType: "shower",   location: "Section 101" },
  { id: "f4", name: "South Restroom",   type: "Restroom", waitTime: 4,  status: "green",  iconType: "shower",   location: "Section 106" },
  { id: "f5", name: "West Merch Stand", type: "Merch",    waitTime: 1,  status: "green",  iconType: "store",    location: "Section 108" },
  { id: "f6", name: "Pizza Palace",     type: "Food",     waitTime: 8,  status: "yellow", iconType: "utensils", location: "Section 110" },
];

// ─── Demo Incentives ─────────────────────────────────────────────
export const DEMO_INCENTIVES: Incentive[] = [
  {
    id: "i1",
    title: "Beat the Gate 4 Rush!",
    description: "Gate 4 is experiencing high volume. Exit via Gate 7 (West) instead and receive a voucher for a free official match scarf!",
    reward: "Free Match Scarf",
    targetGate: "Gate 7",
    probabilityWeight: 1.0,
    active: true,
  },
  {
    id: "i2",
    title: "Fast Beer Alert!",
    description: "Section 108 Brews has zero wait right now. Head there for 10% off your order — offer valid for 15 minutes.",
    reward: "10% Off Drinks",
    targetGate: "Section 108",
    probabilityWeight: 1.0,
    active: true,
  },
];

// ─── AI Chat Fallback Responses ──────────────────────────────────
export const CHAT_FALLBACK_RESPONSES: Record<string, string> = {
  beer: "🍺 **Stadium Brews** at Section 104 has a 12-min wait. But Section 108 Brews is clear — only 1 min wait and 10% off right now!",
  food: "🍔 **Burgers & Dogs** at Section 102 is your best bet — only 2 min wait! Pizza Palace at Section 110 is also good at 8 min.",
  restroom: "🚻 Skip the North Restroom (15 min). **South Restroom** at Section 106 is clear — just 4 min wait.",
  exit: "🚪 Gate 4 is congested. I recommend **Gate 7** (West) — it's 40% less crowded right now.",
  merch: "🛍️ **West Merch Stand** at Section 108 has almost no line — just 1 min wait!",
};

// ─── Chat Keyword Matcher ────────────────────────────────────────
const KEYWORD_MAP: [string[], string][] = [
  [["beer", "drink", "brew"], "beer"],
  [["food", "eat", "burger", "pizza", "hungry"], "food"],
  [["restroom", "bathroom", "toilet"], "restroom"],
  [["exit", "leave", "gate", "go home"], "exit"],
  [["merch", "shop", "souvenir", "buy"], "merch"],
];

export function getSmartChatResponse(message: string): string {
  const lower = message.toLowerCase();
  for (const [keywords, key] of KEYWORD_MAP) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return CHAT_FALLBACK_RESPONSES[key];
    }
  }
  return "I can help you find **food, drinks, restrooms, exits, or merch** with the shortest wait times. What are you looking for?";
}

// ─── Event Configuration ─────────────────────────────────────────
export const EVENT_CONFIG = {
  name: "Finals 2026",
  venue: "MetLife Stadium",
  capacity: 82500,
  currentAttendees: 42108,
  gamePeriod: "2nd Half",
  gameTime: "62:14",
  halftimeWarningMinutes: 5,
};

// ─── Stadium Map Hotspots ────────────────────────────────────────
export const MAP_HOTSPOTS = [
  { cx: 100, cy: 100, r: 16, color: "#EF4444", label: "Gate 4", labelX: 72, labelY: 82 },
  { cx: 280, cy: 200, r: 11, color: "#F59E0B", label: "Gate 7", labelX: 255, labelY: 228 },
  { cx: 200, cy: 60,  r: 13, color: "#10B981", label: "Gate 1", labelX: 184, labelY: 46 },
  { cx: 310, cy: 120, r: 9,  color: "#10B981", label: "Gate 5", labelX: 296, labelY: 108 },
];
