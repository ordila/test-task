import { Product } from "@/types/cart";

import { Plus as PlusIcon } from "lucide-react";

import { formatCurrency } from "@utils";

type ProductCardProps = {
  product: Product;
  onAdd: () => void;
  cartQuantity?: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export function ProductCard({
  product,
  onAdd,
  cartQuantity = 0,
  onIncrease,
  onDecrease,
}: ProductCardProps) {
  const tags = product.tags ?? [];
  const isInCart = cartQuantity > 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-slate-900/95 shadow-[0_28px_70px_-45px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_36px_90px_-45px_rgba(0,0,0,0.8)] border border-slate-800/50">
      <div className="relative isolate aspect-5/4 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-slate-800/50 via-slate-900/80 to-black opacity-40 transition-opacity duration-500 group-hover:opacity-30" />
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="relative  h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-6 p-7">
        <div className="flex flex-wrap gap-2">
          {product.badge && (
            <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-300">
              {product.badge}
            </span>
          )}
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-slate-800/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-slate-50 transition-colors duration-300 group-hover:text-white">
            {product.title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            {product.description}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Price
            </span>
            <p className="text-lg font-semibold text-slate-100">
              {formatCurrency(product.price)}
            </p>
          </div>

          <div
            className="flex items-center justify-end"
            style={{ minWidth: "120px" }}
          >
            {isInCart ? (
              <div className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-700 bg-slate-800/50 px-3 py-2">
                <button
                  type="button"
                  onClick={onDecrease}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-700 hover:text-white"
                >
                  −
                </button>
                <span className="min-w-8 text-center text-sm font-bold text-slate-100">
                  {cartQuantity}
                </span>
                <button
                  type="button"
                  onClick={onIncrease}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-700 hover:text-white"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onAdd}
                className="group/btn relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white hover:border-white hover:scale-110 hover:shadow-lg active:scale-95"
              >
                <PlusIcon className="h-5 w-5 text-white transition-colors duration-300 group-hover/btn:text-slate-900" />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
