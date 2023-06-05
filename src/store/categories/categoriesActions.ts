import { createAction } from "utils/redux/reduxUtils";
import { categoriesActionTypes } from "./categoriesActionTypes";
import { CategoriesResponse } from "types";

export const setCategories = (categories: CategoriesResponse) => createAction(categoriesActionTypes.SET_CATEGORIES, categories);