import type { Product } from "@/types/cart";

import { API_ENDPOINTS } from "@constants";
import { httpClient } from "@api";

export function fetchProducts() {
  return httpClient
    .get<Product[]>(API_ENDPOINTS.PRODUCTS)
    .then((response) => response.data);
}
