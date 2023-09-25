import { Action, ActionWithPayload, createAction } from "utils/redux/reduxUtils";
import { localProductsActionTypes } from "./localProductsActionTypes";
import { CategoriesResponse } from "types";
import { categoriesRes } from "shared";
import { ThunkAction } from "redux-thunk";
import { RootState } from "store/store";

type FetchCategoriesStart = Action<localProductsActionTypes.FETCHING_CATEGORIES_START>
type FetchCategoriesFailed = ActionWithPayload<localProductsActionTypes.FETCHING_CATEGORIES_FAILED, Error>
type FetchCategoriesSuccess = ActionWithPayload<localProductsActionTypes.FETCHING_CATEGORIES_SUCCESS, CategoriesResponse>

export type CategoriesAction = FetchCategoriesStart | FetchCategoriesFailed | FetchCategoriesSuccess;

const fetchCategoriesStart = (): FetchCategoriesStart => createAction(localProductsActionTypes.FETCHING_CATEGORIES_START);
const fetchCategoriesFailed = (error: Error): FetchCategoriesFailed => createAction(localProductsActionTypes.FETCHING_CATEGORIES_FAILED, error);
const fetchCategoriesSuccess = (categories: CategoriesResponse): FetchCategoriesSuccess => createAction(localProductsActionTypes.FETCHING_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesAsync = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        dispatch(fetchCategoriesStart());
        const categories = categoriesRes; // here we should fetch the categories from the server
        return dispatch(fetchCategoriesSuccess(categories))

    } catch (error: any) {
        return dispatch(fetchCategoriesFailed(error))

    }

}