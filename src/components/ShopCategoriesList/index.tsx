import { Box } from "@mui/material";
import ShopSubCategoryList from "components/ShopCategoriesList/components/ShopSubCategoryList";
import { Category } from "types";

type ShopCategoriesListProps = {
  mainCategoriesLabels: Array<string>;
  categories: Array<Category>;
};
const ShopCategoriesList = ({
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
export default ShopCategoriesList;
