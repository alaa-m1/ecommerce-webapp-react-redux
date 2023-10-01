import { Box, Grid } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { selectMappedCategories } from "store/localProducts/localProductsSelector";
import { useAppSelector } from "utils/redux/hooks";
import {
  SearchForProducts,
  ShopByAllCategories,
  ShopByCategory,
  ShopNav,
} from "shared/components";
import _ from "lodash";

const ShopDashboard = () => {
  const categories = useAppSelector(selectMappedCategories);
  const [searchParams] = useSearchParams();
  const activeCategoryLabel = searchParams.get("category");
  const searchBy = searchParams.get("search");
  const filteredCategories = useMemo(
    () =>
      categories.filter((category) =>
        _.isNull(searchBy)
          ? category
          : category.title.toLowerCase().includes(searchBy.toLowerCase())
      ),
    [categories, searchBy]
  );
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
      filteredCategories.filter(
        (cat, index) => cat.categoryLabel === activeCategoryLabel
      ),
    [filteredCategories, activeCategoryLabel]
  );

  return (
    <Box>
      <ShopNav
        mainCategoriesLabels={mainCategoriesLabels}
        activeCategoryLabel={activeCategoryLabel ?? ""}
      />
      <SearchForProducts />
      <Grid container>
        <Grid
          item
          sx={{
            height: "inherit",
            overflow: "auto",
            width: "100%",
            pr: 1,
          }}
        >
          {activeCategoryLabel ? (
            <ShopByCategory
              activeCategoryLabel={activeCategoryLabel}
              activeCategoryItems={activeCategoryItems}
            />
          ) : (
            <ShopByAllCategories
              mainCategoriesLabels={mainCategoriesLabels}
              categories={filteredCategories}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopDashboard;
