import { Box, Grid } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "utils/redux/hooks";
import { selectMappedProducts, selectProductsStatus } from "store/products/productsSelector";
import { fetchProductsAsync } from "store/products/productsActions";
import { useDispatch } from "react-redux";
import { FullScreenSpinner } from "shared";
import { ShopByAllCategories, ShopByCategory, ShopNav } from "shared/components";

const OnlineShopDashboard = () => {
  const products = useAppSelector(selectMappedProducts);
  const status = useAppSelector(selectProductsStatus);
  const [searchParams] = useSearchParams();
  const activeCategoryLabel = searchParams.get("category");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAsync() as any);
  }, [dispatch]);



  const mainCategoriesLabels = useMemo(
    () =>
      products.reduce<Array<string>>((res, product) => {
        if (!res.includes(product.categoryLabel)) {
          res.push(product.categoryLabel);
        }
        return res;
      }, []),
    [products]
  );

  const activeCategoryItems = useMemo(
    () => products.filter((cat, index) => cat.categoryLabel === activeCategoryLabel),
    [products, activeCategoryLabel]
  );

  return (
    <Box>
      {status.loading ? <FullScreenSpinner /> : <>
        <ShopNav mainCategoriesLabels={mainCategoriesLabels} activeCategoryLabel={activeCategoryLabel ?? ''} />
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
              <ShopByCategory
                activeCategoryLabel={activeCategoryLabel}
                activeCategoryItems={activeCategoryItems}
              />
            ) : (
              <ShopByAllCategories
                mainCategoriesLabels={mainCategoriesLabels}
                categories={products}
              />
            )}
          </Grid>
        </Grid>
      </>}
    </Box>
  );
};

export default OnlineShopDashboard;
