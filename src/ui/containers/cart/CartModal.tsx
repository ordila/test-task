import { useEffect, useState } from "react";

import { CartItem, CartTotals } from "@/types/cart";

import {
  ShoppingCart as CartIcon,
  Trash2 as TrashIcon,
  X as CloseIcon,
  MoreVertical as DotsVerticalIcon,
} from "lucide-react";

import { formatCurrency } from "@utils";

import { Modal } from "@components";

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totals: CartTotals;
  onRemoveItem: (itemId: string) => void;
  onDecreaseItem: (itemId: string) => void;
  onIncreaseItem: (itemId: string) => void;
};

export function CartModal({
  isOpen,
  onClose,
  items,
  totals,
  onRemoveItem,
  onDecreaseItem,
  onIncreaseItem,
}: CartModalProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleDropdown = (itemId: string) => {
    setOpenDropdownId(openDropdownId === itemId ? null : itemId);
  };

  const handleRemoveItem = (itemId: string) => {
    onRemoveItem(itemId);
    setOpenDropdownId(null);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (openDropdownId) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openDropdownId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed left-1/2 top-1/2  w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-slate-900 shadow-2xl border border-slate-800">
        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="max-h-[400px] space-y-4 overflow-y-auto px-8 pb-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">
                <CartIcon className="h-10 w-10 text-slate-500" />
              </div>
              <p className="text-base font-medium text-slate-100">
                Your cart is empty
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Add items to get started
              </p>
            </div>
          ) : (
            <>
              {items.map((item) => {
                const isDiscounted = item.quantity > 5;
                const lineSubtotal = item.price * item.quantity;
                const lineTotal = isDiscounted
                  ? lineSubtotal * 0.9
                  : lineSubtotal;

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-5 rounded-2xl bg-slate-800/50 p-5 border border-slate-700/50"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 flex-none rounded-xl object-cover"
                    />

                    <div className="flex flex-1 items-center justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-slate-100">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                          {formatCurrency(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-6">
                        {/* Quantity Controls */}
                        <div className="inline-flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2">
                          <button
                            onClick={() => onDecreaseItem(item.id)}
                            disabled={item.quantity === 1}
                            className="flex h-6 w-6 cursor-pointer items-center justify-center text-slate-300 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-slate-300"
                          >
                            −
                          </button>
                          <span className="min-w-6 text-center text-sm font-semibold text-slate-100">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onIncreaseItem(item.id)}
                            className="flex h-6 w-6 cursor-pointer items-center justify-center text-slate-300 transition hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="min-w-24 text-right">
                          <p className="text-lg font-bold text-slate-100">
                            {formatCurrency(lineTotal)}
                          </p>
                        </div>

                        {/* Three Dots Menu */}
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(item.id);
                            }}
                            className="cursor-pointer rounded p-1 text-slate-500 transition hover:bg-slate-700 hover:text-slate-300"
                          >
                            <DotsVerticalIcon className="h-5 w-5" />
                          </button>

                          {/* Dropdown Menu */}
                          {openDropdownId === item.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-slate-700 bg-slate-800 py-1 shadow-lg"
                            >
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-slate-300 transition-colors duration-200 hover:text-red-500"
                              >
                                <TrashIcon className="h-4 w-4" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div className="border-t border-slate-800 px-8 py-6">
            <div className="space-y-3">
              <div className="flex justify-between text-base">
                <span className="text-slate-400">Subtotal</span>
                <span className="font-semibold text-slate-100">
                  {formatCurrency(totals.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-slate-400">Discount</span>
                <span className="font-semibold text-green-400">
                  {totals.discount > 0
                    ? formatCurrency(totals.discount)
                    : "0,00 USD"}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-3 text-lg">
                <span className="font-bold text-slate-100">Total</span>
                <span className="font-bold text-slate-100">
                  {formatCurrency(totals.total)}
                </span>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-500">
              * 10% discount automatically applies to items when the subtotal
              exceeds $100. If the remaining full-price items exceed $1000, the
              same discount is applied to them as well.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
