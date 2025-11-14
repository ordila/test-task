import type { ReactNode } from "react";

type CarouselDotsProps = {
  scrollSnaps: number[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  dotLabel?: (index: number) => ReactNode;
};

export function CarouselDots({
  scrollSnaps,
  selectedIndex,
  onSelect,
  dotLabel,
}: CarouselDotsProps) {
  return (
    <div className="mt-6 mb-12 flex items-center justify-center gap-2">
      {scrollSnaps.map((_, index) => {
        const isActive = index === selectedIndex;
        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            className={[
              "h-2.5 cursor-pointer rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
              isActive
                ? "w-10 bg-accent shadow-[0_0_12px_rgba(249,115,22,0.35)]"
                : "w-3 bg-white/35 hover:bg-white/55",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={`Go to slide ${index + 1}`}
          >
            {dotLabel ? dotLabel(index) : null}
          </button>
        );
      })}
    </div>
  );
}
