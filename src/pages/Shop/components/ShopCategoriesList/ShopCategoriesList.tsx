import { Box } from "@mui/material";
import { Category } from "types";
import { ShopSubCategoryList } from "./components";

type ShopCategoriesListProps = {
  mainCategoriesLabels: Array<string>;
  categories: Array<Category>;
};
export const ShopCategoriesList = ({
  mainCategoriesLabels,
  categories,
}: ShopCategoriesListProps) => {
  return (
    <Box className="shop-category-container">
      {mainCategoriesLabels.map((categoryLabel,index) => {
        const categoryDetails = categories.filter(
          (item) => item.categoryLabel === categoryLabel
        );
        return <ShopSubCategoryList key={index} currentCategoryLabel={categoryLabel} subCategories={categoryDetails}></ShopSubCategoryList>;
      })}
    </Box>
  );
};
