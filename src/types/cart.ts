export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  badge: string;
  tags: string[];
  accent: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  total: number;
}
