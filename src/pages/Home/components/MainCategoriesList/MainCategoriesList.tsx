import { Box } from "@mui/material";
import { Categories } from "types";
import { MainCategoryCard } from "./components";

type MainCategoriesListProps = {
  mainCategories: Array<string>;
  categories: Categories;
};
export const MainCategoriesList = ({
  mainCategories,
  categories,
}: MainCategoriesListProps) => {
  return (
    <Box className="main-category-container">
      {mainCategories.map((categoryLabel,index) => {
        const categoryDetails = categories.filter(
          (item) => item.categoryLabel === categoryLabel
        );
        return <MainCategoryCard key={index} currentCategoryLabel={categoryLabel} subCategories={categoryDetails}></MainCategoryCard>;
      })}
    </Box>
  );
};
