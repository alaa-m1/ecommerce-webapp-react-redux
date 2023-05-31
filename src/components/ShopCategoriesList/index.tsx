import { Box } from "@mui/material";
import ShopSubCategoryList from "components/ShopCategoriesList/components/ShopSubCategoryList";
import { Category } from "types";

type ShopCategoriesListProps = {
  mainCategories: Array<string>;
  categories: Array<Category>;
};
const ShopCategoriesList = ({
  mainCategories,
  categories,
}: ShopCategoriesListProps) => {
  return (
    <Box className="shop-category-container">
      {mainCategories.map((categoryLabel,index) => {
        const categoryDetails = categories.filter(
          (item) => item.categoryLabel === categoryLabel
        );
        return <ShopSubCategoryList key={index} currentCategoryLabel={categoryLabel} subCategories={categoryDetails}></ShopSubCategoryList>;
      })}
    </Box>
  );
};
export default ShopCategoriesList;
