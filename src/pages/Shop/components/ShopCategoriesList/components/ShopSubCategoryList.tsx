import { Box } from "@mui/material";
import { useRef } from "react";
import { Category } from "types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { ShopCategoryCard } from "../../ShopCategoryCard";

type ShopSubCategoryListProps = {
  subCategories: Array<Category>;
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
