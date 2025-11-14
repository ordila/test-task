import { useEffect, useState } from "react";

export function useItemsPerView() {
  const getItems = () => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  };

  const [itemsPerView, setItemsPerView] = useState(getItems);

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItems());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return itemsPerView;
}
