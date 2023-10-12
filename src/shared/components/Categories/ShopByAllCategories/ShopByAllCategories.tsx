import { Box, Typography } from "@mui/material";
import { Product } from "types";
import { ShopSubCategoryList } from "./components";
import { useTranslation } from "react-i18next";
import { NoItemsFound } from "shared/components/NoItemsFound";

type ShopByAllCategoriesProps = {
  mainCategoriesLabels: Array<string>;
  categories: Array<Product>;
};
export const ShopByAllCategories = ({
  mainCategoriesLabels,
  categories,
}: ShopByAllCategoriesProps) => {
  const { t } = useTranslation();
  return (
    <Box className="shop-category-container" data-testid="ShopByAllCategories-div">
      {mainCategoriesLabels.map((categoryLabel, index) => {
        const categoryDetails = categories.filter(
          (item) => item.categoryLabel === categoryLabel
        );
        return (
          <>
            <ShopSubCategoryList
              key={index}
              currentCategoryLabel={categoryLabel}
              subCategories={categoryDetails}
            ></ShopSubCategoryList>
          </>
        );
      })}
      {categories.length === 0 && (
        <NoItemsFound/>
      )}
    </Box>
  );
};
