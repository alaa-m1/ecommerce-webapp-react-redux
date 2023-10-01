import { Box } from "@mui/material";
import { Product } from "types";
import { ShopCategoryList } from "./components";

type ShopByCategoryProps = {
  activeCategoryItems: Array<Product>;
  activeCategoryLabel: string;
};
export const ShopByCategory = ({
  activeCategoryItems,
  activeCategoryLabel,
}: ShopByCategoryProps) => {
  return (
    <Box className="shop-category-container">
      <ShopCategoryList
        categoryLabel={activeCategoryLabel}
        subCategories={activeCategoryItems}
      ></ShopCategoryList>
    </Box>
  );
};
