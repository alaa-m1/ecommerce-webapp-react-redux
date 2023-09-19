import { Box } from "@mui/material";
import { Category } from "types";
import ShopCategoryCard from "../../../ShopCategoryCard";
import _ from "lodash";

type ShopCategoryListProps = {
  subCategories: Array<Category>;
  categoryLabel: string;
};
const ShopCategoryList = ({
  subCategories,
  categoryLabel,
}: ShopCategoryListProps) => {
  return (
    <Box className="shop-category-section">
      <Box className="shop-category-section-title">{categoryLabel}</Box>
      <Box className="shop-category-section-cards">
        {subCategories.map((item) => (
          <ShopCategoryCard key={_.uniqueId()} catInfo={item}></ShopCategoryCard>
        ))}
      </Box>
    </Box>
  );
};
export default ShopCategoryList;
