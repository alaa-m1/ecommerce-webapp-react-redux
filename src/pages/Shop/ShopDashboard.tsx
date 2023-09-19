import { Box, Grid } from "@mui/material";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { selectCategoriesMap } from "store/categories/categoriesSelector";
import { useAppSelector } from "utils/redux/hooks";
import {ShopCategoriesList, ShopCategory, ShopNav} from "./components";

const ShopDashboard = () => {
  const categories = useAppSelector(selectCategoriesMap);
  const [searchParams] = useSearchParams();
  const activeCategoryLabel = searchParams.get("category");
  const mainCategoriesLabels = useMemo(
    () =>
      categories.reduce<Array<string>>((res, category) => {
        if (!res.includes(category.categoryLabel)) {
          res.push(category.categoryLabel);
        }
        return res;
      }, []),
    [categories]
  );

  const activeCategoryItems = useMemo(
    () => categories.filter((cat, index) => cat.categoryLabel === activeCategoryLabel),
    [categories, activeCategoryLabel]
  );

  return (
    <Box>
      <ShopNav mainCategoriesLabels={mainCategoriesLabels} activeCategoryLabel={activeCategoryLabel ?? ''}/>
      <Grid container sx={{ height: "85vh" }}>
        <Grid
          item
          sx={{
            height: "inherit",
            overflow: "auto",
            width: "100%",
            mt: 1,
            pr: 1,
          }}
        >
          {activeCategoryLabel ? (
            <ShopCategory
              activeCategoryLabel={activeCategoryLabel}
              activeCategoryItems={activeCategoryItems}
            />
          ) : (
            <ShopCategoriesList
              mainCategoriesLabels={mainCategoriesLabels}
              categories={categories}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopDashboard;
