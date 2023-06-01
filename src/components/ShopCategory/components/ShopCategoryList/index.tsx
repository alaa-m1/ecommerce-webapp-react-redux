import { Box } from "@mui/material";
import { Category } from "types";
import ShopCategoryCard from "../../../ShopCategoryCard";

type ShopCategoryListProps = {
  subCategories: Array<Category>;
  currentCategoryLabel: string;
};
const ShopCategoryList = ({
  subCategories,
  currentCategoryLabel,
}: ShopCategoryListProps) => {
  return (
    <Box className="shop-category-section">
      <Box className="shop-category-section-title">{currentCategoryLabel}</Box>
      <Box className="shop-category-section-cards">
        {subCategories.map((item, index) => (
          <ShopCategoryCard key={index} catInfo={item}></ShopCategoryCard>
        ))}
      </Box>
    </Box>
  );
};
export default ShopCategoryList;
