import React, { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { selectMappedCategories } from "store/localProducts/localProductsSelector";
import { useAppSelector } from "utils/redux/hooks";
import { FilterPanel, ScrollToTop, ShopNav } from "shared/components";
import _ from "lodash";
import { useSortOptions } from "shared";
import { Product } from "types";
import { ClassicCategoriesSection } from "./components";
import { Box } from "@mui/material";

const ClassicCollectionPage = () => {
  const categories = useAppSelector(selectMappedCategories);
  const [searchParams] = useSearchParams();
  const activeCategoryLabel = searchParams.get("category");
  const searchBy = searchParams.get("search");
  const sortBy = searchParams.get("sort") ?? "default";

  const filteredCategories = useMemo(
    () =>
      categories.filter((category) =>
        _.isNull(searchBy)
          ? category
          : category.title.toLowerCase().includes(searchBy.toLowerCase())
      ),
    [categories, searchBy]
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

  const mainCategoriesLabels = useMemo(
    () =>
      filteredCategories.reduce<Array<string>>((res, category) => {
        if (!res.includes(category.categoryLabel)) {
          res.push(category.categoryLabel);
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
      <Box id="top-div-anchor" />
      <ShopNav
        mainCategoriesLabels={mainCategoriesLabels}
        activeCategoryLabel={activeCategoryLabel ?? ""}
      />
      <FilterPanel sortOptions={sortOptions} />
      <ClassicCategoriesSection
        activeCategoryLabel={activeCategoryLabel}
        activeCategoryItems={activeCategoryItems}
        mainCategoriesLabels={mainCategoriesLabels}
        SortedCategories={SortedCategories}
      />
      <ScrollToTop targetId="top-div-anchor" />
    </>
  );
};

export default ClassicCollectionPage;
