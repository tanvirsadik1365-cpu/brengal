"use client";

import { useEffect, useState } from "react";
import type { PublicStoreStatus } from "@/lib/store-status-types";

type StoreStatusResponse = {
  storeStatus?: PublicStoreStatus;
};

export function useStoreStatus() {
  const [storeStatus, setStoreStatus] = useState<PublicStoreStatus | null>(null);

  useEffect(() => {
    let active = true;

    async function loadStoreStatus() {
      try {
        const response = await fetch("/api/store-status", {
          cache: "no-store",
        });
        const payload = (await response.json().catch(() => ({}))) as StoreStatusResponse;

        if (active && response.ok && payload.storeStatus) {
          setStoreStatus(payload.storeStatus);
        }
      } catch {}
    }

    void loadStoreStatus();

    const interval = window.setInterval(loadStoreStatus, 30000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return {
    orderingAllowed: storeStatus?.orderingAllowed ?? true,
    storeStatus,
  };
}
