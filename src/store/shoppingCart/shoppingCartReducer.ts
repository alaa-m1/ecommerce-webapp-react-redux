import { shoppingCartActionTypes } from "./shoppingCartActionTypes"
import { CartCategories } from "types";

type ShoppingCartState = {
    cartItems: CartCategories;
    isCartOpen: boolean;
    cartCounter: number;
    cartTotal: number;
    activeCart: HTMLDivElement | null;
}

type ShoppingCartAction = {
    type: any,
    payload: CartCategories | boolean | HTMLDivElement
}
const initailState: ShoppingCartState = {
    isCartOpen: false,
    cartItems: [],
    cartCounter: 0,
    cartTotal: 0,
    activeCart: null
}
export const shoppingCartReducer = (state = initailState, action: ShoppingCartAction) => {
    const { type, payload } = action;
    switch (type) {
        case shoppingCartActionTypes.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload as CartCategories
            }
        case shoppingCartActionTypes.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload as boolean
            }
        default:
            return state
    }
}