import { Box } from "@mui/material";
import MainCategoriesList from "components/MainCategoriesList";
import { useMemo } from "react";
import { useAppSelector } from "utils/redux/hooks";

const Home = () => {
  const  categories  = useAppSelector((state)=>state.categories.categories)
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
      <MainCategoriesList
        mainCategories={mainCategoriesLabels}
        categories={categories}
      />
    </Box>
  );
};

export default Home;
