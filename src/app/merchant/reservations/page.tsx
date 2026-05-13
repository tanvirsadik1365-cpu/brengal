import type { Metadata } from "next";
import type { Viewport } from "next";
import { LockKeyhole } from "lucide-react";
import { MerchantAppUpdater } from "@/components/MerchantAppUpdater";
import { MerchantLoginForm } from "@/components/MerchantLoginForm";
import { MerchantReservationsClient } from "@/components/MerchantReservationsClient";
import {
  listMerchantReservations,
  type ReservationRow,
} from "@/lib/database-reservations";
import {
  isMerchantAuthConfigured,
  isMerchantPageAuthorized,
} from "@/lib/merchant-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Merchant Reservations",
  description: "Merchant view of Bengal table reservations.",
  manifest: "/merchant-manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bengal Merchant",
  },
};

export const viewport: Viewport = {
  themeColor: "#7F2F2A",
};

function MerchantGate({ message }: { message: string }) {
  return (
    <main className="bg-white px-4 py-16 text-[#241D1D] sm:px-6 lg:px-8">
      <MerchantAppUpdater />
      <section className="restaurant-card mx-auto max-w-2xl rounded-lg p-8 text-center">
        <LockKeyhole className="mx-auto text-[#8A3430]" size={44} aria-hidden="true" />
        <h1 className="mt-5 text-3xl font-black">Merchant access needed</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#6B5D5B]">
          {message}
        </p>
        {isMerchantAuthConfigured() ? <MerchantLoginForm /> : null}
      </section>
    </main>
  );
}

export default async function MerchantReservationsPage() {
  if (!isMerchantAuthConfigured()) {
    return (
      <MerchantGate
        message="Set MERCHANT_DASHBOARD_TOKEN in the server environment, then restart the app."
      />
    );
  }

  if (!(await isMerchantPageAuthorized())) {
    return (
      <MerchantGate
        message="Enter the private dashboard token. It will be stored in a secure HttpOnly session cookie, not in the URL."
      />
    );
  }

  let reservations: ReservationRow[] = [];
  let loadError = "";

  try {
    reservations = await listMerchantReservations();
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Reservations could not be loaded.";
  }

  return (
    <main className="bg-white px-4 py-10 text-[#241D1D] sm:px-6 lg:px-8">
      <MerchantAppUpdater />
      <section className="mx-auto max-w-6xl">
        <MerchantReservationsClient
          initialError={loadError}
          initialReservations={reservations}
        />
      </section>
    </main>
  );
}
