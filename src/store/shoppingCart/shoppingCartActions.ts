import { createAction } from "utils/redux/reduxUtils";
import { shoppingCartActionTypes } from "./shoppingCartActionTypes";
import { CartCategories, CartCategory, Product } from "types";

const addItemToCart = (
    cartItems: Array<CartCategory>,
    itemToAdd: Product
): Array<CartCategory> => {
    const existedCategory = cartItems.find(
        (cartItem) => cartItem.id === itemToAdd.id
    );
    if (existedCategory) {
        return cartItems.map((cartItem) =>
            cartItem.id === itemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    return [...cartItems, { ...itemToAdd, quantity: 1 }];
};
const decreaseItemInCart = (
    cartItems: Array<CartCategory>,
    itemToDecrease: Product
): Array<CartCategory> => {
    const existedCategory = cartItems.find(
        (cartItem) => cartItem.id === itemToDecrease.id
    );
    if (existedCategory && existedCategory?.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== itemToDecrease.id);
    }
    return cartItems.map((cartItem) =>
        cartItem.id === itemToDecrease.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const removeItemFromCart = (
    cartItems: Array<CartCategory>,
    itemIdToRemoveId: number
): Array<CartCategory> =>
    cartItems.filter((cartItem) => cartItem.id !== itemIdToRemoveId);



export const addToCart = (cartItems: CartCategories, item: Product) => {
    const updatedCartItems = addItemToCart(cartItems, item);
    return createAction(shoppingCartActionTypes.SET_CART_ITEMS, updatedCartItems);
};

export const decreaseCartItem = (cartItems: CartCategories, item: Product) => {
    const updatedCartItems = decreaseItemInCart(cartItems, item);
    return createAction(shoppingCartActionTypes.SET_CART_ITEMS, updatedCartItems);
};

export const removeFromCart = (cartItems: CartCategories, item: Product) => {
    const updatedCartItems = removeItemFromCart(cartItems, item.id);
    return createAction(shoppingCartActionTypes.SET_CART_ITEMS, updatedCartItems);
};

export const emptyCart = () => {
    const updatedCartItems: Array<CartCategory> = [];
    return createAction(shoppingCartActionTypes.SET_CART_ITEMS, updatedCartItems);
};

export const setShowCart = (isCartOpen: boolean) => createAction(shoppingCartActionTypes.SET_IS_CART_OPEN, isCartOpen);