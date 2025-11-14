/**
 * Calculates the CSS flex-basis/max-width string for a carousel slide
 * to ensure even distribution and correct gap subtraction.
 *
 * @param itemsPerView The number of items visible per screen (1, 2, or 3).
 * @param gapSize The CSS gap size (e.g., "1.5rem" for Tailwind's gap-6).
 * @returns The CSS calc() string for flexBasis/maxWidth.
 */
export function calculateSlideBasis(itemsPerView: number, gapSize: string): string {
  if (itemsPerView <= 1) {
    return "100%";
  }

  return `calc((100% - (${gapSize} * ${itemsPerView - 1})) / ${itemsPerView})`;
}
