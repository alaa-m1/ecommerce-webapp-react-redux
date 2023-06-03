import { createAction } from "utils/redux/reduxUtils";
import { categoriesActionTypes } from "./categoriesActionTypes";
import { Categories } from "types";

export const setCategories = (categories: Categories) => createAction(categoriesActionTypes.SET_CATEGORIES, categories);