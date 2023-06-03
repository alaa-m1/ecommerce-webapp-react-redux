import {combineReducers} from "redux";
import { userReducer } from "./user/userReducer";
import { categoriesReducer } from "./categories/categoriesReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer
})