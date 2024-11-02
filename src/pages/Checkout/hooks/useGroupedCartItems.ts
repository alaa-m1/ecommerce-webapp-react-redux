import { useMemo } from "react";
import { CartCategories } from "types";

export const useGroupedCartItems = (
  products: CartCategories
): CartCategories => {
  return useMemo(() => {
    return [...products].sort((a, b) => {
      if (a.categoryLabel < b.categoryLabel) return -1;
      if (a.categoryLabel > b.categoryLabel) return 1;
      return 0;
    });
  }, [products]);
};
