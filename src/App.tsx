import { useState } from "react";

import { CartModal, Header, ProductCatalog } from "@containers";
import { useCart } from "@hooks";

function App() {
  const {
    items: cartItems,
    totals,
    itemCount: cartItemsCount,
    addItem,
    increaseItem,
    decreaseItem,
    removeItem,
  } = useCart();

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  return (
    <div className="text-slate-100 px-4 py-2 sm:px-6 lg:px-8">
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="mt-6 space-y-12">
        <ProductCatalog
          cartItems={cartItems}
          onAddToCart={addItem}
          onIncreaseItem={increaseItem}
          onDecreaseItem={decreaseItem}
        />
      </main>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        totals={totals}
        onRemoveItem={removeItem}
        onDecreaseItem={decreaseItem}
        onIncreaseItem={increaseItem}
      />
    </div>
  );
}
export default App;
