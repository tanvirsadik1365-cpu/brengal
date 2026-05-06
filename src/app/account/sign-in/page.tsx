import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Jamal's Indian Restaurant customer account.",
};

export default function SignInPage() {
  return (
    <main className="bg-white px-4 py-16 text-[#241D1D] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-xl">
        <AuthForm mode="sign-in" />
      </section>
    </main>
  );
}
