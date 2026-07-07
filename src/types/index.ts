// ─────────────────────────────────────────────
// Game Types
// ─────────────────────────────────────────────
export type GameCategory = "PC" | "PS5" | "XBOX" | "VR" | "RACING" | "MOBILE";

export interface Game {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: GameCategory;
  image: string;
  pricePerHour: number;
  totalSeats: number;
  isAvailable: boolean;
  isFeatured: boolean;
  order: number;
  specs?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

// ─────────────────────────────────────────────
// Pricing Types
// ─────────────────────────────────────────────
export type PlanType = "HOURLY" | "MEMBERSHIP" | "WEEKEND" | "SPECIAL";

export interface PricingPlan {
  id: string;
  name: string;
  type: PlanType;
  price: number;
  duration: string;
  description?: string;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  order: number;
}

// ─────────────────────────────────────────────
// Food Types
// ─────────────────────────────────────────────
export type FoodCategory =
  | "SNACKS"
  | "COLD_DRINKS"
  | "ENERGY_DRINKS"
  | "COMBOS"
  | "HOT_FOOD";

export interface FoodItem {
  id: string;
  name: string;
  description?: string;
  category: FoodCategory;
  price: number;
  image?: string;
  isAvailable: boolean;
  isFeatured: boolean;
  order: number;
}

// ─────────────────────────────────────────────
// Gallery Types
// ─────────────────────────────────────────────
export type GalleryCategory =
  | "GENERAL"
  | "GAMING"
  | "EVENTS"
  | "FOOD"
  | "INTERIOR";

export interface GalleryImage {
  id: string;
  title?: string;
  url: string;
  thumbnail?: string;
  category: GalleryCategory;
  alt?: string;
  order: number;
  isActive: boolean;
}

// ─────────────────────────────────────────────
// Booking Types
// ─────────────────────────────────────────────
export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | "NO_SHOW";

export type PaymentStatus = "PENDING" | "PAID" | "REFUNDED" | "FAILED";

export interface Booking {
  id: string;
  bookingId: string;
  name: string;
  email: string;
  phone: string;
  gameId: string;
  game?: Game;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  status: BookingStatus;
  totalAmount: number;
  specialRequest?: string;
  paymentStatus: PaymentStatus;
  foodItems?: BookingFoodItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingFoodItem {
  id: string;
  bookingId: string;
  foodId: string;
  food?: FoodItem;
  quantity: number;
  price: number;
}

// ─────────────────────────────────────────────
// Booking Form Types
// ─────────────────────────────────────────────
export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  gameId: string;
  date: string;
  startTime: string;
  duration: number;
  foodItems: { foodId: string; quantity: number }[];
  specialRequest?: string;
}

// ─────────────────────────────────────────────
// Contact Types
// ─────────────────────────────────────────────
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// ─────────────────────────────────────────────
// Admin Types
// ─────────────────────────────────────────────
export type AdminRole = "SUPER_ADMIN" | "ADMIN";

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  createdAt: Date;
}

// ─────────────────────────────────────────────
// API Response Types
// ─────────────────────────────────────────────
export interface ApiResponse<T = void> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// ─────────────────────────────────────────────
// Navigation Types
// ─────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
