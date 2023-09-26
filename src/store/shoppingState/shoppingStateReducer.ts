import { shoppingStateActionTypes } from "./shoppingStateActionTypes"

type ShoppingCartState = {
    // activeCart: HTMLDivElement | null;
    activeCartIndex: number;
    activeCartId: number;
}

type ShoppingCartAction = {
    type: any,
    // payload: HTMLDivElement | number
    payload:  number
}
const initailState: ShoppingCartState = {
    // activeCart: null,
    activeCartIndex: 0,
    activeCartId: 0
}
export const shoppingStateReducer = (state = initailState, action: ShoppingCartAction) => {
    const { type, payload } = action;
    switch (type) {
        // case shoppingStateActionTypes.SET_ACTIVE_CART:
        //     return {
        //         ...state,
        //         activeCart: payload as HTMLDivElement
        //     }
        case shoppingStateActionTypes.SET_ACTIVE_CART_INDEX:
            return {
                ...state,
                activeCartIndex: payload as number
            }
        case shoppingStateActionTypes.SET_ACTIVE_CART_ID:
            return {
                ...state,
                activeCartId: payload as number
            }
        default:
            return state
    }
}