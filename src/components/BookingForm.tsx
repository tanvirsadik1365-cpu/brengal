"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AlertCircle, CalendarCheck, CheckCircle2, LogIn, Users } from "lucide-react";
import {
  getSupabaseBrowser,
  isSupabaseBrowserConfigured,
} from "@/lib/supabase-browser";
import { reservationTimes } from "@/lib/reservation-validation";

const fieldClass =
  "mt-2 h-12 w-full rounded-lg border border-white/12 bg-white/8 px-4 text-sm font-semibold text-white outline-none transition placeholder:text-white/35 focus:border-[#D7A542]/70 focus:ring-4 focus:ring-[#D7A542]/12";
const labelClass = "text-sm font-black text-white";

type BookingFormState = {
  date: string;
  email: string;
  guests: string;
  name: string;
  occasion: string;
  phone: string;
  requests: string;
  time: string;
};

const initialForm: BookingFormState = {
  date: "",
  email: "",
  guests: "2",
  name: "",
  occasion: "",
  phone: "",
  requests: "",
  time: "",
};

function getTodayValue() {
  return new Date().toISOString().slice(0, 10);
}

export function BookingForm() {
  const [form, setForm] = useState<BookingFormState>(initialForm);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [accountEmail, setAccountEmail] = useState("");
  const [accountReady, setAccountReady] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    reference?: string;
    tone: "error" | "success";
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const today = useMemo(getTodayValue, []);

  useEffect(() => {
    const savedProfile = window.localStorage.getItem("bengal-customer-profile-v1");

    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile) as Partial<BookingFormState>;
        setForm((current) => ({
          ...current,
          email: profile.email ?? current.email,
          name: profile.name ?? current.name,
          phone: profile.phone ?? current.phone,
        }));
      } catch {
        window.localStorage.removeItem("bengal-customer-profile-v1");
      }
    }

    if (!isSupabaseBrowserConfigured()) {
      setAccountReady(true);
      return;
    }

    const supabase = getSupabaseBrowser();

    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;
      const user = session?.user;

      if (session?.access_token) {
        setAccessToken(session.access_token);
      }

      if (user) {
        const metadata = user.user_metadata ?? {};

        setAccountEmail(user.email ?? "");
        setForm((current) => ({
          ...current,
          email: user.email ?? current.email,
          name:
            typeof metadata.full_name === "string"
              ? metadata.full_name
              : current.name,
          phone:
            typeof metadata.phone === "string" ? metadata.phone : current.phone,
        }));
      }

      setAccountReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccessToken(session?.access_token ?? null);
      setAccountEmail(session?.user.email ?? "");
    });

    return () => subscription.unsubscribe();
  }, []);

  function updateForm(field: keyof BookingFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const website = String(formData.get("website") ?? "");

    try {
      const response = await fetch("/api/reservations", {
        body: JSON.stringify({ ...form, website }),
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        method: "POST",
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
        reservationReference?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? "Booking request could not be saved.");
      }

      window.localStorage.setItem(
        "bengal-customer-profile-v1",
        JSON.stringify({
          email: form.email,
          name: form.name,
          phone: form.phone,
        }),
      );

      setStatus({
        message:
          "Thank you. Your booking request has been sent to Bengal for confirmation.",
        reference: result.reservationReference,
        tone: "success",
      });
      setForm((current) => ({
        ...initialForm,
        email: current.email,
        name: current.name,
        phone: current.phone,
      }));
    } catch (error) {
      setStatus({
        message:
          error instanceof Error
            ? error.message
            : "Booking request could not be saved.",
        tone: "error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full rounded-lg border border-white/10 bg-[#15100E] p-5 text-white shadow-[0_24px_70px_rgba(0,0,0,0.3)] sm:p-6 lg:p-7"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D7A542] text-[#150D08] shadow-[0_14px_34px_rgba(215,165,66,0.22)]">
          <CalendarCheck size={22} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 className="text-2xl font-black text-white">Booking details</h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-white/58">
            Add your date, time, guest count, and notes.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-[#D7A542]/22 bg-[#D7A542]/10 p-4 text-sm font-semibold leading-6 text-white/68">
        {accountEmail ? (
          <p>
            Signed in as <span className="font-black text-[#F6DFA4]">{accountEmail}</span>.
            Your booking will be saved to your account.
          </p>
        ) : accountReady ? (
          <p className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>Sign in or create an account to save bookings for next time.</span>
            <Link
              href="/account/sign-in"
              className="inline-flex h-10 min-h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#D7A542] px-4 text-sm font-black text-[#150D08] shadow-sm transition hover:bg-white"
            >
              <LogIn size={16} aria-hidden="true" />
              Sign in
            </Link>
          </p>
        ) : (
          <p>Checking account status...</p>
        )}
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <label className="sr-only" aria-hidden="true">
          Website
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
        <label className={labelClass}>
          Full name
          <input
            className={fieldClass}
            value={form.name}
            onChange={(event) => updateForm("name", event.target.value)}
            name="name"
            type="text"
            autoComplete="name"
            required
          />
        </label>
        <label className={labelClass}>
          Phone
          <input
            className={fieldClass}
            value={form.phone}
            onChange={(event) => updateForm("phone", event.target.value)}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
          />
        </label>
        <label className={labelClass}>
          Email
          <input
            className={fieldClass}
            value={form.email}
            onChange={(event) => updateForm("email", event.target.value)}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>
        <label className={labelClass}>
          Date
          <input
            className={fieldClass}
            value={form.date}
            onChange={(event) => updateForm("date", event.target.value)}
            min={today}
            name="date"
            type="date"
            required
          />
        </label>
        <label className={labelClass}>
          Time
          <select
            className={fieldClass}
            value={form.time}
            onChange={(event) => updateForm("time", event.target.value)}
            name="time"
            required
          >
            <option value="" disabled>
              Select time
            </option>
            {reservationTimes.map((time) => (
              <option key={time}>{time}</option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          Guests
          <select
            className={fieldClass}
            value={form.guests}
            onChange={(event) => updateForm("guests", event.target.value)}
            name="guests"
          >
            {Array.from({ length: 20 }, (_, index) => index + 1).map((guest) => (
              <option key={guest} value={guest}>
                {guest} {guest === 1 ? "guest" : "guests"}
              </option>
            ))}
            <option value="30">30 guests</option>
            <option value="50">50 guests</option>
            <option value="100">100 guests</option>
            <option value="200">200 guests</option>
          </select>
        </label>
      </div>

      <label className={`mt-5 block ${labelClass}`}>
        Occasion (optional)
        <select
          className={fieldClass}
          value={form.occasion}
          onChange={(event) => updateForm("occasion", event.target.value)}
          name="occasion"
        >
          <option value="">Select occasion</option>
          <option>Birthday</option>
          <option>Anniversary</option>
          <option>Business Dinner</option>
          <option>Date Night</option>
          <option>Family Gathering</option>
          <option>Group Booking</option>
          <option>Other</option>
        </select>
      </label>

      <label className={`mt-5 block ${labelClass}`}>
        Special requests (optional)
        <textarea
          className="mt-2 min-h-32 w-full rounded-lg border border-white/12 bg-white/8 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-white/35 focus:border-[#D7A542]/70 focus:ring-4 focus:ring-[#D7A542]/12"
          value={form.requests}
          onChange={(event) => updateForm("requests", event.target.value)}
          name="requests"
          placeholder="Allergies, high chair, group booking, birthday note, or anything we should know."
        />
      </label>

      {status ? (
        <div
          className={`mt-5 rounded-lg border p-4 text-sm leading-6 ${
            status.tone === "success"
              ? "border-emerald-300/35 bg-emerald-400/10 text-emerald-50"
              : "border-red-400/35 bg-red-500/10 text-red-50"
          }`}
        >
          <div className="flex gap-2">
            {status.tone === "success" ? (
              <CheckCircle2 className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
            ) : (
              <AlertCircle className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
            )}
            <div>
              <p className="font-black">{status.message}</p>
              {status.reference ? (
                <p className="mt-1">Reference: {status.reference}</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D7A542] px-4 py-3 text-center text-sm font-black text-[#150D08] shadow-[0_16px_38px_rgba(215,165,66,0.18)] transition hover:bg-white disabled:opacity-60"
      >
        <Users size={18} aria-hidden="true" />
        {submitting ? "Sending booking..." : "Send booking request"}
      </button>
    </form>
  );
}
