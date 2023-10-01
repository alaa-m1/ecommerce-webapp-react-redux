import { Box, Grid } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "utils/redux/hooks";
import {
  selectMappedProducts,
  selectProductsStatus,
} from "store/products/productsSelector";
import {
  fetchProductsAsync,
  setProducts,
} from "store/products/productsActions";
import { useDispatch } from "react-redux";
import { FullScreenSpinner } from "shared";
import {
  SearchForProducts,
  ShopByAllCategories,
  ShopByCategory,
  ShopNav,
} from "shared/components";
import { useProducts } from "./hooks";
import _ from "lodash";

const OnlineShopDashboard = () => {
  const [searchParams] = useSearchParams();
  const activeCategoryLabel = searchParams.get("category");
  const searchBy = searchParams.get("search");
  const dispatch = useDispatch();

  /// Using react-query to manage request state with caching (The other good solution to use with Redux is RTK Query)
  const { data, isLoading } = useProducts(100);
  useEffect(() => {
    if (!_.isUndefined(data)) dispatch(setProducts(data));
  }, [data]);

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
      <Grid container sx={{ position: "relative" }}>
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
        {loading && <FullScreenSpinner />}
      </Grid>
    </Box>
  );
};

export default OnlineShopDashboard;
