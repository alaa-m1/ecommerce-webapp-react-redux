import { axiosInstance } from "utils/axiosInstance";

export const getProducts = async (limit: number = 100) => {
  try {
    const response = await axiosInstance.get(`products?_limit=${limit}`);
    return response.data;
  } catch (error: any) {
    throw Error(error.message);
  }
};
