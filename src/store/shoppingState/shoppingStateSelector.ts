import { createSelector } from 'reselect'
import { RootState } from 'store/store';

const shoppingStateReducer = (state: RootState) => state.shoppingState;

// export const selectShoopingActiveCart = createSelector([shoppingStateReducer],
//     (shoppingCarReducer) => shoppingCarReducer.activeCart)

export const selectShoopingActiveCartIndex = createSelector([shoppingStateReducer],
    (shoppingCarReducer) => shoppingCarReducer.activeCartIndex)

export const selectShoopingActiveCartId = createSelector([shoppingStateReducer],
    (shoppingCarReducer) => shoppingCarReducer.activeCartId)
