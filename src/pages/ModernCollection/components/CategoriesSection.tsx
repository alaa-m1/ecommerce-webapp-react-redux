import React from "react";
import { Grid } from "@mui/material";
import { FullScreenSpinner, ShopByAllCategories, ShopByCategory } from "shared";
import { Product } from "types";

export const CategoriesSection = ({
  activeCategoryLabel,
  activeCategoryItems,
  loading,
  mainCategoriesLabels,
  SortedCategories,
}: CategoriesSectionProps) => {
  return (
    <Grid container sx={{ position: "relative" }}>
      <Grid
        item
        sx={{
          height: "inherit",
          overflow: "auto",
          width: "100%",
          pr: 1,
        }}
      >
        {activeCategoryLabel ? (
          <ShopByCategory
            activeCategoryLabel={activeCategoryLabel}
            activeCategoryItems={activeCategoryItems}
            isLoading={loading}
          />
        ) : (
          <ShopByAllCategories
            mainCategoriesLabels={mainCategoriesLabels}
            categories={SortedCategories}
            isLoading={loading}
          />
        )}
      </Grid>
      {loading && <FullScreenSpinner />}
    </Grid>
  );
};

type CategoriesSectionProps = {
  activeCategoryLabel: string | null;
  activeCategoryItems: Array<Product>;
  loading: boolean;
  mainCategoriesLabels: Array<string>;
  SortedCategories: Array<Product>;
};
