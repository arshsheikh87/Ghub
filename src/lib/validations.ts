// Lightweight validation helpers (no Zod dependency needed,
// but structured the same way for consistency)

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> };

// ─────────────────────────────────────────────
// Booking form validation
// ─────────────────────────────────────────────
export interface BookingInput {
  name: string;
  email: string;
  phone: string;
  gameId: string;
  date: string;
  startTime: string;
  duration: number;
  foodItems?: { foodId: string; quantity: number }[];
  specialRequest?: string;
}

export function validateBooking(data: unknown): ValidationResult<BookingInput> {
  const errors: Record<string, string> = {};
  const d = data as Record<string, unknown>;

  if (!d.name || String(d.name).trim().length < 2) errors.name = "Name must be at least 2 characters";
  if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.email))) errors.email = "Valid email is required";
  if (!d.phone || !/^[+\d\s\-()]{7,20}$/.test(String(d.phone))) errors.phone = "Valid phone number is required";
  if (!d.gameId || String(d.gameId).trim() === "") errors.gameId = "Please select a game";
  if (!d.date || isNaN(new Date(String(d.date)).getTime())) errors.date = "Valid date is required";
  if (!d.startTime) errors.startTime = "Start time is required";
  const duration = Number(d.duration);
  if (!duration || duration < 1 || duration > 12) errors.duration = "Duration must be between 1 and 12 hours";

  // Date must not be in the past
  if (!errors.date) {
    const bookingDate = new Date(String(d.date));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (bookingDate < today) errors.date = "Booking date cannot be in the past";
  }

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    data: {
      name: String(d.name).trim(),
      email: String(d.email).toLowerCase().trim(),
      phone: String(d.phone).trim(),
      gameId: String(d.gameId),
      date: String(d.date),
      startTime: String(d.startTime),
      duration,
      foodItems: Array.isArray(d.foodItems) ? d.foodItems as { foodId: string; quantity: number }[] : [],
      specialRequest: d.specialRequest ? String(d.specialRequest).trim() : undefined,
    },
  };
}

// ─────────────────────────────────────────────
// Contact form validation
// ─────────────────────────────────────────────
export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export function validateContact(data: unknown): ValidationResult<ContactInput> {
  const errors: Record<string, string> = {};
  const d = data as Record<string, unknown>;

  if (!d.name || String(d.name).trim().length < 2) errors.name = "Name must be at least 2 characters";
  if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.email))) errors.email = "Valid email is required";
  if (!d.subject || String(d.subject).trim().length < 3) errors.subject = "Subject is required";
  if (!d.message || String(d.message).trim().length < 10) errors.message = "Message must be at least 10 characters";

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    data: {
      name: String(d.name).trim(),
      email: String(d.email).toLowerCase().trim(),
      phone: d.phone ? String(d.phone).trim() : undefined,
      subject: String(d.subject).trim(),
      message: String(d.message).trim(),
    },
  };
}

// ─────────────────────────────────────────────
// Admin login validation
// ─────────────────────────────────────────────
export interface AdminLoginInput {
  email: string;
  password: string;
}

export function validateAdminLogin(data: unknown): ValidationResult<AdminLoginInput> {
  const errors: Record<string, string> = {};
  const d = data as Record<string, unknown>;

  if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.email))) errors.email = "Valid email is required";
  if (!d.password || String(d.password).length < 6) errors.password = "Password is required";

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    data: {
      email: String(d.email).toLowerCase().trim(),
      password: String(d.password),
    },
  };
}
