import { localProductsActionTypes } from "./localProductsActionTypes"
import { CategoriesResponse } from "types";
import { CategoriesAction } from "./localProductsActions";

export type CategoryState = {
    categories: CategoriesResponse;
    loading: boolean;
    error: any;
}


const initailState: CategoryState = {
    categories: [],
    loading: false,
    error: null
}
export const localProductsReducer = (state = initailState, action: CategoriesAction) => {
    switch (action.type) {
        case localProductsActionTypes.FETCHING_CATEGORIES_START:
            return {
                ...state,
                loading: true
            }
        case localProductsActionTypes.FETCHING_CATEGORIES_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case localProductsActionTypes.FETCHING_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                loading: false
            }
        default:
            return state;
    }
}