import { Box } from "@mui/material";
import { Category } from "types";
import { ShopCategoryList } from "./components";

type ShopCategoryProps = {
  activeCategoryItems: Array<Category>;
  activeCategoryLabel: string;
};
export const ShopCategory = ({
  activeCategoryItems,
  activeCategoryLabel
}: ShopCategoryProps) => {
  return (
    <Box className="shop-category-container">
      <ShopCategoryList categoryLabel={activeCategoryLabel} subCategories={activeCategoryItems}></ShopCategoryList>;
    </Box>
  );
};
