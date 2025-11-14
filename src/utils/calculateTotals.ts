import { CartItem, CartTotals } from "@/types/cart";

/**
 * Calculates aggregate subtotal, discount, and total for the provided cart items.
 * Applies a 10% discount to each line where the quantity exceeds five units.
 *
 * @param items Cart items that contain pricing and quantity details.
 * @returns Accumulated cart totals.
 */
export function calculateTotals(items: CartItem[]): CartTotals {
  return items.reduce<CartTotals>(
    (acc, item) => {
      const lineSubtotal = item.price * item.quantity;
      const lineDiscount = item.quantity > 5 ? lineSubtotal * 0.1 : 0;

      acc.subtotal += lineSubtotal;
      acc.discount += lineDiscount;
      acc.total += lineSubtotal - lineDiscount;

      return acc;
    },
    { subtotal: 0, discount: 0, total: 0 }
  );
}
