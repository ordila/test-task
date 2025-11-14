import { CartItem as CartItemType } from "@/types/cart";

import { formatCurrency } from "@utils";

type CartItemProps = {
  cartItem: CartItemType;
  onRemove: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function CartItem({
  cartItem,
  onRemove,
  onDecrease,
  onIncrease,
}: CartItemProps) {
  const isDiscounted = cartItem.quantity > 5;
  const lineSubtotal = cartItem.price * cartItem.quantity;
  const lineTotal = isDiscounted ? lineSubtotal * 0.9 : lineSubtotal;

  return (
    <li className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 shadow-sm">
      <img
        src={cartItem.image}
        alt={cartItem.title}
        loading="lazy"
        className="h-20 w-20 flex-none rounded-xl object-cover"
      />
      <div className="flex flex-1 flex-col justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-900">
              {cartItem.title}
            </h3>
            <button
              type="button"
              onClick={onRemove}
              className="text-xs font-medium text-slate-400 transition hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/40"
            >
              Remove
            </button>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {formatCurrency(cartItem.price)} per unit
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-2 py-1 shadow-inner">
            <button
              type="button"
              onClick={onDecrease}
              className="h-8 w-8 rounded-full border border-slate-200 text-lg font-semibold text-slate-600 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/40"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="min-w-10 text-center text-sm font-semibold text-slate-800">
              {cartItem.quantity}
            </span>
            <button
              type="button"
              onClick={onIncrease}
              className="h-8 w-8 rounded-full border border-slate-200 text-lg font-semibold text-slate-600 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/40"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <div className="text-right">
            {isDiscounted && (
              <p className="text-xs font-semibold text-green-600">
                −10% discount applied
              </p>
            )}
            <p className="text-sm font-semibold text-slate-900">
              {formatCurrency(lineTotal)}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
