import { useQuery } from "react-query"
import { ProductResponse, Products, ProductsResponse } from "types"
import { getProducts } from "utils/actions/productActions"
import { mapProducts } from "utils/mappingFunctions/mapProducts"
import { queryKeys } from "utils/reactQuery/queryKeys"

export const useProducts=(limit?: number)=>{
    return useQuery<ProductsResponse>(queryKeys.getProducts,()=>getProducts(limit))
}