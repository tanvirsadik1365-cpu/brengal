import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create a Jamal's Indian Restaurant customer account for faster bookings.",
};

export default function SignUpPage() {
  return (
    <main className="bg-white px-4 py-16 text-[#241D1D] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-xl">
        <AuthForm mode="sign-up" />
      </section>
    </main>
  );
}
