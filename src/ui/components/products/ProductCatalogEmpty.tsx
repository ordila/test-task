export function ProductCatalogEmpty() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-3xl border border-slate-800/40 bg-slate-900/60 px-8 py-16 text-center">
      <p className="text-lg font-semibold text-slate-200">
        The catalog is currently empty
      </p>
      <p className="text-sm text-slate-400">
        Add products via the API to see them in the showcase.
      </p>
    </section>
  );
}
