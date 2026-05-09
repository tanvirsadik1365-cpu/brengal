import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create a Jamal's Indian Restaurant customer account for faster bookings.",
};

export default function SignUpPage() {
  return (
    <main className="bg-[#0D0A08] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_520px] lg:items-center">
        <div>
          <p className="inline-flex rounded-full border border-white/14 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#F6DFA4]">
            Customer account
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.02] sm:text-6xl">
            Create an account for repeat orders.
          </h1>
          <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-white/62">
            Save your details once, then order, book, and track without starting
            again every time.
          </p>
        </div>
        <AuthForm mode="sign-up" />
      </section>
    </main>
  );
}
