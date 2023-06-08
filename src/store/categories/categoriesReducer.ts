import { categoriesActionTypes } from "./categoriesActionTypes"
import { CategoriesResponse } from "types";

export type CategoryState = {
    categories: CategoriesResponse;
    loading: boolean;
    error: any;
}

interface CategoriesAction {
    type: any,
    payload: CategoriesResponse,
}

const initailState: CategoryState = {
    categories: [],
    loading: false,
    error: null
}
export const categoriesReducer = (state = initailState, action: CategoriesAction) => {
    const { type, payload } = action;
    switch (type) {
        case categoriesActionTypes.FETCHING_CATEGORIES_START:
            return {
                ...state,
                loading: true
            }
        case categoriesActionTypes.FETCHING_CATEGORIES_FAILED:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case categoriesActionTypes.FETCHING_CATEGORIES_SUCCESS:
            console.log('FETCHING_CATEGORIES_SUCCESS===',payload)
            return {
                ...state,
                categories: payload,
                loading: false
            }
        default:
            return state
    }
}