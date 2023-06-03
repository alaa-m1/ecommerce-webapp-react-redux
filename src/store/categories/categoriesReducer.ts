import { categoriesActionTypes } from "./categoriesActionTypes"
import { Categories } from "types";

type CategoryState={
    categories: Categories;
}

interface CategoriesAction {
    type: any,
    payload: Categories
}

const initailState: CategoryState = {
    categories: []
}
export const categoriesReducer = (state = initailState, action: CategoriesAction) => {
    const { type, payload } = action;
    switch (type) {
        case categoriesActionTypes.SET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }
        default:
            return state
    }
}