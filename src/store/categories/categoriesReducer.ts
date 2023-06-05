import { categoriesActionTypes } from "./categoriesActionTypes"
import { CategoriesResponse } from "types";

type CategoryState={
    categories: CategoriesResponse;
}

interface CategoriesAction {
    type: any,
    payload: CategoriesResponse
}

const initailState: CategoryState = {
    categories: []
}
export const categoriesReducer = (state = initailState, action: CategoriesAction) => {
    const { type, payload } = action;
    switch (type) {
        case categoriesActionTypes.SET_CATEGORIES:
            console.log('SET_CATEGORIES')
            return {
                ...state,
                categories: payload
            }
        default:
            return state
    }
}