import { Alert, Box } from "@mui/material";
import { useEffect, useMemo } from "react";
import { selectMappedCategories } from "store/localProducts/localProductsSelector";
import { useAppSelector } from "utils/redux/hooks";
import { LoadingSpinner } from "shared";
import { MainCategoriesList } from "./components";
import { useProducts } from "pages/ModernCollection/hooks";
import {
  fetchProductsAsync,
  setProducts,
} from "store/products/productsActions";
import { useDispatch } from "react-redux";
import _ from "lodash";
import {
  selectMappedProducts,
  selectProductsStatus,
} from "store/products/productsSelector";
import { useTranslation } from "react-i18next";

const HomeDashboard = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentThemeMode = useAppSelector((state) => state.user.themeMode);
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

  const loading = useMemo(
    () => isLoading || status.loading,
    [isLoading, status.loading]
  );

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
  return (
    <Box className="mainContainer">
      {loading && <LoadingSpinner />}
      <MainCategoriesList
        mainCategories={mainCategoriesLabels}
        categories={allCategories}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
        }}
      >
        <Alert sx={{ mb: 1, width: "60%" }} severity="info" style={{backgroundColor:currentThemeMode==="dark"?"#e65100":"#0288d1"}}>
          {t("home_api_info")}:&nbsp;
          <a href="https://fakestoreapi.com/">fakestoreapi</a>
        </Alert>
        <Alert sx={{ mb: 1, width: "60%" }} severity="info" style={{backgroundColor:currentThemeMode==="dark"?"#e65100":"#0288d1"}}>
          {t("home_translation_info")}
        </Alert>
      </Box>
    </Box>
  );
};

export default HomeDashboard;
