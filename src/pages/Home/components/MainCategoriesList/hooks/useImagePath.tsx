import { useMemo } from "react";

export const useImagePath = (
  remoteContent: boolean,
  subCategories: any,
  imageIndex: number,
  previousImgIndex: number,
  currentCategoryLabel: string
) => {
  const imagePath: string = useMemo(
    () =>
      remoteContent
        ? subCategories[imageIndex - 1].imagePath
        : `${window.location.origin}/images/categories/${currentCategoryLabel}/${imageIndex}.jpeg`,
    [currentCategoryLabel, imageIndex, remoteContent, subCategories]
  );
  const sliderImagePath: string = useMemo(
    () =>
      remoteContent
        ? subCategories[previousImgIndex - 1].imagePath
        : `${window.location.origin}/images/categories/${currentCategoryLabel}/${previousImgIndex}.jpeg`,
    [currentCategoryLabel, previousImgIndex, remoteContent, subCategories]
  );
  return { imagePath, sliderImagePath };
};
