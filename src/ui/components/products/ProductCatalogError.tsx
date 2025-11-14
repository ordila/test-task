type ProductCatalogErrorProps = {
  message?: string | null;
  onRetry: () => void;
};

export function ProductCatalogError({
  message,
  onRetry,
}: ProductCatalogErrorProps) {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl border border-red-500/30 bg-red-500/10 px-8 py-16 text-center">
      <div>
        <p className="text-lg font-semibold text-red-200">
          Something went wrong
        </p>
        {!!message && <p className="mt-2 text-sm text-red-100/80">{message}</p>}
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-full border border-red-400/60 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
      >
        Try again
      </button>
    </section>
  );
}
