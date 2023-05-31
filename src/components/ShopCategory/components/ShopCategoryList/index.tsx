import { Box, Button } from "@mui/material";
import { useRef, useState } from "react";
import { Category } from "types";
import { Link } from "react-router-dom";
import ShopCategoryCard from "../../../ShopCategoryCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { OverridableComponent } from "@mui/material/OverridableComponent";

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
