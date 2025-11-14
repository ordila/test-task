import { CartItem, Product } from "@/types/cart";

import { ProductCarousel } from "@containers";

type ProductShowcaseProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
  cartItems: CartItem[];
  onIncreaseItem: (productId: string) => void;
  onDecreaseItem: (productId: string) => void;
};

export function ProductShowcase({
  products,
  onAddToCart,
  cartItems,
  onIncreaseItem,
  onDecreaseItem,
}: ProductShowcaseProps) {
  return (
    <section
      aria-label="Product carousel"
      id="products"
      className="relative left-1/2 w-screen -translate-x-1/2 space-y-6 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto">
        <ProductCarousel
          products={products}
          onAddToCart={onAddToCart}
          cartItems={cartItems}
          onIncreaseItem={onIncreaseItem}
          onDecreaseItem={onDecreaseItem}
        />
      </div>
    </section>
  );
}
