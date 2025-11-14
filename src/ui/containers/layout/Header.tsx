import { ShoppingCart as CartIcon } from "lucide-react";

type HeaderProps = {
  cartItemsCount?: number;
  onCartClick: () => void;
};

export function Header({ cartItemsCount = 0, onCartClick }: HeaderProps) {
  return (
    <header className="relative left-1/2 flex w-screen -translate-x-1/2 flex-wrap items-center justify-between gap-6 px-6 py-4 text-white sm:px-12 lg:px-16">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.35em] text-white/80 leading-none ">
          Asphalt Legends
        </span>
      </div>

      <button
        onClick={onCartClick}
        className="relative cursor-pointer inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/80 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <CartIcon className="h-6 w-6 text-white" />
        {cartItemsCount > 0 && (
          <span className="absolute -right-2 -top-2 flex min-w-5 items-center justify-center rounded-full bg-linear-to-br from-red-500 to-red-600 px-1.5 py-0.5 text-xs font-bold leading-none text-white shadow-lg ring-2 ring-slate-900">
            {cartItemsCount > 99 ? "99+" : cartItemsCount}
          </span>
        )}
      </button>
    </header>
  );
}
