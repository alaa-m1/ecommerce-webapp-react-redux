import { createContext, useReducer } from "react";
import { CartCategory, Category } from "types";

type CartProviderProps = {
  children: React.ReactNode;
};

type ShoppingCartContextType = {
  showCart: boolean;
  setShowCart: (show: boolean) => null;
  cartItems: Array<CartCategory>;
  addToCart: (item: Category) => null;
  decreaseCartItem: (item: Category) => null;
  removeFromCart: (item: Category) => null;
  cartCounter: number;
  cartTotal: number;
};
export const ShoppingCartContext = createContext<ShoppingCartContextType>({
  showCart: false,
  setShowCart: (show: boolean) => null,
  cartItems: [],
  addToCart: (item: Category) => null,
  decreaseCartItem: (item: Category) => null,
  removeFromCart: (item: Category) => null,
  cartCounter: 0,
  cartTotal: 0,
});

const addItemToCart = (
  cartItems: Array<CartCategory>,
  itemToAdd: Category
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
  itemToDecrease: Category
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

type StateType = {
  showCart: boolean;
  cartItems: Array<CartCategory>;
  cartCounter: number;
  cartTotal: number;
};
type ActionType =
  | {
      type: "SET_SHOW_CART";
      payload: boolean;
    }
  | {
      type: "SET_CART";
      payload: {
        cartItems: Array<CartCategory>;
        cartCounter: number;
        cartTotal: number;
      };
    };

const INITIAL_STATE = {
  showCart: false,
  cartItems: [],
  cartCounter: 0,
  cartTotal: 0,
};

const shoppingCartReducer = (state: StateType, action: ActionType) => {
  const { type, payload } = action;
  switch (type) {
    //Here we will update thee different states using one signle action type
    case "SET_CART":
      return {
        ...state,
        ...payload,
      };
    case "SET_SHOW_CART":
      return {
        ...state,
        showCart: payload,
      };
    default:
      throw new Error(`Unrecognized type ${type}`);
  }
};

export const ShoppingCartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(shoppingCartReducer, INITIAL_STATE);
  const { cartItems, showCart, cartCounter, cartTotal } = state;

  const setCartReducer = (updatedCartItems: Array<CartCategory>) => {
    const cartItemsTotal = updatedCartItems.reduce(
      (total, item) => (total = total + item.quantity * item.price),
      0
    );
    const cartItemsCount = updatedCartItems.reduce(
      (total, item) => (total = total + item.quantity),
      0
    );
    dispatch({
      type: "SET_CART",
      payload: {
        cartItems: updatedCartItems,
        cartCounter: cartItemsCount,
        cartTotal: cartItemsTotal,
      },
    });
  };
  const addToCart = (item: Category) => {
    const updatedCartItems = addItemToCart(state.cartItems, item);
    setCartReducer(updatedCartItems);
  };
  const decreaseCartItem = (item: Category) => {
    const updatedCartItems = decreaseItemInCart(state.cartItems, item);
    setCartReducer(updatedCartItems);
  };
  const removeFromCart = (item: Category) => {
    const updatedCartItems = removeItemFromCart(state.cartItems, item.id);
    setCartReducer(updatedCartItems);
  };
  const setShowCart = (showCart: boolean) => {
    dispatch({
      type: "SET_SHOW_CART",
      payload: showCart,
    });
  };

  const value: any = {
    showCart,
    setShowCart,
    cartItems,
    addToCart,
    cartCounter,
    cartTotal,
    decreaseCartItem,
    removeFromCart,
  };
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
