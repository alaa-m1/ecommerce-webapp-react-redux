import { Box } from "@mui/material";
import MainCategoriesList from "components/MainCategoriesList";
import { useContext, useMemo } from "react";
import { CategoryContext } from "utils/context/categoryContext";

const Home = () => {
  const { categories } = useContext(CategoryContext);
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
