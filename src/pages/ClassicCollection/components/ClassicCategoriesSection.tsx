import React from "react";
import { Grid } from "@mui/material";
import { ShopByAllCategories, ShopByCategory } from "shared";
import { Product } from "types";

export const ClassicCategoriesSection = ({
  activeCategoryLabel,
  activeCategoryItems,
  mainCategoriesLabels,
  SortedCategories,
}: ClassicCategoriesSectionProps) => {
  return (
    <Grid container>
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
            />
          ) : (
            <ShopByAllCategories
              mainCategoriesLabels={mainCategoriesLabels}
              categories={SortedCategories}
            />
          )}
        </Grid>
      </Grid>
  );
};

type ClassicCategoriesSectionProps = {
  activeCategoryLabel: string | null;
  activeCategoryItems: Array<Product>;
  mainCategoriesLabels: Array<string>;
  SortedCategories: Array<Product>;
};
