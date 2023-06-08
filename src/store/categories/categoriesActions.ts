import { createAction } from "utils/redux/reduxUtils";
import { categoriesActionTypes } from "./categoriesActionTypes";
import { CategoriesResponse } from "types";
import { Action, AnyAction, Dispatch } from "redux";
import { categoriesRes } from "shared";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { CategoryState } from "./categoriesReducer";
import { RootState } from "store/store";


const fetchCategoriesStart = () => createAction(categoriesActionTypes.FETCHING_CATEGORIES_START);
const fetchCategoriesFailed = (error: any) => createAction(categoriesActionTypes.FETCHING_CATEGORIES_FAILED, error);
const fetchCategoriesSuccess = (categories: CategoriesResponse) => createAction(categoriesActionTypes.FETCHING_CATEGORIES_SUCCESS, categories);


export const fetchCategoriesAsync = ():ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(fetchCategoriesStart());
        const categories =  categoriesRes; // here we should fetch the categories from the server
        return dispatch(fetchCategoriesSuccess(categories))
        console.log('FETCHING_CATEGORIES_SUCCESS fetchhhh===',categories)

    } catch (error: any) {
        console.log('FETCHING_CATEGORIES_SUCCESS error===',error)
        return dispatch(fetchCategoriesFailed(error))

    }

}