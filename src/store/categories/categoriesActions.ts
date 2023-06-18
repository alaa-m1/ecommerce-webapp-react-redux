import { Action, ActionWithPayload, createAction } from "utils/redux/reduxUtils";
import { categoriesActionTypes } from "./categoriesActionTypes";
import { CategoriesResponse } from "types";
import { categoriesRes } from "shared";
import { ThunkAction } from "redux-thunk";
import { RootState } from "store/store";

type FetchCategoriesStart = Action<categoriesActionTypes.FETCHING_CATEGORIES_START>
type FetchCategoriesFailed = ActionWithPayload<categoriesActionTypes.FETCHING_CATEGORIES_FAILED, Error>
type FetchCategoriesSuccess = ActionWithPayload<categoriesActionTypes.FETCHING_CATEGORIES_SUCCESS, CategoriesResponse>

export type CategoriesAction = FetchCategoriesStart | FetchCategoriesFailed | FetchCategoriesSuccess;

const fetchCategoriesStart = (): FetchCategoriesStart => createAction(categoriesActionTypes.FETCHING_CATEGORIES_START);
const fetchCategoriesFailed = (error: Error): FetchCategoriesFailed => createAction(categoriesActionTypes.FETCHING_CATEGORIES_FAILED, error);
const fetchCategoriesSuccess = (categories: CategoriesResponse): FetchCategoriesSuccess => createAction(categoriesActionTypes.FETCHING_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesAsync = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(fetchCategoriesStart());
        const categories = categoriesRes; // here we should fetch the categories from the server
        return dispatch(fetchCategoriesSuccess(categories))

    } catch (error: any) {
        return dispatch(fetchCategoriesFailed(error))

    }

}