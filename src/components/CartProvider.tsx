"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, OrderType } from "@/lib/order";

type CartContextValue = {
  cart: Record<string, CartItem>;
  cartItems: CartItem[];
  itemCount: number;
  orderType: OrderType;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  clearCart: () => void;
  decreaseItem: (id: string) => void;
  getQuantity: (id: string) => number;
  removeItem: (id: string) => void;
  setOrderType: (orderType: OrderType) => void;
};

const CART_STORAGE_KEY = "jamals-cart-v1";
const ORDER_TYPE_STORAGE_KEY = "jamals-order-type-v1";

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(CART_STORAGE_KEY) ?? "{}",
    );

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    return parsed as Record<string, CartItem>;
  } catch {
    return {};
  }
}

function readStoredOrderType(): OrderType {
  if (typeof window === "undefined") {
    return "collection";
  }

  return window.localStorage.getItem(ORDER_TYPE_STORAGE_KEY) === "delivery"
    ? "delivery"
    : "collection";
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [orderType, setOrderTypeState] = useState<OrderType>("collection");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCart(readStoredCart());
    setOrderTypeState(readStoredOrderType());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, loaded]);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    window.localStorage.setItem(ORDER_TYPE_STORAGE_KEY, orderType);
  }, [loaded, orderType]);

  const cartItems = useMemo(() => Object.values(cart), [cart]);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setCart((current) => {
      const existing = current[item.id];

      return {
        ...current,
        [item.id]: {
          ...item,
          quantity: existing ? existing.quantity + 1 : 1,
        },
      };
    });
  }, []);

  const decreaseItem = useCallback((id: string) => {
    setCart((current) => {
      const existing = current[id];

      if (!existing) {
        return current;
      }

      if (existing.quantity <= 1) {
        const next = { ...current };
        delete next[id];
        return next;
      }

      return {
        ...current,
        [id]: {
          ...existing,
          quantity: existing.quantity - 1,
        },
      };
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({});
  }, []);

  const getQuantity = useCallback(
    (id: string) => cart[id]?.quantity ?? 0,
    [cart],
  );

  const setOrderType = useCallback((nextOrderType: OrderType) => {
    setOrderTypeState(nextOrderType);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      cartItems,
      itemCount,
      orderType,
      addItem,
      clearCart,
      decreaseItem,
      getQuantity,
      removeItem,
      setOrderType,
    }),
    [
      addItem,
      cart,
      cartItems,
      clearCart,
      decreaseItem,
      getQuantity,
      itemCount,
      orderType,
      removeItem,
      setOrderType,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
