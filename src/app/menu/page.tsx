import type { Metadata } from "next";
import { MenuOrderClient } from "@/components/MenuOrderClient";

export const metadata: Metadata = {
  title: "Menu | Jamal's Indian Restaurant Oxford",
  description:
    "Browse Jamal's Indian Restaurant menu in Oxford. Order starters, curries, tandoori dishes, biryani, sides, rice, breads, and set meals.",
};

export default function MenuPage() {
  return (
    <main className="bg-white text-[#241D1D]">
      <MenuOrderClient />
    </main>
  );
}
