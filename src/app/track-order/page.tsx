import type { Metadata } from "next";
import { OrderTrackingClient } from "@/components/OrderTrackingClient";

export const metadata: Metadata = {
  title: "Track Order",
  description:
    "Track your Jamal's Indian Restaurant order status, prep time, and estimated ready time.",
};

export default function TrackOrderPage() {
  return (
    <main className="bg-white text-[#241D1D]">
      <OrderTrackingClient />
    </main>
  );
}
