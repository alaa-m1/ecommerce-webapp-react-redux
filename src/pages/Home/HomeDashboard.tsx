import { Box } from "@mui/material";
import { useMemo } from "react";
import { selectCategoriesMap, selectCategoriesStatus } from "store/categories/categoriesSelector";
import { useAppSelector } from "utils/redux/hooks";
import {LoadingSpinner} from "shared";
import { MainCategoriesList } from "./components";

const HomeDashboard = () => {
  // const  categories  = useAppSelector((state)=>state.categories.categories)
  const  categories  = useAppSelector(selectCategoriesMap)
  const {loading, error}= useAppSelector(selectCategoriesStatus);
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
  return (
    <Box className="mainContainer">
      {loading && <LoadingSpinner/>}
      <MainCategoriesList
        mainCategories={mainCategoriesLabels}
        categories={categories}
      />
    </Box>
  );
};

export default HomeDashboard;
