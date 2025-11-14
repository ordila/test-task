import { CartItem as CartItemType, CartTotals } from "@/types/cart";

import { formatCurrency } from "@utils";

import { CartItem } from "@components";
import { SummaryRow } from "@elements";

type CartSectionProps = {
  cartItems: CartItemType[];
  totals: CartTotals;
  onRemoveItem: (productId: string) => void;
  onDecreaseItem: (productId: string) => void;
  onIncreaseItem: (productId: string) => void;
};

export function CartSection({
  cartItems,
  totals,
  onRemoveItem,
  onDecreaseItem,
  onIncreaseItem,
}: CartSectionProps) {
  return (
    <section
      aria-label="Customer cart"
      id="cart"
      className="mx-auto w-full max-w-5xl rounded-3xl bg-white/95 p-6 shadow-xl shadow-primary/10 backdrop-blur"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Cart</h2>
          <p className="mt-1 text-sm text-slate-500">
            Detailed order summary in real time.
          </p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
          {cartItems.reduce((acc, item) => acc + item.quantity, 0)} pcs.
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="mt-6 flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-12 text-center">
          <p className="text-base font-medium text-slate-600">
            Your cart is empty
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Add items from the selection on the right to see the summary and
            place an order.
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-4 overflow-auto pr-2">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              cartItem={item}
              onRemove={() => onRemoveItem(item.id)}
              onDecrease={() => onDecreaseItem(item.id)}
              onIncrease={() => onIncreaseItem(item.id)}
            />
          ))}
        </ul>
      )}

      <div className="mt-8 space-y-4 border-t border-slate-200 pt-6">
        <SummaryRow label="Subtotal" amount={formatCurrency(totals.subtotal)} />
        <SummaryRow
          label="Discount"
          amount={
            totals.discount
              ? `−${formatCurrency(totals.discount)}`
              : formatCurrency(0)
          }
          highlight={totals.discount > 0}
        />
        <SummaryRow
          label="Total"
          amount={formatCurrency(totals.total)}
          emphasise
        />
        <button
          type="button"
          className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
          disabled={!cartItems.length}
        >
          Proceed to checkout
        </button>
        {cartItems.length > 0 && (
          <p className="text-xs text-slate-400">
            * A 10% discount is automatically applied to the item when ordering
            more than 5 units.
          </p>
        )}
      </div>
    </section>
  );
}
