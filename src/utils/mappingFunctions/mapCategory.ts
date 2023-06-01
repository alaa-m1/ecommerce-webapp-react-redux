import { Categories, CategoriesResponse } from "types";

export declare type MapResponseFn<TDATA, RDATA = unknown> = (res: RDATA) => TDATA;
export const mapCategory: MapResponseFn<Categories, CategoriesResponse> = (
  res: CategoriesResponse
): Categories => {
  const categories: Categories = res.map((category) => ({
    id: category.id,
    categoryLabel: category.categoryLabel,
    title: category.categoryDetails.title,
    price: category.categoryDetails.price,
    description: category.categoryDetails.description,
    imagePath: category.categoryDetails.imagePath,
  }))
  return categories
};

