import { Box, Grid } from "@mui/material";
import ShopCategoriesList from "components/ShopCategoriesList";
import ShopCategory from "components/ShopCategory";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { selectCategoriesMap } from "store/categories/categoriesSelector";
import { useAppSelector } from "utils/redux/hooks";
import _ from "lodash";

const Shop = () => {
  const categories = useAppSelector(selectCategoriesMap);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("category");
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

  const targetCategory = useMemo(
    () => categories.filter((cat, index) => cat.categoryLabel === searchQuery),
    [categories, searchQuery]
  );

  return (
    <Box className="mainContainer">
      <Box className="shop-nav">
        {mainCategoriesLabels.map((item) => (
          <Link key={_.uniqueId()} to={`?category=${item}`} style={{ margin: "0px 15px" }}>
            {item}
          </Link>
        ))}
        <Link to={``} style={{ margin: "0px 15px" }}>
          All categories
        </Link>
      </Box>
      <Grid container sx={{ height: "85vh"}}>
        <Grid item sx={{ height: "inherit", overflow: "auto", width:"100%", mt: 1, pr: 1 }}>
          {searchQuery ? (
            <ShopCategory
              categoryLabel={searchQuery}
              targetCategory={targetCategory}
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

export default Shop;
