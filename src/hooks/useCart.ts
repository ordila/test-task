import { useEffect, useMemo, useState } from "react";

import { STORAGE_KEYS } from "@constants";

import type { CartItem, Product } from "@/types/cart";

import { calculateTotals, storage } from "@utils";

const MAX_QUANTITY = 99;
const MIN_QUANTITY = 1;

export function useCart(initialItems: CartItem[] = []) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const storedItems = storage.getJSON<CartItem[]>(
      STORAGE_KEYS.CART_ITEMS,
      initialItems
    );
    return Array.isArray(storedItems) ? storedItems : initialItems;
  });

  useEffect(() => {
    if (items.length === 0) {
      storage.remove(STORAGE_KEYS.CART_ITEMS);
      return;
    }

    storage.setJSON<CartItem[]>(STORAGE_KEYS.CART_ITEMS, items);
  }, [items]);

  const addItem = (product: Product) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, MAX_QUANTITY),
              }
            : item
        );
      }

      return [...current, { ...product, quantity: MIN_QUANTITY }];
    });
  };

  const increaseItem = (productId: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, MAX_QUANTITY),
            }
          : item
      )
    );
  };

  const decreaseItem = (productId: string) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: Math.max(item.quantity - 1, MIN_QUANTITY - 1),
              }
            : item
        )
        .filter((item) => item.quantity >= MIN_QUANTITY)
    );
  };

  const removeItem = (productId: string) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  };

  const clear = () => {
    setItems([]);
  };

  const totals = useMemo(() => calculateTotals(items), [items]);

  const itemCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  return {
    items,
    totals,
    itemCount,
    addItem,
    increaseItem,
    decreaseItem,
    removeItem,
    clear,
  };
}
