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
  "mt-2 h-12 w-full rounded-lg border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#8A3430] focus:ring-4 focus:ring-[#8A3430]/10";

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
    const savedProfile = window.localStorage.getItem("jamals-customer-profile-v1");

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
        window.localStorage.removeItem("jamals-customer-profile-v1");
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
        "jamals-customer-profile-v1",
        JSON.stringify({
          email: form.email,
          name: form.name,
          phone: form.phone,
        }),
      );

      setStatus({
        message:
          "Thank you. Your booking request has been sent to the restaurant for confirmation.",
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
    <form onSubmit={handleSubmit} className="restaurant-card rounded-lg p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8A3430] text-white">
          <CalendarCheck size={22} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-2xl font-black">Booking details</h2>
          <p className="mt-1 text-sm text-[#6B5D5B]">
            Add your date, time, guest count, and notes.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-[#EADAC5] bg-[#FFF9EF] p-4 text-sm leading-6 text-[#6B5D5B]">
        {accountEmail ? (
          <p>
            Signed in as <span className="font-black text-[#241D1D]">{accountEmail}</span>.
            Your booking will be saved to your account.
          </p>
        ) : accountReady ? (
          <p className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>Sign in or create an account to save bookings for next time.</span>
            <Link
              href="/account/sign-in"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-black text-[#8A3430] shadow-sm transition hover:bg-[#8A3430] hover:text-white"
            >
              <LogIn size={16} aria-hidden="true" />
              Sign in
            </Link>
          </p>
        ) : (
          <p>Checking account status...</p>
        )}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="sr-only" aria-hidden="true">
          Website
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
        <label className="text-sm font-black">
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
        <label className="text-sm font-black">
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
        <label className="text-sm font-black">
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
        <label className="text-sm font-black">
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
        <label className="text-sm font-black">
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
        <label className="text-sm font-black">
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

      <label className="mt-5 block text-sm font-black">
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
          <option>Student Group</option>
          <option>Other</option>
        </select>
      </label>

      <label className="mt-5 block text-sm font-black">
        Special requests (optional)
        <textarea
          className="mt-2 min-h-32 w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8A3430] focus:ring-4 focus:ring-[#8A3430]/10"
          value={form.requests}
          onChange={(event) => updateForm("requests", event.target.value)}
          name="requests"
          placeholder="Allergies, high chair, BYOB group, birthday note, or anything we should know."
        />
      </label>

      {status ? (
        <div
          className={`mt-5 rounded-lg border p-4 text-sm leading-6 ${
            status.tone === "success"
              ? "border-green-200 bg-green-50 text-green-900"
              : "border-red-200 bg-red-50 text-red-900"
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
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#8A3430] px-4 py-3 text-center text-sm font-black text-white transition hover:bg-[#6F2926] disabled:opacity-60"
      >
        <Users size={18} aria-hidden="true" />
        {submitting ? "Sending booking..." : "Send booking request"}
      </button>
    </form>
  );
}
