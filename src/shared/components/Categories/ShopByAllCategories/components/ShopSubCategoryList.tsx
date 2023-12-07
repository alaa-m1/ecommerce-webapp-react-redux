import { Box, Typography } from "@mui/material";
import React, { useRef } from "react";
import { Product } from "types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { ShopCategoryCard } from "shared/components/ShopCategoryCard";

type ShopSubCategoryListProps = {
  subCategories: Array<Product>;
  currentCategoryLabel: string;
};
export const ShopSubCategoryList = ({
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
    <Box className="shop-sub-category-section" sx={{ color: "secondary.dark" }}>
      <Box className="shop-sub-category-section-title">
        <Typography color="primary.light">
          {`${currentCategoryLabel} ${
            subCategories.length > 0 ? `(${subCategories.length})` : ""
          }`}
        </Typography>
      </Box>
      <Box ref={catRef} className="shop-sub-category-section-cards">
        {subCategories.map((item, index) => (
          <ShopCategoryCard key={index} cardInfo={item}></ShopCategoryCard>
        ))}
      </Box>
      <Box
        className="right-button"
        sx={{ "& path": { color: "secondary.main" } }}
      >
        <ArrowForwardIosIcon onClick={() => handleMoveRight()} />
      </Box>
      <Box
        className="left-button"
        sx={{ "& path": { color: "secondary.main" } }}
      >
        <ArrowBackIosNewIcon onClick={() => handleMoveLeft()} />
      </Box>
    </Box>
  );
};
