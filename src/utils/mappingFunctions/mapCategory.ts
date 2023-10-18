import { Products, CategoriesResponse } from "types";
import _ from "lodash";

export declare type MapResponseFn<TDATA, RDATA = unknown> = (res: RDATA) => TDATA;
export const mapCategory: MapResponseFn<Products, CategoriesResponse> = (
  res: CategoriesResponse
): Products => {
  const categories: Products = res.map((category) => ({
    id: category.id,
    categoryLabel: category.categoryLabel,
    title: category.categoryDetails.title,
    price: category.categoryDetails.price,
    description: category.categoryDetails.description,
    imagePath: category.categoryDetails.imagePath,
    uId:_.uniqueId()
  }))
  return categories
};

