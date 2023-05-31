import { Box, Button } from "@mui/material";
import { useState } from "react";
import { Category } from "types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";

type MainCategoryCardProps = {
  subCategories: Array<Category>;
  currentCategoryLabel: string;
};
const MainCategoryCard = ({
  subCategories,
  currentCategoryLabel,
}: MainCategoryCardProps) => {
  const [imageIndex, setImageIndex] = useState(1);
  const subCatLength = subCategories.length;
  return (
    <Box className="main-category-card">
      <Box className="main-category-images">
        <img
          src={`${window.location.origin}/images/categories/${currentCategoryLabel}/${imageIndex}.jpeg`}
          alt={`${currentCategoryLabel}`}
          loading="lazy"
        />
      </Box>
      <Box className="right-button">
        <ArrowForwardIosIcon
          onClick={() =>
            setImageIndex((p) => {
              if (p < subCatLength) {
                return p + 1;
              } else {
                return 1;
              }
            })
          }
        />
      </Box>
      <Box className="left-button">
        <ArrowBackIosNewIcon
          onClick={() =>
            setImageIndex((p) => {
              if (p > 1) {
                return p - 1;
              } else {
                return subCatLength;
              }
            })
          }
        />
      </Box>
      <Link to={`shop?category=${currentCategoryLabel}`}>
        <Box className="main-category-info">{currentCategoryLabel}</Box>
      </Link>
    </Box>
  );
};
export default MainCategoryCard;
