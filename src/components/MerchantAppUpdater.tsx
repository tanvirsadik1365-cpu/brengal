"use client";

import { useEffect } from "react";

const merchantTokenStorageKey = "jamals-merchant-token-v1";
const merchantReloadStorageKey = "jamals-merchant-sw-reloaded-v1";

type MerchantAppUpdaterProps = {
  token?: string | null;
};

function registerMerchantServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  const hadController = Boolean(navigator.serviceWorker.controller);

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || sessionStorage.getItem(merchantReloadStorageKey)) {
      return;
    }

    sessionStorage.setItem(merchantReloadStorageKey, "true");
    window.location.reload();
  });

  navigator.serviceWorker
    .register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    })
    .then((registration) => {
      if (registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }

      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;

        worker?.addEventListener("statechange", () => {
          if (worker.state === "installed" && navigator.serviceWorker.controller) {
            worker.postMessage({ type: "SKIP_WAITING" });
          }
        });
      });

      return registration.update();
    })
    .catch(() => {
      // The merchant page should still work if a browser blocks service workers.
    });
}

export function MerchantAppUpdater({ token }: MerchantAppUpdaterProps) {
  useEffect(() => {
    const cleanToken = token?.trim();

    if (cleanToken) {
      window.localStorage.setItem(merchantTokenStorageKey, cleanToken);
    } else {
      const savedToken = window.localStorage.getItem(merchantTokenStorageKey);

      if (savedToken) {
        const merchantPath = window.location.pathname.startsWith("/merchant/")
          ? window.location.pathname
          : "/merchant/orders";
        const params = new URLSearchParams(window.location.search);

        params.set("token", savedToken);
        window.location.replace(`${merchantPath}?${params.toString()}`);
      }
    }

    registerMerchantServiceWorker();
  }, [token]);

  return null;
}
