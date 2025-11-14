import { useMemo } from "react";

import type { CartItem, Product } from "@/types/cart";

import { useEmblaCarouselControl, useItemsPerView } from "@/hooks";

import { calculateSlideBasis } from "@/utils";

import { ProductCard } from "@components";
import { CarouselButton, CarouselDots } from "@elements";

const GAP_VALUE = "24px";

type ProductCarouselProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
  cartItems: CartItem[];
  onIncreaseItem: (productId: string) => void;
  onDecreaseItem: (productId: string) => void;
};

export function ProductCarousel({
  products,
  onAddToCart,
  cartItems = [],
  onIncreaseItem,
  onDecreaseItem,
}: ProductCarouselProps) {
  const itemsPerView = useItemsPerView();

  const {
    emblaRef,
    scrollPrev,
    scrollNext,
    scrollTo,
    scrollSnaps,
    selectedIndex,
  } = useEmblaCarouselControl({
    slidesToScroll: itemsPerView,
  });

  const slideWidth = calculateSlideBasis(itemsPerView, GAP_VALUE);

  const cartQuantitiesById = useMemo(() => {
    return cartItems.reduce<Record<string, number>>((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
  }, [cartItems]);

  return (
    <div className="relative w-full px-4 md:px-6 lg:px-8">
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-[36px] bg-transparent"
      >
        <div className="flex gap-6 py-6">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="min-w-0 shrink-0"
                style={{ flexBasis: slideWidth, maxWidth: slideWidth }}
              >
                <ProductCard
                  product={product}
                  onAdd={() => onAddToCart(product)}
                  cartQuantity={cartQuantitiesById[product.id] ?? 0}
                  onIncrease={() => onIncreaseItem(product.id)}
                  onDecrease={() => onDecreaseItem(product.id)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <CarouselButton onClick={scrollPrev} position="left">
        ‹
      </CarouselButton>

      <CarouselButton onClick={scrollNext} position="right">
        ›
      </CarouselButton>

      <CarouselDots
        scrollSnaps={scrollSnaps}
        selectedIndex={selectedIndex}
        onSelect={scrollTo}
      />
    </div>
  );
}
