import type { Metadata } from "next";
import { AccountDashboard } from "@/components/AccountDashboard";

export const metadata: Metadata = {
  title: "Customer Account",
  description:
    "Customer account for Bengal bookings and saved details.",
};

export default function AccountPage() {
  return (
    <main className="bg-white text-[#241D1D]">
      <AccountDashboard />
    </main>
  );
}
