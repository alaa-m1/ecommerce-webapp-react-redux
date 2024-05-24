import { Box, Typography } from "@mui/material";
import React, { memo, useEffect, useMemo, useState } from "react";
import { Product } from "types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";
import withLoadingIndicator from "shared/HOC/withLoadingIndicator";
import { useImagePath } from "../hooks";

type MainCategoryCardProps = {
  subCategories: Array<Product>;
  currentCategoryLabel: string;
};
export const MainCategoryCard = memo(
  ({ subCategories, currentCategoryLabel }: MainCategoryCardProps) => {
    const [imageIndex, setImageIndex] = useState(1);

    const [startMoving, setStartMoving] = useState<"left" | "right" | "stop">(
      "stop"
    );

    const [previousImgIndex, setPreviousImgIndex] = useState(imageIndex);

    const subCatLength = subCategories.length;
    const remoteContent = subCategories[0].imagePath.includes("https");

    const showSliderImage = useMemo(
      () => ["left", "right"].includes(startMoving),
      [startMoving]
    );

    useEffect(() => {
      if (["left", "right"].includes(startMoving)) {
        const timer = setTimeout(() => setStartMoving("stop"), 1000);
        return () => clearTimeout(timer);
      }
    }, [startMoving]);
    const { imagePath, sliderImagePath } = useImagePath(
      remoteContent,
      subCategories,
      imageIndex,
      previousImgIndex,
      currentCategoryLabel
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
              key={imagePath}
              imagePath={imagePath}
              altInfo={currentCategoryLabel}
            />
          </Link>
        </Box>
        <Box className={`slider-image ${startMoving}-slider-image`}>
          <Link
            to={
              remoteContent
                ? `modern-collection?category=${currentCategoryLabel}`
                : `classic-collection?category=${currentCategoryLabel}`
            }
          >
            <CardImage
              imagePath={sliderImagePath}
              altInfo={currentCategoryLabel}
            />
          </Link>
        </Box>
        <Box
          className="right-button"
          sx={{ "& path": { color: "secondary.main" } }}
        >
          <ArrowForwardIosIcon
            onClick={() => {
              setStartMoving(showSliderImage ? "stop" : "right");
              setPreviousImgIndex(imageIndex);
              setImageIndex((p) => {
                if (p < subCatLength) {
                  return p + 1;
                } else {
                  return 1;
                }
              });
            }}
          />
        </Box>
        <Box
          className="left-button"
          sx={{ "& path": { color: "secondary.main" } }}
        >
          <ArrowBackIosNewIcon
            onClick={() => {
              setStartMoving(showSliderImage ? "stop" : "left");
              setPreviousImgIndex(imageIndex);
              setImageIndex((p) => {
                if (p > 1) {
                  return p - 1;
                } else {
                  return subCatLength;
                }
              });
            }}
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

MainCategoryCard.displayName = "MainCategoryCard";

export const CardImage = ({
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
