import { createSelector } from 'reselect'
import { RootState } from 'store/store';
import { mapProducts } from 'utils/mappingFunctions/mapProducts';

const selectProductsReducer = (state: RootState) => state.products;
const selectProductsResponse = createSelector([selectProductsReducer],
    (productsReducer) => productsReducer.products)

export const selectMappedProducts = createSelector([selectProductsResponse],
    (productsRes) => mapProducts(productsRes)

)

export const selectProductsStatus = createSelector([selectProductsReducer],
    (productsReducer) => ({loading: productsReducer.loading, error: productsReducer.error}))