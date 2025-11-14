import type { CartItem, Product } from "@/types/cart";

import {
  ProductCatalogEmpty,
  ProductCatalogError,
  ProductCatalogLoading,
} from "@components";

import { ProductShowcase } from "./ProductShowcase";

import { useProducts } from "@hooks";

type ProductCatalogProps = {
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onIncreaseItem: (productId: string) => void;
  onDecreaseItem: (productId: string) => void;
};

export function ProductCatalog({
  cartItems,
  onAddToCart,
  onIncreaseItem,
  onDecreaseItem,
}: ProductCatalogProps) {
  const { products, isProductsLoading, productsError, refetchProducts } =
    useProducts();

  if (isProductsLoading) {
    return <ProductCatalogLoading />;
  }

  if (productsError) {
    return (
      <ProductCatalogError
        message={productsError.message}
        onRetry={refetchProducts}
      />
    );
  }

  if (products.length === 0) {
    return <ProductCatalogEmpty />;
  }

  return (
    <ProductShowcase
      products={products}
      onAddToCart={onAddToCart}
      cartItems={cartItems}
      onIncreaseItem={onIncreaseItem}
      onDecreaseItem={onDecreaseItem}
    />
  );
}
