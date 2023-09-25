import { createSelector } from 'reselect'
import { RootState } from 'store/store';

const shoppingCartReducer = (state: RootState) => state.shoppingCart;
const shoppingCartItems = createSelector([shoppingCartReducer],
    (shoppingCarReducer) => shoppingCarReducer.cartItems)

export const selectShoopingCartItemsDetails = createSelector([shoppingCartItems],
    (cartItems) => {
        const cartItemsTotal = cartItems.reduce(
            (total, item) => Math.round((total + item.quantity * item.price)*100)/100,
            0
        );
        const cartItemsCount = cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );
        return {
            cartItems: cartItems,
            cartCounter: cartItemsCount,
            cartTotal: cartItemsTotal,
        }
    }
)

export const selectShoopingCartStatus = createSelector([shoppingCartReducer],
    (shoppingCarReducer) => shoppingCarReducer.isCartOpen)
