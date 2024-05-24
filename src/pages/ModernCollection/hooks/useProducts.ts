import { useQuery } from "react-query"
import { ProductsResponse } from "types"
import { getProducts } from "utils/actions/productActions"
import { queryKeys } from "utils/reactQuery/queryKeys"

export const useProducts=(limit?: number)=>{
    return useQuery<ProductsResponse>(queryKeys.getProducts,()=>getProducts(limit),{suspense:true})
}