import { Box, Typography } from "@mui/material";
import { Product } from "types";
import _ from "lodash";
import { ShopCategoryCard } from "../../../../../shared/components/ShopCategoryCard";
import { useTranslation } from "react-i18next";

type ShopCategoryListProps = {
  subCategories: Array<Product>;
  categoryLabel: string;
};
export const ShopCategoryList = ({
  subCategories,
  categoryLabel,
}: ShopCategoryListProps) => {
  const { t } = useTranslation();
  return (
    <Box className="shop-category-section" sx={{ color: "secondary.dark" }}>
      <Box className="shop-category-section-title">
        <Typography color="primary.light">
          {`${categoryLabel} ${
            subCategories.length > 0 ? `(${subCategories.length})` : ""
          }`}
        </Typography>
      </Box>
      <Box className="shop-category-section-cards">
        {subCategories.map((item) => (
          <ShopCategoryCard
            key={_.uniqueId()}
            catInfo={item}
          ></ShopCategoryCard>
        ))}
      </Box>
      {subCategories.length === 0 && (
        <Box className="no-items-panel">
          <Typography color="primary.light">{t("search.no_items")}</Typography>
        </Box>
      )}
    </Box>
  );
};
