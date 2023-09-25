import { Box } from "@mui/material";
import { memo, useMemo, useState } from "react";
import { Product } from "types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";

type MainCategoryCardProps = {
  subCategories: Array<Product>;
  currentCategoryLabel: string;
};
export const MainCategoryCard = memo(
  ({ subCategories, currentCategoryLabel }: MainCategoryCardProps) => {
    const [imageIndex, setImageIndex] = useState(1);
    const subCatLength = subCategories.length;
    const remoteContent = subCategories[0].imagePath.includes("https");
    const imagePath: string = useMemo(
      () =>
        remoteContent
          ? subCategories[imageIndex - 1].imagePath
          : `${window.location.origin}/images/categories/${currentCategoryLabel}/${imageIndex}.jpeg`,
      [currentCategoryLabel, imageIndex, subCategories]
    );

    return (
      <Box className="main-category-card">
        <Box className="main-category-images">
          <Link to={`shop?category=${currentCategoryLabel}`}>
            <img
              src={imagePath}
              alt={`${currentCategoryLabel}`}
              loading="lazy"
            />
          </Link>
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
        {remoteContent ? (
          <Link to={`online-shop?category=${currentCategoryLabel}`}>
            <Box className="main-category-info">{currentCategoryLabel}</Box>
          </Link>
        ) : (
          <Link to={`shop?category=${currentCategoryLabel}`}>
            <Box className="main-category-info">{currentCategoryLabel}</Box>
          </Link>
        )}
      </Box>
    );
  }
);
