import _ from "lodash";
import { useProducts } from "pages/ModernCollection/hooks";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { selectMappedCategories } from "store/localProducts/localProductsSelector";
import { setProducts } from "store/products/productsActions";
import { selectMappedProducts, selectProductsStatus } from "store/products/productsSelector";
import { useAppSelector } from "utils/redux/hooks";

export const useCategoriesLables=()=>{

  const dispatch = useDispatch();
  /// Using react-query to manage request state with caching (The other good solution to use with Redux is RTK Query)
  const { data, isLoading } = useProducts(100);
  useEffect(() => {
    if (!_.isUndefined(data)) dispatch(setProducts(data));
  }, [data, dispatch]);

  /// Using Redux to manage request status (Comment the last two commands and then uncomment the next two commands)
  // useEffect(() => {
  //   dispatch(fetchProductsAsync() as any);
  // }, [dispatch]);
  // const isLoading=false;

  const status = useAppSelector(selectProductsStatus);

  const loading = useMemo(
    () => isLoading || status.loading,
    [isLoading, status.loading]
  );


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

    return {allCategories, mainCategoriesLabels, loading}
}