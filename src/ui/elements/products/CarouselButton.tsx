import type { ReactNode } from "react";

type CarouselButtonProps = {
  onClick: () => void;
  position: "left" | "right";
  children: ReactNode;
};

const baseClasses =
  "group absolute top-1/2 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white p-3 text-slate-500 shadow-lg shadow-primary/10 transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-30 sm:flex";

export function CarouselButton({ onClick, position, children }: CarouselButtonProps) {
  const positionClasses =
    position === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2";

  return (
    <button type="button" onClick={onClick} className={`${baseClasses} ${positionClasses}`}>
      <span className="pointer-events-none select-none text-lg transition-transform group-hover:translate-x-0.5">
        {children}
      </span>
    </button>
  );
}
