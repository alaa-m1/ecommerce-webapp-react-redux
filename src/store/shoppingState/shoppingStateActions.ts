import { createAction } from "utils/redux/reduxUtils";
import { shoppingStateActionTypes } from "./shoppingStateActionTypes";

// export const setActiveCartElement = (cartElement: HTMLDivElement) => createAction(shoppingStateActionTypes.SET_ACTIVE_CART, cartElement)
export const setActiveCartIndex = (cartIndex: number) => createAction(shoppingStateActionTypes.SET_ACTIVE_CART_INDEX, cartIndex)
export const setActiveCartId = (cartId: number) => createAction(shoppingStateActionTypes.SET_ACTIVE_CART_ID, cartId)