import useSWR from "swr";

import type { Product } from "@/types/cart";

import { fetchProducts } from "@api";
import { API_ENDPOINTS } from "@constants";

export function useProducts() {
  const { data, error, isLoading, mutate } = useSWR<Product[], Error>(
    API_ENDPOINTS.PRODUCTS,
    fetchProducts,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30_000,
    }
  );

  const products = data ?? [];

  const refetchProducts = () => {
    mutate();
  };

  return {
    products,
    isProductsLoading: isLoading,
    productsError: error,
    refetchProducts,
  };
}
