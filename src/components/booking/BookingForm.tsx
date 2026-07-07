"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Utensils, User, Mail, Phone, ChevronRight, CheckCircle } from "lucide-react";
import { Input, Select, Textarea, FieldWrapper } from "@/components/ui/Form";
import { GlassCard } from "@/components/ui/Card";
import { TIME_SLOTS, DURATION_OPTIONS } from "@/constants";
import type { Game, FoodItem } from "@/types";
import { cn } from "@/utils/cn";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  gameId: string;
  date: string;
  startTime: string;
  duration: number;
  foodItems: { foodId: string; quantity: number }[];
  specialRequest: string;
}

interface FormErrors {
  [key: string]: string;
}

const STEPS = [
  { id: 1, title: "Station & Time", icon: Calendar },
  { id: 2, title: "Food & Drinks", icon: Utensils },
  { id: 3, title: "Your Details", icon: User },
  { id: 4, title: "Confirm", icon: CheckCircle },
];

export function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [games, setGames] = useState<Game[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const [form, setForm] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    gameId: searchParams.get("gameId") ?? "",
    date: minDate,
    startTime: "14:00",
    duration: 1,
    foodItems: [],
    specialRequest: "",
  });

  useEffect(() => {
    fetch("/api/games").then((r) => r.json()).then((j) => { if (j.success) setGames(j.data); });
    fetch("/api/food").then((r) => r.json()).then((j) => { if (j.success) setFoodItems(j.data); });
  }, []);

  const update = (field: keyof BookingFormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  };

  const getFoodQty = (foodId: string) => form.foodItems.find((f) => f.foodId === foodId)?.quantity ?? 0;

  const updateFoodQty = (foodId: string, delta: number) => {
    setForm((prev) => {
      const existing = prev.foodItems.find((f) => f.foodId === foodId);
      const newQty = (existing?.quantity ?? 0) + delta;
      if (newQty <= 0) return { ...prev, foodItems: prev.foodItems.filter((f) => f.foodId !== foodId) };
      if (existing) return { ...prev, foodItems: prev.foodItems.map((f) => f.foodId === foodId ? { ...f, quantity: newQty } : f) };
      return { ...prev, foodItems: [...prev.foodItems, { foodId, quantity: 1 }] };
    });
  };

  const selectedGame = games.find((g) => g.id === form.gameId);
  const gamePrice = selectedGame ? Number(selectedGame.pricePerHour) * form.duration : 0;
  const foodPrice = form.foodItems.reduce((acc, fi) => {
    const item = foodItems.find((f) => f.id === fi.foodId);
    return acc + (item ? Number(item.price) * fi.quantity : 0);
  }, 0);
  const totalPrice = gamePrice + foodPrice;

  const validateStep = () => {
    const newErrors: FormErrors = {};
    if (step === 1) {
      if (!form.gameId) newErrors.gameId = "Please select a game station";
      if (!form.date) newErrors.date = "Please select a date";
      if (!form.startTime) newErrors.startTime = "Please select a start time";
    }
    if (step === 3) {
      if (!form.name.trim() || form.name.length < 2) newErrors.name = "Name must be at least 2 characters";
      if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Valid email is required";
      if (!form.phone || form.phone.length < 7) newErrors.phone = "Valid phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 4));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, duration: Number(form.duration) }),
      });
      const json = await res.json();
      if (json.success) {
        router.push(`/booking/success?id=${json.data.bookingId}`);
      } else {
        setErrors({ submit: json.error ?? "Failed to create booking. Please try again." });
        setStep(1);
      }
    } catch {
      setErrors({ submit: "Network error. Please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const gameOptions = games.map((g) => ({
    value: g.id,
    label: `${g.name} — Rs ${Number(g.pricePerHour).toLocaleString()}/hr`,
    disabled: !g.isAvailable,
  }));

  const calcEndTime = () => {
    if (!form.startTime) return "";
    const [h, m] = form.startTime.split(":").map(Number);
    const endH = h + form.duration;
    return `${String(endH).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-gaming max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Book Your <span className="gradient-text">Session</span>
          </h1>
          <p className="text-white/60">Complete the steps below to secure your slot.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-10">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = step === s.id;
            const done = step > s.id;
            return (
              <div key={s.id} className="flex items-center">
                <div className={cn(
                  "flex flex-col sm:flex-row items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300",
                  active && "bg-purple-600/20",
                )}>
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all",
                    done ? "bg-purple-600 border-purple-600" : active ? "border-purple-500 bg-purple-500/20" : "border-white/20 bg-white/5"
                  )}>
                    <Icon className={cn("w-4 h-4", done || active ? "text-white" : "text-white/40")} />
                  </div>
                  <span className={cn("text-xs font-medium hidden sm:block", active ? "text-white" : done ? "text-purple-400" : "text-white/40")}>{s.title}</span>
                </div>
                {i < STEPS.length - 1 && <div className={cn("w-8 h-px mx-1 transition-all", step > s.id ? "bg-purple-500" : "bg-white/10")} />}
              </div>
            );
          })}
        </div>

        {/* Global error */}
        {errors.submit && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {errors.submit}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form area */}
          <div className="lg:col-span-2">
            <GlassCard padding="lg">
              {/* Step 1 — Station & Time */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" /> Choose Station & Time
                  </h2>
                  <FieldWrapper label="Gaming Station" required error={errors.gameId}>
                    <Select
                      options={gameOptions}
                      placeholder="Select a game station"
                      value={form.gameId}
                      onChange={(e) => update("gameId", e.target.value)}
                      error={errors.gameId}
                    />
                  </FieldWrapper>
                  <FieldWrapper label="Date" required error={errors.date}>
                    <Input
                      type="date"
                      value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                      min={minDate}
                      error={errors.date}
                      leftIcon={<Calendar className="w-4 h-4" />}
                    />
                  </FieldWrapper>
                  <div className="grid grid-cols-2 gap-4">
                    <FieldWrapper label="Start Time" required error={errors.startTime}>
                      <Select
                        options={TIME_SLOTS.map((t) => ({ value: t, label: t }))}
                        value={form.startTime}
                        onChange={(e) => update("startTime", e.target.value)}
                        error={errors.startTime}
                      />
                    </FieldWrapper>
                    <FieldWrapper label="Duration">
                      <Select
                        options={DURATION_OPTIONS.map((d) => ({ value: String(d.value), label: d.label }))}
                        value={String(form.duration)}
                        onChange={(e) => update("duration", Number(e.target.value))}
                      />
                    </FieldWrapper>
                  </div>
                  {form.startTime && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="text-white/70 text-sm">
                        Your session: <strong className="text-white">{form.startTime}</strong> to <strong className="text-white">{calcEndTime()}</strong>
                      </span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 2 — Food */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-purple-400" /> Add Food & Drinks (Optional)
                  </h2>
                  {foodItems.length === 0 ? (
                    <p className="text-white/50 text-center py-8">No food items available right now.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {foodItems.map((item) => {
                        const qty = getFoodQty(item.id);
                        return (
                          <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="min-w-0 flex-1">
                              <p className="text-white text-sm font-medium truncate">{item.name}</p>
                              <p className="text-purple-400 text-sm font-bold">Rs {Number(item.price).toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-3 shrink-0">
                              <button onClick={() => updateFoodQty(item.id, -1)} disabled={qty === 0}
                                className={cn("w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all", qty > 0 ? "bg-purple-600 text-white hover:bg-purple-500" : "bg-white/10 text-white/30 cursor-not-allowed")}>−</button>
                              <span className="w-6 text-center text-white font-bold text-sm tabular-nums">{qty}</span>
                              <button onClick={() => updateFoodQty(item.id, 1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-sm bg-purple-600 text-white hover:bg-purple-500 transition-all">+</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 3 — Personal Details */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-400" /> Your Details
                  </h2>
                  <FieldWrapper label="Full Name" required error={errors.name}>
                    <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Ali Hassan" leftIcon={<User className="w-4 h-4" />} error={errors.name} />
                  </FieldWrapper>
                  <FieldWrapper label="Email Address" required error={errors.email}>
                    <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="ali@email.com" leftIcon={<Mail className="w-4 h-4" />} error={errors.email} />
                  </FieldWrapper>
                  <FieldWrapper label="Phone Number" required error={errors.phone}>
                    <Input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+92 300 1234567" leftIcon={<Phone className="w-4 h-4" />} error={errors.phone} />
                  </FieldWrapper>
                  <FieldWrapper label="Special Request">
                    <Textarea
                      value={form.specialRequest}
                      onChange={(e) => update("specialRequest", e.target.value)}
                      placeholder="Any special setup, birthday surprise, accessibility needs..."
                      rows={3}
                      maxLength={300}
                      showCount
                    />
                  </FieldWrapper>
                </motion.div>
              )}

              {/* Step 4 — Confirmation */}
              {step === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400" /> Confirm Your Booking
                  </h2>
                  <div className="space-y-3">
                    {[
                      { label: "Station", value: selectedGame?.name ?? "—" },
                      { label: "Date", value: new Date(form.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) },
                      { label: "Time", value: `${form.startTime} – ${calcEndTime()}` },
                      { label: "Duration", value: `${form.duration} ${form.duration === 1 ? "hour" : "hours"}` },
                      { label: "Name", value: form.name },
                      { label: "Email", value: form.email },
                      { label: "Phone", value: form.phone },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between py-2 border-b border-white/8">
                        <span className="text-white/50 text-sm">{label}</span>
                        <span className="text-white text-sm font-medium">{value}</span>
                      </div>
                    ))}
                    {form.foodItems.length > 0 && (
                      <div className="py-2 border-b border-white/8">
                        <span className="text-white/50 text-sm">Food & Drinks</span>
                        <div className="mt-2 space-y-1">
                          {form.foodItems.map((fi) => {
                            const item = foodItems.find((f) => f.id === fi.foodId);
                            return item ? (
                              <div key={fi.foodId} className="flex justify-between text-sm">
                                <span className="text-white/70">{item.name} × {fi.quantity}</span>
                                <span className="text-white">Rs {(Number(item.price) * fi.quantity).toLocaleString()}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-white font-bold">Total</span>
                      <span className="text-xl font-black gradient-text">Rs {totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs pt-2">Payment is collected at the venue. You&apos;ll receive a confirmation email after booking.</p>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                {step > 1 ? (
                  <button onClick={() => setStep((s) => s - 1)} className="px-6 py-3 rounded-xl text-sm font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-all">
                    ← Back
                  </button>
                ) : <div />}
                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] hover:brightness-110 hover:shadow-[0_0_24px_rgba(139,92,246,0.4)] transition-all"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] hover:brightness-110 disabled:opacity-60 disabled:cursor-wait transition-all"
                  >
                    {submitting ? "Confirming..." : "Confirm Booking"}
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Sidebar summary */}
          <div className="space-y-4">
            <GlassCard padding="md">
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Booking Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">Station</span>
                  <span className="text-white font-medium">{selectedGame?.name ?? "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Duration</span>
                  <span className="text-white">{form.duration}h</span>
                </div>
                {gamePrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-white/50">Gaming cost</span>
                    <span className="text-white">Rs {gamePrice.toLocaleString()}</span>
                  </div>
                )}
                {foodPrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-white/50">Food & drinks</span>
                    <span className="text-white">Rs {foodPrice.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-3 flex justify-between font-bold">
                  <span className="text-white">Total</span>
                  <span className="gradient-text text-lg">Rs {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </GlassCard>
            <GlassCard padding="md">
              <h3 className="text-white font-semibold mb-3 text-sm">Need help?</h3>
              <p className="text-white/50 text-xs mb-3">Call us or send a WhatsApp message</p>
              <a href="tel:+923001234567" className="block text-purple-400 text-sm font-semibold hover:text-purple-300 transition-colors">+92 300 1234567</a>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
