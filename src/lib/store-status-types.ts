export type StoreOrderingStatus = "busy" | "closed" | "open" | "paused";

export type PublicStoreStatus = {
  label: string;
  message: string;
  orderingAllowed: boolean;
  prepTimeMinutes: number;
  status: StoreOrderingStatus;
};
