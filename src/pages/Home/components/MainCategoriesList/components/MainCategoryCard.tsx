import { Box, Typography } from "@mui/material";
import { memo, useMemo, useState } from "react";
import { Product } from "types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";
import withLoadingIndicator from "shared/HOC/withLoadingIndicator";

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
      [currentCategoryLabel, imageIndex, remoteContent, subCategories]
    );

    return (
      <Box className="main-category-card" sx={{ color: "secondary.dark" }}>
        <Box className="main-category-images">
          <Link
            to={
              remoteContent
                ? `modern-collection?category=${currentCategoryLabel}`
                : `classic-collection?category=${currentCategoryLabel}`
            }
          >
            <CardImageWithLoader
              imagePath={imagePath}
              altInfo={currentCategoryLabel}
            />
          </Link>
        </Box>
        <Box
          className="right-button"
          sx={{ "& path": { color: "secondary.main" } }}
        >
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
        <Box
          className="left-button"
          sx={{ "& path": { color: "secondary.main" } }}
        >
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
        <Link
          to={
            remoteContent
              ? `modern-collection?category=${currentCategoryLabel}`
              : `classic-collection?category=${currentCategoryLabel}`
          }
        >
          <Box className="main-category-info">
            <Typography fontSize="18px" color="primary.light">
              {currentCategoryLabel}
            </Typography>
          </Box>
        </Link>
      </Box>
    );
  }
);

const CardImage = ({
  imagePath,
  altInfo,
  onLoadingIsComplete,
}: {
  imagePath: string;
  altInfo: string;
  onLoadingIsComplete?: () => void;
}) => {
  return (
    <img
      src={imagePath}
      alt={altInfo}
      loading="lazy"
      onLoad={() => onLoadingIsComplete?.()}
    />
  );
};
const CardImageWithLoader = withLoadingIndicator(CardImage, "loading");
