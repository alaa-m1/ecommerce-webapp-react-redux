import { Products, ProductsResponse } from "types";
import _ from "lodash";
 
export declare type MapResponseFn<TDATA, RDATA = unknown> = (res: RDATA) => TDATA;

const EXCLUDED_CATEGORIES = ['groceries'];

export const mapProducts: MapResponseFn<Products, ProductsResponse> = (
  res: ProductsResponse
): Products => {
  const products: Products = res.products
    .filter((product) => !EXCLUDED_CATEGORIES.includes(product.category.toLowerCase()))
    .map((product) => ({
      id: product.id,
      title: product.title,
      price :product.price,
      description: product.description,
      categoryLabel: product.category,
      imagePath: product.thumbnail,
      rating: { rate: product.rating, count: product.stock },
      uId:_.uniqueId()
    }))
  return products
};

