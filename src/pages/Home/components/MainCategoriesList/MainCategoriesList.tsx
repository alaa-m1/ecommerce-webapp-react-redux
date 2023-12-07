import React from "react";
import { Box } from "@mui/material";
import { Products } from "types";
import { MainCategoryCard } from "./components";
import _ from "lodash";

type MainCategoriesListProps = {
  mainCategoriesLabels: Array<string>;
  categories: Products;
};
export const MainCategoriesList = ({
  mainCategoriesLabels,
  categories,
}: MainCategoriesListProps) => {
  return (
    <Box className="main-category-container" data-testid="Home-div">
      {mainCategoriesLabels.map((categoryLabel) => {
        const categoryDetails = categories.filter(
          (item) => item.categoryLabel === categoryLabel
        );
        return (
          <MainCategoryCard
            key={_.uniqueId()}
            currentCategoryLabel={categoryLabel}
            subCategories={categoryDetails}
          ></MainCategoryCard>
        );
      })}
    </Box>
  );
};
