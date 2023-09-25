import { createSelector } from 'reselect'
import { RootState } from 'store/store';
import { mapCategory } from 'utils/mappingFunctions/mapCategory';

const selectCategoriesReducer = (state: RootState) => state.categories;
const selectCategoriesResponse = createSelector([selectCategoriesReducer],
    (localProductsReducer) => localProductsReducer.categories)

export const selectMappedCategories = createSelector([selectCategoriesResponse],
    (categoriesRes) => mapCategory(categoriesRes)

)

export const selectCategoriesStatus = createSelector([selectCategoriesReducer],
    (localProductsReducer) => ({loading: localProductsReducer.loading, error: localProductsReducer.error}))