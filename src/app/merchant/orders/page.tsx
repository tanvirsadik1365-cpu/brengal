import type { Metadata, Viewport } from "next";
import { LockKeyhole } from "lucide-react";
import { MerchantAppUpdater } from "@/components/MerchantAppUpdater";
import { MerchantOrdersClient } from "@/components/MerchantOrdersClient";
import {
  isValidMerchantOrderDate,
  listMerchantOrders,
  type MerchantOrder,
} from "@/lib/database-orders";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Merchant Orders",
  description: "Merchant view of Jamal's Indian Restaurant website orders.",
  manifest: "/merchant-manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Jamal's Merchant",
  },
};

export const viewport: Viewport = {
  themeColor: "#7F2F2A",
};

type MerchantOrdersPageProps = {
  searchParams: Promise<{
    date?: string;
    token?: string;
  }>;
};

function MerchantGate({
  message,
  token,
}: {
  message: string;
  token?: string;
}) {
  return (
    <main className="bg-white px-4 py-16 text-[#241D1D] sm:px-6 lg:px-8">
      <MerchantAppUpdater token={token} />
      <section className="restaurant-card mx-auto max-w-2xl rounded-lg p-8 text-center">
        <LockKeyhole className="mx-auto text-[#8A3430]" size={44} aria-hidden="true" />
        <h1 className="mt-5 text-3xl font-black">Merchant access needed</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#6B5D5B]">
          {message}
        </p>
      </section>
    </main>
  );
}

export default async function MerchantOrdersPage({
  searchParams,
}: MerchantOrdersPageProps) {
  const params = await searchParams;
  const expectedToken = process.env.MERCHANT_DASHBOARD_TOKEN?.trim();

  if (!expectedToken) {
    return (
      <MerchantGate
        message="Set MERCHANT_DASHBOARD_TOKEN in the environment, restart the app, then open this page with ?token=your-token."
        token={params.token}
      />
    );
  }

  if (params.token !== expectedToken) {
    return (
      <MerchantGate
        message="Open this merchant page with the correct dashboard token."
        token={params.token}
      />
    );
  }

  const initialOrderDate = params.date?.trim() || "";
  let orders: MerchantOrder[] = [];
  let loadError = "";

  if (initialOrderDate && !isValidMerchantOrderDate(initialOrderDate)) {
    loadError = "Choose a valid order date.";
  } else {
    try {
      orders = await listMerchantOrders({ orderDate: initialOrderDate });
    } catch (error) {
      loadError =
        error instanceof Error ? error.message : "Orders could not be loaded.";
    }
  }

  return (
    <main className="bg-white px-4 py-10 text-[#241D1D] sm:px-6 lg:px-8">
      <MerchantAppUpdater token={params.token} />
      <section className="mx-auto max-w-6xl">
        <MerchantOrdersClient
          initialError={loadError}
          initialOrderDate={initialOrderDate}
          initialOrders={orders}
          token={params.token}
        />
      </section>
    </main>
  );
}
