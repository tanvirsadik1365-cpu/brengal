import type { Metadata } from "next";
import { CartPageClient } from "@/components/CartPageClient";

export const metadata: Metadata = {
  title: "Cart & Payment",
  description:
    "Review your Jamal's Indian Restaurant order, choose collection or delivery, add your details and pay by card or cash.",
};

export default function CartPage() {
  return (
    <main className="bg-white text-[#241D1D]">
      <CartPageClient />
    </main>
  );
}
