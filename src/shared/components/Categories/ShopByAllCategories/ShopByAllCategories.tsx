import { Box } from "@mui/material";
import { Product } from "types";
import { ShopSubCategoryList } from "./components";

type ShopByAllCategoriesProps = {
  mainCategoriesLabels: Array<string>;
  categories: Array<Product>;
};
export const ShopByAllCategories = ({
  mainCategoriesLabels,
  categories,
}: ShopByAllCategoriesProps) => {
  return (
    <Box className="shop-category-container" >
      {mainCategoriesLabels.map((categoryLabel, index) => {
        const categoryDetails = categories.filter(
          (item) => item.categoryLabel === categoryLabel
        );
        return (
          <ShopSubCategoryList
            key={index}
            currentCategoryLabel={categoryLabel}
            subCategories={categoryDetails}
          ></ShopSubCategoryList>
        );
      })}
    </Box>
  );
};
