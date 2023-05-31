import { Box, Button } from "@mui/material";
import { useRef, useState } from "react";
import { Category } from "types";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ShopCategoryCard from "components/ShopCategoryCard";

type ShopSubCategoryListProps = {
  subCategories: Array<Category>;
  currentCategoryLabel: string;
};
const ShopSubCategoryList = ({
  subCategories,
  currentCategoryLabel,
}: ShopSubCategoryListProps) => {
  const catRef = useRef<HTMLDivElement | null>(null);
  const handleMoveRight = () => {
    if (catRef.current) {
      catRef.current.scrollBy({
        behavior: "smooth",
        left: +400,
        top: 0,
      });
    }
  };
  const handleMoveLeft = () => {
    if (catRef.current) {
      catRef.current.scrollBy({
        behavior: "smooth",
        left: -400,
        top: 0,
      });
    }
  };
  return (
    <Box className="shop-sub-category-section">
      <Box className="shop-sub-category-section-title">{currentCategoryLabel}</Box>
      <Box ref={catRef} className="shop-sub-category-section-cards">
        {subCategories.map((item, index) => (
          <ShopCategoryCard key={index} catInfo={item}></ShopCategoryCard>
        ))}
      </Box>
      <Box className="right-button">
        <ArrowForwardIosIcon onClick={() => handleMoveRight()} />
      </Box>
      <Box className="left-button">
        <ArrowBackIosNewIcon onClick={() => handleMoveLeft()} />
      </Box>
    </Box>
  );
};
export default ShopSubCategoryList;
