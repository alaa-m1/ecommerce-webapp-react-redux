import { Box } from "@mui/material";
import MainCategoriesList from "components/MainCategoriesList";
import { useMemo } from "react";
import { categoriesRes } from "shared";

const Home = () => {
  const mainCategories = useMemo(
    () =>
      categoriesRes.reduce<Array<string>>((res, category) => {
        if (!res.includes(category.categoryLabel)) {
          res.push(category.categoryLabel);
        }
        return res;
      }, []),
    []
  );
  return (
    <Box className="mainContainer">
      <MainCategoriesList
        mainCategories={mainCategories}
        categories={categoriesRes}
      />
    </Box>
  );
};

export default Home;
