import type { NavItem } from "@/types";

// ─────────────────────────────────────────────
// Site Config
// ─────────────────────────────────────────────
export const SITE_CONFIG = {
  name: "NexusPlay",
  tagline: "Where Gaming Meets Excellence",
  description:
    "Premium gaming cafe with high-end PCs, PS5, Xbox, VR, and Racing simulators. Book your slot and experience gaming like never before.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@nexusplay.com",
  phone: "+92 300 1234567",
  whatsapp: "+923001234567",
  address: "123 Gaming Street, Sector F-7, Islamabad, Pakistan",
  mapUrl: "https://maps.google.com/?q=Islamabad+Pakistan",
  socials: {
    instagram: "https://instagram.com/nexusplay",
    facebook: "https://facebook.com/nexusplay",
    twitter: "https://twitter.com/nexusplay",
    youtube: "https://youtube.com/nexusplay",
  },
  openingHours: {
    weekdays: "12:00 PM – 12:00 AM",
    weekends: "10:00 AM – 2:00 AM",
    label: "Open Daily",
  },
} as const;

// ─────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Games", href: "/games" },
  { label: "Pricing", href: "/pricing" },
  { label: "Food", href: "/food" },
  { label: "Gallery", href: "/gallery" },
  { label: "Booking", href: "/booking" },
  { label: "Contact", href: "/contact" },
];

// ─────────────────────────────────────────────
// Game Categories
// ─────────────────────────────────────────────
export const GAME_CATEGORIES = [
  { value: "PC", label: "PC Gaming", icon: "🖥️" },
  { value: "PS5", label: "PlayStation 5", icon: "🎮" },
  { value: "XBOX", label: "Xbox Series X", icon: "🕹️" },
  { value: "VR", label: "Virtual Reality", icon: "🥽" },
  { value: "RACING", label: "Racing Sim", icon: "🏎️" },
  { value: "MOBILE", label: "Mobile Gaming", icon: "📱" },
] as const;

// ─────────────────────────────────────────────
// Food Categories
// ─────────────────────────────────────────────
export const FOOD_CATEGORIES = [
  { value: "SNACKS", label: "Snacks" },
  { value: "COLD_DRINKS", label: "Cold Drinks" },
  { value: "ENERGY_DRINKS", label: "Energy Drinks" },
  { value: "COMBOS", label: "Combos" },
  { value: "HOT_FOOD", label: "Hot Food" },
] as const;

// ─────────────────────────────────────────────
// Gallery Categories
// ─────────────────────────────────────────────
export const GALLERY_CATEGORIES = [
  { value: "ALL", label: "All" },
  { value: "GENERAL", label: "General" },
  { value: "GAMING", label: "Gaming" },
  { value: "EVENTS", label: "Events" },
  { value: "FOOD", label: "Food" },
  { value: "INTERIOR", label: "Interior" },
] as const;

// ─────────────────────────────────────────────
// Plan Types
// ─────────────────────────────────────────────
export const PLAN_TYPES = [
  { value: "HOURLY", label: "Hourly Plans" },
  { value: "MEMBERSHIP", label: "Memberships" },
  { value: "WEEKEND", label: "Weekend Deals" },
  { value: "SPECIAL", label: "Special Offers" },
] as const;

// ─────────────────────────────────────────────
// Booking Time Slots
// ─────────────────────────────────────────────
export const TIME_SLOTS = [
  "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
  "22:00", "23:00",
] as const;

export const DURATION_OPTIONS = [
  { value: 1, label: "1 Hour" },
  { value: 2, label: "2 Hours" },
  { value: 3, label: "3 Hours" },
  { value: 4, label: "4 Hours" },
  { value: 5, label: "5 Hours" },
  { value: 6, label: "6 Hours" },
] as const;

// ─────────────────────────────────────────────
// Stats (Home page)
// ─────────────────────────────────────────────
export const HOME_STATS = [
  { value: 500, suffix: "+", label: "Happy Gamers" },
  { value: 50, suffix: "+", label: "Gaming Stations" },
  { value: 10, suffix: "+", label: "Game Titles" },
  { value: 3, suffix: "yr", label: "In Business" },
] as const;

// ─────────────────────────────────────────────
// Booking Status Colors
// ─────────────────────────────────────────────
export const BOOKING_STATUS_COLORS: Record<string, string> = {
  PENDING: "text-yellow-400 bg-yellow-400/10",
  CONFIRMED: "text-green-400 bg-green-400/10",
  CANCELLED: "text-red-400 bg-red-400/10",
  COMPLETED: "text-blue-400 bg-blue-400/10",
  NO_SHOW: "text-gray-400 bg-gray-400/10",
};
