import { categoriesActionTypes } from "./categoriesActionTypes"
import { CategoriesResponse } from "types";
import { CategoriesAction } from "./categoriesActions";

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
export const categoriesReducer = (state = initailState, action: CategoriesAction) => {
    switch (action.type) {
        case categoriesActionTypes.FETCHING_CATEGORIES_START:
            return {
                ...state,
                loading: true
            }
        case categoriesActionTypes.FETCHING_CATEGORIES_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case categoriesActionTypes.FETCHING_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                loading: false
            }
        default:
            return state;
    }
}