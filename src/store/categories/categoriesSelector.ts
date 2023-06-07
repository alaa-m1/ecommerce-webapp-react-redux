import { createSelector } from 'reselect'
import { RootState } from 'store/store';
import { mapCategory } from 'utils/mappingFunctions/mapCategory';

const selectCategoriesReducer = (state: RootState) => state.categories;
const selectCategoriesResponse = createSelector([selectCategoriesReducer],
    (categoriesReducer) => categoriesReducer.categories)

export const selectCategoriesMap = createSelector([selectCategoriesResponse],
    (categoriesRes) => mapCategory(categoriesRes)

)

export const selectCategoriesStatus = createSelector([selectCategoriesReducer],
    (categoriesReducer) => ({loading: categoriesReducer.loading, error: categoriesReducer.error}))