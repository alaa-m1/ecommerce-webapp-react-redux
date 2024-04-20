import React, { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "utils/redux/hooks";
import {
  selectMappedProducts,
  selectProductsStatus,
} from "store/products/productsSelector";
import {
  setProducts,
} from "store/products/productsActions";
import { useDispatch } from "react-redux";
import { useSortOptions } from "shared";
import {
  FilterPanel,
  ScrollToTop,
  ShopNav,
} from "shared/components";
import { useProducts } from "./hooks";
import _ from "lodash";
import { Product } from "types";
import { CategoriesSection } from "./components";
import { Box } from "@mui/material";

const ModernCollectionPage = () => {
  const [searchParams] = useSearchParams();
  const activeCategoryLabel = searchParams.get("category");
  const searchBy = searchParams.get("search");
  const sortBy = searchParams.get("sort") ?? "default";
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

  const onlineCategories = useAppSelector(selectMappedProducts);
  const status = useAppSelector(selectProductsStatus);

  const filteredCategories = useMemo(
    () =>
      onlineCategories.filter((category) =>
        _.isNull(searchBy)
          ? category
          : category.title.toLowerCase().includes(searchBy.toLowerCase())
      ),
    [onlineCategories, searchBy]
  );

  const comparisonFn = useCallback(
    (a: Product, b: Product) => {
      if (sortBy === "asc") return a.price - b.price;
      return b.price - a.price;
    },
    [sortBy]
  );

  const SortedCategories =
    sortBy === "default"
      ? filteredCategories
      : _.cloneDeep(filteredCategories).sort(comparisonFn);

  const loading = useMemo(
    () => isLoading || status.loading,
    [isLoading, status.loading]
  );

  const mainCategoriesLabels = useMemo(
    () =>
      filteredCategories.reduce<Array<string>>((res, product) => {
        if (!res.includes(product.categoryLabel)) {
          res.push(product.categoryLabel);
        }
        return res;
      }, []),
    [filteredCategories]
  );

  const activeCategoryItems = useMemo(
    () =>
      SortedCategories.filter(
        (cat) => cat.categoryLabel === activeCategoryLabel
      ),
    [SortedCategories, activeCategoryLabel]
  );
  const sortOptions = useSortOptions();
  return (
    <>
    <Box id="top-div-anchor"/>
      <ShopNav
      
        mainCategoriesLabels={mainCategoriesLabels}
        activeCategoryLabel={activeCategoryLabel ?? ""}
      />

      <FilterPanel sortOptions={sortOptions} />

      <CategoriesSection
        activeCategoryLabel={activeCategoryLabel}
        activeCategoryItems={activeCategoryItems}
        loading={loading}
        mainCategoriesLabels={mainCategoriesLabels}
        SortedCategories={SortedCategories}
      />
      <ScrollToTop targetId="top-div-anchor"/>
    </>
  );
};

export default ModernCollectionPage;
