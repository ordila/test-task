type SummaryRowProps = {
  label: string;
  amount: string;
  emphasise?: boolean;
  highlight?: boolean;
};

export function SummaryRow({
  label,
  amount,
  emphasise = false,
  highlight = false,
}: SummaryRowProps) {
  return (
    <div
      className={[
        "flex items-center justify-between text-sm",
        emphasise ? "text-lg font-semibold text-slate-900" : "text-slate-500",
        highlight ? "text-green-600" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span>{label}</span>
      <span>{amount}</span>
    </div>
  );
}
