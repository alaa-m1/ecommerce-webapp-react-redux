import { Box } from "@mui/material";
import { Products } from "types";
import { MainCategoryCard } from "./components";

type MainCategoriesListProps = {
  mainCategories: Array<string>;
  categories: Products;
};
export const MainCategoriesList = ({
  mainCategories,
  categories,
}: MainCategoriesListProps) => {
  return (
    <Box className="main-category-container" data-testid="Home-div">
      {mainCategories.map((categoryLabel,index) => {
        const categoryDetails = categories.filter(
          (item) => item.categoryLabel === categoryLabel
        );
        return <MainCategoryCard key={index} currentCategoryLabel={categoryLabel} subCategories={categoryDetails}></MainCategoryCard>;
      })}
    </Box>
  );
};
