import { Box } from "@mui/material";
import MainCategoryCard from "components/MainCategoriesList/components/MainCategoryCard";
import { Categories } from "types";

type MainCategoriesListProps = {
  mainCategories: Array<string>;
  categories: Categories;
};
const MainCategoriesList = ({
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
export default MainCategoriesList;
