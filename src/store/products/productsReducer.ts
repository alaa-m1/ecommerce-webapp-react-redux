import { productsActionTypes } from "./productsActionTypes"
import { ProductsResponse } from "types";
import { ProductsAction } from "./productsActions";

export type productState = {
    products: ProductsResponse;
    loading: boolean;
    error: any;
}


const initailState: productState = {
    products: [],
    loading: false,
    error: null
}
export const productsReducer = (state = initailState, action: ProductsAction) => {
    switch (action.type) {
        case productsActionTypes.FETCHING_PRODUCTS_START:
            return {
                ...state,
                loading: true
            }
        case productsActionTypes.FETCHING_PRODUCTS_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case productsActionTypes.FETCHING_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case productsActionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        default:
            return state;
    }
}