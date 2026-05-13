import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Checkout Cancelled",
  description:
    "Return to your Bengal cart after cancelling checkout.",
};

export default function CheckoutCancelPage() {
  return (
    <main className="bg-white px-4 py-16 text-[#241D1D] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl restaurant-card rounded-lg p-8 text-center">
        <ShoppingBag
          className="mx-auto text-[#8A3430]"
          size={46}
          aria-hidden="true"
        />
        <h1 className="mt-5 text-3xl font-black sm:text-4xl">
          Checkout cancelled.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#6B5D5B]">
          Your cart is still here. Review your order or restart payment when
          you are ready.
        </p>
        <Link
          href="/cart"
          className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#8A3430] px-6 text-sm font-black text-white transition hover:bg-[#6F2926]"
        >
          Return to cart
        </Link>
      </section>
    </main>
  );
}
