import { Box } from "@mui/material";
import { Category } from "types";
import ShopCategoryList from "./components/ShopCategoryList";

type ShopCategoryProps = {
  targetCategory: Array<Category>;
  categoryLabel: string;
};
const ShopCategory = ({
  targetCategory,
  categoryLabel
}: ShopCategoryProps) => {
  return (
    <Box className="shop-category-container">
      <ShopCategoryList currentCategoryLabel={categoryLabel} subCategories={targetCategory}></ShopCategoryList>;
    </Box>
  );
};
export default ShopCategory;
