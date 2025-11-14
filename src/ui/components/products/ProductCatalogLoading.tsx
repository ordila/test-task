export function ProductCatalogLoading() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-3xl border border-slate-800/40 bg-slate-900/60 px-8 py-16 text-center">
      <p className="text-lg font-semibold text-slate-200">Loading catalog…</p>
      <p className="text-sm text-slate-400">
        Fetching products from the API. This might take a few seconds.
      </p>
    </section>
  );
}
