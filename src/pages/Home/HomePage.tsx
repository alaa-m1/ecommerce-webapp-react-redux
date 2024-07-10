import React, { useEffect, useMemo } from "react";
import { useAppSelector } from "utils/redux/hooks";
import { LoadingSpinner } from "shared";
import { InfoSection, MainCategoriesList } from "./components";
import { useProducts } from "pages/ModernCollection/hooks";
import { setProducts } from "store/products/productsActions";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { selectProductsStatus } from "store/products/productsSelector";
import { useCategoriesLables } from "./hooks";

const HomePage = () => {
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

  const { allCategories, mainCategoriesLabels } = useCategoriesLables();

  return (
    <>
      {loading && <LoadingSpinner />}
      <MainCategoriesList
        mainCategoriesLabels={mainCategoriesLabels}
        categories={allCategories}
      />
      <InfoSection />
    </>
  );
};

export default HomePage;
