import type { Metadata } from "next";
import { OrderTrackingClient } from "@/components/OrderTrackingClient";

export const metadata: Metadata = {
  title: "Track Your Order",
  description:
    "Track your Bengal order status, prep time, payment status, and estimated ready time.",
};

export default function TrackOrderPage() {
  return (
    <main className="bg-[#F5F2EC] text-[#121212]">
      <OrderTrackingClient />
    </main>
  );
}

