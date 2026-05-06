import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Choose a new password for your Jamal's customer account.",
};

export default function ResetPasswordPage() {
  return (
    <main className="bg-white px-4 py-16 text-[#241D1D] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-xl">
        <AuthForm mode="reset-password" />
      </section>
    </main>
  );
}
