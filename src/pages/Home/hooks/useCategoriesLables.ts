import { useMemo } from "react";
import { selectMappedCategories } from "store/localProducts/localProductsSelector";
import { selectMappedProducts } from "store/products/productsSelector";
import { useAppSelector } from "utils/redux/hooks";

export const useCategoriesLables=()=>{
    const onlineCategories = useAppSelector(selectMappedProducts);
    const categories1 = useAppSelector(selectMappedCategories);
    const allCategories = useMemo(
      () => [...onlineCategories, ...categories1],
      [categories1, onlineCategories]
    );
    const mainCategoriesLabels = useMemo(
      () =>
        allCategories.reduce<Array<string>>((res, category) => {
          if (!res.includes(category.categoryLabel)) {
            res.push(category.categoryLabel);
          }
          return res;
        }, []),
      [allCategories]
    );

    return {allCategories, mainCategoriesLabels}
}