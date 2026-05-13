import type { Metadata } from "next";
import { OrderTrackingClient } from "@/components/OrderTrackingClient";

export const metadata: Metadata = {
  title: "Track Your Order",
  description:
    "Track your Bengal order status, prep time, payment status, and estimated ready time.",
};

export default function TrackOrderPage() {
  return (
    <main className="bg-[#0D0A08] text-white">
      <OrderTrackingClient />
    </main>
  );
}
