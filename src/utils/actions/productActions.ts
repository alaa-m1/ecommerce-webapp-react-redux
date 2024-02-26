import { ProductsResponse } from "types";
import { externalAPIURL } from "shared";
import { fetchData } from "./fetchData";
// import { axiosInstance } from "utils/axiosInstance";

export const getProducts = async (limit = 100) => {
  return await fetchData<ProductsResponse>(externalAPIURL.GET_PRODUCTS, [
    { key: "limit", value: limit },
  ]);
};

// export const getProducts = async (limit = 100) => {
//   try {
//     const response = await axiosInstance.get(`products?_limit=${limit}`);
//     return response.data;
//   } catch (error: any) {
//     throw Error(error.message);
//   }
// };
