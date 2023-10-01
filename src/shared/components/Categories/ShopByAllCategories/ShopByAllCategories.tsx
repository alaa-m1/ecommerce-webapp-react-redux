import { Box, Typography } from "@mui/material";
import { Product } from "types";
import { ShopSubCategoryList } from "./components";
import { useTranslation } from "react-i18next";

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
    <Box className="shop-category-container">
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
        <Box className="no-items-panel">
          <Typography color="primary.light">{t("search.no_items")}</Typography>
        </Box>
      )}
    </Box>
  );
};
