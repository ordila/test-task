import { CartItem, CartTotals } from "@/types/cart";

const LINE_DISCOUNT_THRESHOLD = 100;
const BULK_DISCOUNT_THRESHOLD = 1000;
const DISCOUNT_RATE = 0.1;

type RunningTotals = CartTotals & { undiscounted: number };

/**
 * Calculates aggregate subtotal, discount, and total for the provided cart items.
 * Applies a 10% discount to each line where the subtotal exceeds $100.
 * If the remaining full-price items exceed $1000, the same discount is applied to them as well.
 *
 * @param items Cart items that contain pricing and quantity details.
 * @returns Accumulated cart totals.
 */
export function calculateTotals(items: CartItem[]): CartTotals {
  const totals = items.reduce<RunningTotals>(
    (acc, item) => {
      const lineSubtotal = item.price * item.quantity;
      const hasLineDiscount = lineSubtotal > LINE_DISCOUNT_THRESHOLD;
      const lineDiscount = hasLineDiscount ? lineSubtotal * DISCOUNT_RATE : 0;

      acc.subtotal += lineSubtotal;
      acc.discount += lineDiscount;
      acc.total += lineSubtotal - lineDiscount;

      if (!hasLineDiscount) {
        acc.undiscounted += lineSubtotal;
      }

      return acc;
    },
    { subtotal: 0, discount: 0, total: 0, undiscounted: 0 }
  );

  if (totals.undiscounted > BULK_DISCOUNT_THRESHOLD) {
    const bulkDiscount = totals.undiscounted * DISCOUNT_RATE;

    totals.discount += bulkDiscount;
    totals.total -= bulkDiscount;
  }

  const { subtotal, discount, total } = totals;

  return { subtotal, discount, total };
}
